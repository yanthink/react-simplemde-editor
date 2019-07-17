import React from 'react';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import Upload, {Options as UploadOptions} from './plugins/Upload';
import 'simplemde/dist/simplemde.min.css';
import './style.less';

export interface SimpleMDEEditorProps {
  id?: 'string';
  className?: 'string';
  label?: 'string;'
  uploadOptions?: UploadOptions;
  theme?: string;
  getMdeInstance?: (simplemde: TSimpleMDE) => void;
  extraKeys?: CodeMirror.KeyMap;
  value?: string;
  onChange?: (value: string) => void;
  options?: SimpleMDE.Options,
}

export interface SimpleMDEEditorState {
  contentChanged: boolean,
}

export type TSimpleMDE = SimpleMDE & {
  toggleFullScreen: () => void,
  autosaveTimeoutId: number,
};

class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
  static defaultProps = {
    onChange: () => {
    },
  };

  state: SimpleMDEEditorState = {
    contentChanged: false,
  };

  id: string = '';

  wrapperId: string = '';

  simplemde?: TSimpleMDE;

  upload?: Upload;

  constructor(props: SimpleMDEEditorProps) {
    super(props);
    this.id = this.props.id || `simplemde-editor-${Date.now()}`;
    this.wrapperId = `${this.id}-wrapper`;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.simplemde = this.createEditor();

      const {uploadOptions} = this.props;

      this.addEvents();

      if (uploadOptions) {
        this.upload = new Upload(this.simplemde.codemirror, uploadOptions);
      }

      this.addExtraKeys();
      this.getMdeInstance();
    }
  }

  componentWillReceiveProps(nextProps: SimpleMDEEditorProps) {
    if (this.simplemde) {
      const {contentChanged} = this.state;
      const {value = ''} = nextProps;
      if (!contentChanged && value !== this.simplemde.value()) {
        this.simplemde.value(value);
      }
      this.setState({contentChanged: false});
    }
  }

  componentWillUnmount() {
    this.removeEvents();

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
  }

  handleChange = (instance: any, changeObj: CodeMirror.EditorChange) => {
    if (this.simplemde) {
      const {onChange} = this.props;
      if (onChange) {
        this.setState({contentChanged: true});
        onChange(this.simplemde.value());
      }
    }
  };

  getMdeInstance = () => {
    const {getMdeInstance} = this.props;
    if (getMdeInstance && this.simplemde) {
      getMdeInstance(this.simplemde);
    }
  };

  addExtraKeys = () => {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    const {extraKeys} = this.props;
    if (extraKeys && this.simplemde) {
      this.simplemde.codemirror.setOption('extraKeys', extraKeys);
    }
  };

  removeEvents = () => {
    if (this.simplemde) {
      const {codemirror} = this.simplemde;
      codemirror.off('change', this.handleChange);
      this.upload && this.upload.removeEvents();
    }
  };

  addEvents = () => {
    if (this.simplemde) {
      const {codemirror} = this.simplemde;
      codemirror.on('change', this.handleChange);
    }
  };

  createEditor = (): TSimpleMDE => {
    const {value, options = {}, theme, onChange} = this.props;

    const simpleMdeOptions = ({
      ...options,
      element: document.getElementById(this.id),
      initialValue: value,
    }) as SimpleMDE.Options;

    const simplemde = new SimpleMDE(simpleMdeOptions);

    if (theme) {
      simplemde.codemirror.setOption('theme', theme);
    }

    // 同步自动保存的value
    if (onChange) {
      const {autosave} = options;
      if (autosave && autosave.enabled === true && autosave.uniqueId) {
        const autoSaveValue = simplemde.value();
        if (autoSaveValue && autoSaveValue !== value) {
          this.setState({contentChanged: true});
          onChange(autoSaveValue);
        }
      }
    }

    return simplemde as TSimpleMDE;
  };

  render() {
    const {className, label} = this.props;
    return (
      <div id={this.wrapperId} className={className}>
        {label && <label htmlFor={this.id}>{label}</label>}
        <textarea id={this.id} />
      </div>
    );
  }
}

export default SimpleMDEEditor;
