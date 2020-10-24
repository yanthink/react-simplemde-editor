import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import { each } from 'lodash';
import Upload, { Options as UploadOptions } from './plugins/Upload';
import { getPositions, isParentElement } from "./utils";
import 'simplemde/dist/simplemde.min.css';
import 'yt-emoji-picker/dist/style.css';
import './style.less';

export interface SimpleMDEEditorProps {
  id?: string;
  className?: string;
  label?: string;
  emoji?: {
    enabled: boolean;
    autoComplete: boolean;
    insertConvertTo: string;
    categories?: object;
    emojiToolkit?: {
      emojiSize?: number;
      imagePathPNG?: string;
      sprites?: boolean;
      spriteSize?: number;
    },
  };
  uploadOptions?: UploadOptions;
  getMdeInstance?: (simplemde: TSimpleMDE) => void;
  extraKeys?: CodeMirror.KeyMap;
  value?: string;
  onChange?: (value: string) => void;
  options?: SimpleMDE.Options;

  emojiToolkit?: any;
  emojiData: string[];
  EmojiPicker: any;
  escape?: any;
  Textcomplete?: any;
  CodemirrorEditor?: any;
}

export interface SimpleMDEEditorState {
  contentChanged: boolean,
}

export type TSimpleMDE = SimpleMDE & {
  toggleFullScreen: () => void,
  autosaveTimeoutId: number,
};

