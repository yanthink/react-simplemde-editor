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
    allowedTypes?: string[];
    progressText?: string;
    /**
     * 上传成功后将 progressText 内容替换为 urlText
     */
    urlText?: ((filename: string, result: object) => string) | string;
    /**
     * 上传失败显示text内容
     */
    errorText?: string;
    data?: {
        [key: string]: any;
    };
    headers?: {
        [key: string]: any;
    };
    setupFormData?: (formData: FormData, file: File) => void;
    beforeFileUpload?: (xhr: XMLHttpRequest) => boolean;
    onFileReceived: (file: File | DataTransferItem | any) => boolean;
    onFileUploadResponse: (xhr: XMLHttpRequest) => boolean;
    onFileUploadError: (xhr: XMLHttpRequest) => boolean;
    onFileUploaded?: (filename: string) => void;
}
export default class InlineAttachment {
    settings: Options;
    codemirror: CodeMirror.Doc | any;
    filenameTag: string;
    lastValue?: string;
    constructor(instance: CodeMirror.Doc, options: Options);
    uploadFile(file: DataTransferItem | File | any): XMLHttpRequest;
    isFileAllowed(file: DataTransferItem | File | any): boolean;
    onFileUploadResponse(xhr: XMLHttpRequest): void;
    onFileUploadError(xhr: XMLHttpRequest): void;
    onFileInserted(file: DataTransferItem | File | any): void;
    onPaste: (e: ClipboardEvent) => boolean;
    onDrop: (instance: CodeMirror.Doc, e: any) => boolean;
    removeEvents(): void;
    addEvents(): void;
}
