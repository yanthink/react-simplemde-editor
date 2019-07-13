import {get} from 'lodash';
import CodeMirror from 'codemirror';

export interface Options {
  /**
   * 附件上传地址
   */
  uploadUrl?: string;
  uploadMethod?: string;
  /**
   * 字段名称
   */
  uploadFieldName?: string;
  remoteFilename?: (file: File) => string;
  /**
   * 服务器响应字段名称
   */
  jsonFieldName?: string;
  /**
   * Allowed MIME types
   */
  allowedTypes?: string[],
  progressText?: string,
  /**
   * 上传成功后将 progressText 内容替换为 urlText
   */
  urlText?: ((filename: string, result: object) => string) | string;
  /**
   * 上传失败显示text内容
   */
  errorText?: string;
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
  setupFormData?: (formData: FormData, file: File) => void;
  beforeFileUpload?: (xhr: XMLHttpRequest) => boolean;
  onFileReceived: (file: File | DataTransferItem | any) => boolean;
  onFileUploadResponse: (xhr: XMLHttpRequest) => boolean;
  onFileUploadError: (xhr: XMLHttpRequest) => boolean;
  onFileUploaded?: (filename: string) => void;
}

export default class InlineAttachment {
  settings: Options = {
    uploadUrl: 'upload_attachment.php',
    uploadMethod: 'POST',
    uploadFieldName: 'file',
    jsonFieldName: 'filename',
    allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
    progressText: '![Uploading file...]()',
    urlText: '![file]({filename})',
    errorText: 'Error uploading file',
    data: {},
    headers: {},
    beforeFileUpload() {
      return true;
    },
    onFileReceived() {
      return true;
    },
    onFileUploadError() {
      return true;
    },
    onFileUploadResponse() {
      return true;
    },
  };

  codemirror: CodeMirror.Doc | any;

  filenameTag = '{filename}';

  lastValue?: string;

  constructor(instance: CodeMirror.Doc, options: Options) {
    this.settings = {...this.settings, ...options};
    this.codemirror = instance;

    this.addEvents()
  }

  uploadFile(file: DataTransferItem | File | any) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    const {settings} = this;

    if (typeof settings.setupFormData === 'function') {
      settings.setupFormData(formData, file);
    }

    let extension = 'png';

    // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
    // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
    if (file.name) {
      const fileNameMatches = file.name.match(/\.(.+)$/);
      if (fileNameMatches) {
        extension = fileNameMatches[1];
      }
    }

    let remoteFilename = `image-${Date.now()}.${extension}`;
    if (typeof settings.remoteFilename === 'function') {
      remoteFilename = settings.remoteFilename(file);
    }

    formData.append(settings.uploadFieldName || 'file', file, remoteFilename);

    // Append the extra parameters to the formdata
    if (typeof settings.data === 'object') {
      for (const key of Object.keys(settings.data)) {
        formData.append(key, settings.data[key]);
      }
    }

    xhr.open('POST', settings.uploadUrl as string);

    // Add any available extra headers
    if (typeof settings.headers === 'object') {
      for (const header of Object.keys(settings.headers)) {
        xhr.setRequestHeader(header, settings.headers[header]);
      }
    }

    xhr.onload = () => {
      // If HTTP status is OK or Created
      if (xhr.status === 200 || xhr.status === 201) {
        this.onFileUploadResponse(xhr);
      } else {
        this.onFileUploadError(xhr);
      }
    };

    if (settings.beforeFileUpload && settings.beforeFileUpload(xhr) !== false) {
      xhr.send(formData);
    }
    return xhr;
  };

  isFileAllowed(file: DataTransferItem | File | any) {
    if (file.kind === 'string') {
      return false;
    }

    const {allowedTypes = []} = this.settings;

    if (allowedTypes.indexOf('*') === 0) {
      return true;
    }

    return allowedTypes.indexOf(file.type) >= 0;
  }

  onFileUploadResponse(xhr: XMLHttpRequest) {
    const {
      onFileUploadResponse,
      jsonFieldName,
      urlText,
      onFileUploaded,
    } = this.settings;

    if (onFileUploadResponse && onFileUploadResponse.call(this, xhr) !== false) {
      const result = JSON.parse(xhr.responseText);
      const filename = get(result, jsonFieldName as string);

      if (result && filename) {
        let newValue;
        const cursor = this.codemirror.getCursor();

        if (typeof urlText === 'function') {
          newValue = urlText.call(this, filename, result);
        } else {
          newValue = (urlText as string).replace(this.filenameTag, filename);
        }
        const text = this.codemirror.getValue().replace(this.lastValue as string, newValue);
        this.codemirror.setValue(text);

        cursor.ch += newValue.length - (this.settings.progressText as string).length;
        this.codemirror.setCursor(cursor);
        this.codemirror.focus();

        onFileUploaded && onFileUploaded.call(this, filename);
      }
    }
  };

  onFileUploadError(xhr: XMLHttpRequest) {
    const {onFileUploadError} = this.settings;
    if (onFileUploadError && onFileUploadError.call(this, xhr) !== false) {
      const text = this.codemirror.getValue().replace(this.lastValue as string, '');
      this.codemirror.setValue(text);
    }
  };

  onFileInserted(file: DataTransferItem | File | any) {
    const {onFileReceived, progressText} = this.settings;

    if (onFileReceived && onFileReceived.call(this, file) !== false) {
      this.lastValue = progressText as string;
      this.codemirror.replaceSelection(this.lastValue);
    }
  };

  onPaste = (e: ClipboardEvent) => {
    let result = false;
    const {clipboardData} = e;
    let items;

    if (clipboardData && typeof clipboardData === 'object') {
      items = clipboardData.items || clipboardData.files || [];

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (this.isFileAllowed(item)) {
          result = true;
          this.onFileInserted(item.getAsFile());
          this.uploadFile(item.getAsFile());
        }
      }
    }

    e.preventDefault();
    return result;
  };

  onDrop = (instance: CodeMirror.Doc, e: DragEvent | any) => {
    e.stopPropagation();
    e.preventDefault();

    let result = false;

    for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
      const file = e.dataTransfer.files[i];
      if (this.isFileAllowed(file)) {
        result = true;
        this.onFileInserted(file);
        this.uploadFile(file);
      }
    }
    return result;
  };

  removeEvents() {
    const el = this.codemirror.getWrapperElement();
    el.removeEventListener('paste', this.onPaste, false);
    this.codemirror.off('drop', this.onDrop);
  }

  addEvents() {
    const el = this.codemirror.getWrapperElement();
    el.addEventListener(
      'paste',
      this.onPaste,
      false
    );

    this.codemirror.on('drop', this.onDrop);
  };
}