class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
  state: SimpleMDEEditorState = {
    contentChanged: false,
  };

  id: string = '';

  wrapperId: string = '';

  simplemde?: TSimpleMDE;

  upload?: Upload;

  textcomplete?: any;

  emojiPickerPopup?: HTMLDivElement;

  constructor(props: SimpleMDEEditorProps) {
    super(props);
    this.id = this.props.id || `simplemde-editor-${Date.now()}`;
    this.wrapperId = `${this.id}-wrapper`;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.simplemde = this.createEditor();
      this.addEvents();
      this.addExtraKeys();
      this.getMdeInstance();

      const { uploadOptions, emoji } = this.props;
      if (uploadOptions) {
        this.upload = new Upload(this.simplemde.codemirror, uploadOptions);
      }

      if (emoji && emoji.enabled && emoji.autoComplete) {
        this.initAutoCompleteEmoji();
      }
    }
  }

  componentWillReceiveProps(nextProps: SimpleMDEEditorProps) {
    if (this.simplemde) {
      const { contentChanged } = this.state;
      const { value } = nextProps;
      if (!contentChanged && typeof value !== "undefined" && value !== this.simplemde.value()) {
        this.simplemde.value(value);
      }
      this.setState({ contentChanged: false });
    }
  }

  componentWillUnmount() {
    if (this.upload) {
      this.upload.destroy();
    }

    if (this.textcomplete) {
      this.textcomplete.destroy();
    }

    if (this.simplemde) {
      /**
       * 如果不关闭全屏状态会导致页面无法滚动
       */
      if (this.simplemde.isFullscreenActive()) {
        this.simplemde.toggleFullScreen();
      }

      /**
       * 清除自动保存的定时器
       */
      if (this.simplemde.autosaveTimeoutId) {
        clearTimeout(this.simplemde.autosaveTimeoutId);
      }
    }

    if (this.emojiPickerPopup) {
      document.body.removeEventListener(
        'click',
        this.hiddenEmojiPickerPopup,
        false
      );

      document.body.removeChild(this.emojiPickerPopup);
    }

    this.removeEvents();
  }

  handleChange = (instance: any, changeObj: CodeMirror.EditorChange) => {
    this.simplemde && this.triggerChange(this.simplemde.value());
  };

  handleEmojiSelect = (emoji: any, e: any) => {
    if (this.simplemde && this.props.emoji && this.props.emojiToolkit) {
      const value = this.props.emoji.insertConvertTo === 'unicode'
        ? this.props.emojiToolkit.shortnameToUnicode(emoji.shortname)
        : emoji.shortname;

      this.simplemde.codemirror.replaceSelection(value);
    }
  };

  toggleEmojiPickerPopup(emojiBtn: any) {
    if (this.emojiPickerPopup) {
      if (this.emojiPickerPopup.style.display === 'none') {
        this.emojiPickerPopup.style.visibility = 'hidden';
        this.emojiPickerPopup.style.display = 'block';

        const positions = getPositions(emojiBtn);
        const top = positions.top + 44;
        let left = positions.left - 1;
        if (left + this.emojiPickerPopup.scrollWidth > document.body.scrollWidth) {
          left = document.body.scrollWidth - this.emojiPickerPopup.scrollWidth - 20;
        }
        this.emojiPickerPopup.style.top = `${top}px`;
        this.emojiPickerPopup.style.left = `${left}px`;
        this.emojiPickerPopup.style.visibility = 'visible';
      } else {
        this.emojiPickerPopup.style.display = 'none';
      }
    }
  }

  hiddenEmojiPickerPopup = (e: any) => {
    if (this.emojiPickerPopup && this.emojiPickerPopup.style.display !== 'none') {
      if (
        !isParentElement(e.target, this.emojiPickerPopup) &&
        !(e.target.className === 'fa fa-smile-o' && e.target.title === 'emoji')
      ) {
        this.emojiPickerPopup.style.display = 'none';
      }
    }
  };

  triggerChange = (value: string) => {
    const { onChange } = this.props;
    if (onChange) {
      this.setState({ contentChanged: true });
      onChange(value);
    }
  };

  getMdeInstance = () => {
    const { getMdeInstance } = this.props;
    if (getMdeInstance && this.simplemde) {
      getMdeInstance(this.simplemde);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    const { extraKeys } = this.props;
    if (extraKeys && this.simplemde) {
      this.simplemde.codemirror.setOption('extraKeys', extraKeys);
    }
  };

  removeEvents = () => {
    if (this.simplemde) {
      const { codemirror } = this.simplemde;
      codemirror.off('change', this.handleChange);
    }
  };

  addEvents = () => {
    if (this.simplemde) {
      const { codemirror } = this.simplemde;
      codemirror.on('change', this.handleChange);
    }
  };

  createEditor = (): TSimpleMDE => {
    const { value, options = {}, emoji, EmojiPicker, emojiToolkit } = this.props;

    if (
      emoji &&
      emoji.enabled &&
      Array.isArray(options.toolbar) &&
      options.toolbar.includes('emoji')
    ) {
      if (!EmojiPicker || !emojiToolkit) {
        console.error('使用emojiPicker必须提供EmojiPicker和emojiToolkit属性，基本用法详见：https://github.com/yanthink/react-simplemde-editor/blob/master/demo/src/pages/index.js');
      } else {
        options.toolbar = options.toolbar.map(item => {
          if (item === 'emoji') {
            return {
              name: 'emoji',
              action: (e: any) => {
                this.toggleEmojiPickerPopup(e.toolbarElements.emoji);
              },
              className: 'fa fa-smile-o',
              title: 'emoji',
            };
          }
          return item;
        });

        this.emojiPickerPopup = document.createElement('div');
        this.emojiPickerPopup.id = 'emoji-picker-popup';
        this.emojiPickerPopup.style.display = 'none';
        this.emojiPickerPopup.style.position = 'absolute';
        this.emojiPickerPopup.style.zIndex = '99999';

        document.body.addEventListener(
          'click',
          this.hiddenEmojiPickerPopup,
          false
        );

        document.body.appendChild(this.emojiPickerPopup);

        const emojiPickerProps = {
          emojiToolkit: emoji.emojiToolkit,
          categories: emoji.categories,
          onSelect: this.handleEmojiSelect,
          search: true,
          recentCount: 36,
          rowHeight: 40,
        };

        ReactDOM.render(<EmojiPicker {...emojiPickerProps} />, this.emojiPickerPopup);
      }
    }

    const simpleMdeOptions = ({
      ...options,
      element: document.getElementById(this.id),
      initialValue: value,
    }) as SimpleMDE.Options;

    const simplemde = new SimpleMDE(simpleMdeOptions);

    // 同步自动保存的value
    const { autosave } = options;
    if (autosave && autosave.enabled === true && autosave.uniqueId) {
      const autoSaveValue = simplemde.value();
      if (autoSaveValue && autoSaveValue !== value) {
        this.triggerChange(autoSaveValue);
      }
    }

    return simplemde as TSimpleMDE;
  };

  initAutoCompleteEmoji() {
    const { emoji, emojiToolkit, emojiData, Textcomplete, CodemirrorEditor, escape } = this.props;

    if (
      this.simplemde &&
      emoji && emoji.autoComplete
    ) {
      if (!emojiToolkit || !emojiData || !Textcomplete || !CodemirrorEditor || !escape) {
        console.error('开启emoji自动补全必须提供emojiToolkit、emojiData、Textcomplete、CodemirrorEditor和escape属性，基本用法详见：https://github.com/yanthink/react-simplemde-editor/blob/master/demo/src/pages/index.js');
        return;
      }

      this.textcomplete = new Textcomplete(
        new CodemirrorEditor(this.simplemde.codemirror),
        {
          dropdown: {
            className: 'emoji-dropdown-menu',
            maxCount: 5,
          },
        },
      );

      this.textcomplete.register([{
        // Emoji strategy
        match: /(\B):([\-+\w]*)$/,
        search(term: string = '', callback: any) {
          const emojis = emojiData.filter((emoji: any) => {
            const searchTermRegExp = new RegExp(`^(?:.* +)*${escape(term)}`, 'i');
            return emoji.keywords.some((keyword: string) => searchTermRegExp.test(keyword));
          });

          callback(emojis);
        },
        replace(item: any) {
          if (emoji.insertConvertTo === 'unicode') {
            return emojiToolkit.shortnameToUnicode(item.shortname);
          }
          return item.shortname;
        },
        template(item: any) {
          const emojiToolkitOptionsBak: any = {};

          each(emoji.emojiToolkit, (value, key) => {
            emojiToolkitOptionsBak[key] = emojiToolkit[key];
            emojiToolkit[key] = value;
          });

          const text = `${emojiToolkit.toImage(item.shortname)} ${item.shortname.replace(/:/g, '')}`;

          each(emojiToolkitOptionsBak, (value, key) => {
            emojiToolkit[key] = value;
          });

          return text;
        },
      }]);
    }
  };

  render() {
    const { className, label } = this.props;
    return (
      <div id={this.wrapperId} className={className}>
        {label && <label htmlFor={this.id}>{label}</label>}
        <textarea id={this.id} />
      </div>
    );
  }
}

export default SimpleMDEEditor;
