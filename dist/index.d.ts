import React from 'react';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import Upload, { Options as UploadOptions } from './plugins/Upload';
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
    value?: string;
    onChange?: (value: string) => void;
    options?: SimpleMDE.Options;
}
export interface SimpleMDEEditorState {
    contentChanged: boolean;
}
export declare type TSimpleMDE = SimpleMDE & {
    autosaveTimeoutId: number;
};
declare class SimpleMDEEditor extends React.Component<SimpleMDEEditorProps, SimpleMDEEditorState> {
    static defaultProps: {
        value: string;
        onChange: () => void;
    };
    state: SimpleMDEEditorState;
    id: string;
    wrapperId: string;
    simplemde?: TSimpleMDE;
    upload?: Upload;
    constructor(props: SimpleMDEEditorProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SimpleMDEEditorProps): void;
    componentWillUnmount(): void;
    handleChange: (instance: any, changeObj: CodeMirror.EditorChange) => void;
    getCursor: () => void;
    getMdeInstance: () => void;
    addExtraKeys: () => void;
    removeEvents: () => void;
    addEvents: () => void;
    createEditor: () => TSimpleMDE;
    render(): JSX.Element;
}
export default SimpleMDEEditor;
