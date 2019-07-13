import React from 'react';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import InlineAttachment, {Options as UploadOptions} from './plugins/InlineAttachment';
import './style.less';

export interface SimpleMDEEditorProps {
  id?: 'string';
  className?: 'string';
  label?: 'string;'
  uploadOptions?: UploadOptions;
  theme?: string;
  getMdeInstance?: (simplemde: SimpleMDE) => void;
  getLineAndCursor?: (cursor: CodeMirror.Position) => void;
  extraKeys?: CodeMirror.KeyMap;
  value: string;
  onChange: (value: string) => void;
  options: SimpleMDE.Options,
}

export interface SimpleMDEEditorState {
  contentChanged: boolean,
}

class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
  state: SimpleMDEEditorState = {
    contentChanged: false,
  };

  id: string = '';

  wrapperId: string = '';

  simplemde?: SimpleMDE;

  inlineAttachment?: InlineAttachment;

  constructor(props: SimpleMDEEditorProps) {
    super(props);
    this.id = this.props.id || `simplemde-editor-${Date.now()}`;
    this.wrapperId = `${this.id}-wrapper`;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const simplemde = this.simplemde = this.createEditor();
      const {uploadOptions} = this.props;

      this.addEvents();

      if (uploadOptions) {
        this.inlineAttachment = new InlineAttachment(simplemde.codemirror, uploadOptions);
      }

      this.addExtraKeys();
      this.getCursor();
      this.getMdeInstance();
    }
  }

  componentWillReceiveProps(nextProps: SimpleMDEEditorProps) {
    if (this.simplemde) {
      const {contentChanged} = this.state;
      if (!contentChanged && nextProps.value !== this.simplemde.value()) {
        this.simplemde.value(nextProps.value);
      }
      this.setState({contentChanged: false});
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  handleChange = (instance: CodeMirror.Doc, changeObj: CodeMirror.EditorChange) => {
    if (this.simplemde) {
      const {onChange} = this.props;
      this.setState({contentChanged: true});
      onChange(this.simplemde.value());
    }
  };

  getCursor = () => {
    // https://codemirror.net/doc/manual.html#api_selection
    const {getLineAndCursor} = this.props;
    if (getLineAndCursor && this.simplemde) {
      const {codemirror} = this.simplemde;
      getLineAndCursor(codemirror.getCursor());
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
      codemirror.on('change', this.handleChange);
      codemirror.on('cursorActivity', this.getCursor);
      this.inlineAttachment && this.inlineAttachment.removeEvents();
    }
  };

  addEvents = () => {
    if (this.simplemde) {
      const {codemirror} = this.simplemde;
      codemirror.on('change', this.handleChange);
      codemirror.on('cursorActivity', this.getCursor);
    }
  };

  createEditor = (): SimpleMDE => {
    const {value, options, theme} = this.props;

    const simpleMdeOptions = ({
      ...options,
      element: document.getElementById(this.id),
      initialValue: value,
    }) as SimpleMDE.Options;

    const simplemde = new SimpleMDE(simpleMdeOptions);

    if (theme) {
      simplemde.codemirror.setOption('theme', theme);
    }

    return simplemde;
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
