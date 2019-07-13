import React from 'react';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import InlineAttachment, { Options as UploadOptions } from './plugins/InlineAttachment';
import './style.less';
export interface SimpleMDEEditorProps {
    id?: 'string';
    className?: 'string';
    label?: 'string;';
    uploadOptions?: UploadOptions;
    theme?: string;
    getMdeInstance?: (simplemde: SimpleMDE) => void;
    getLineAndCursor?: (cursor: CodeMirror.Position) => void;
    extraKeys?: CodeMirror.KeyMap;
    value: string;
    onChange: (value: string) => void;
    options: SimpleMDE.Options;
}
export interface SimpleMDEEditorState {
    contentChanged: boolean;
}
declare class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
    state: SimpleMDEEditorState;
    id: string;
    wrapperId: string;
    simplemde?: SimpleMDE;
    inlineAttachment?: InlineAttachment;
    constructor(props: SimpleMDEEditorProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SimpleMDEEditorProps): void;
    componentWillUnmount(): void;
    handleChange: (instance: CodeMirror.Doc, changeObj: CodeMirror.EditorChange) => void;
    getCursor: () => void;
    getMdeInstance: () => void;
    addExtraKeys: () => void;
    removeEvents: () => void;
    addEvents: () => void;
    createEditor: () => SimpleMDE;
    render(): JSX.Element;
}
export default SimpleMDEEditor;
