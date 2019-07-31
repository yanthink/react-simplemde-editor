export declare type THeaders = {
    [key: string]: any;
};
export declare type TData = THeaders | ((file: File) => THeaders);
export interface Options {
    /**
     * 上传地址
     */
    action: string;
    /**
     * 发到后台的文件参数名
     */
    name?: string;
    /**
     * 后台响应的文件地址名称
     */
    jsonName?: string;
    /**
     * Allowed MIME types
     */
    allowedTypes?: string | string[];
    /**
     * 上传中显示内容
     */
    progressText?: string;
    /**
     * 上传所需参数
     */
    data?: TData;
    /**
     * 设置上传的请求头部
     */
    headers?: THeaders;
    /**
     * 上传请求时是否携带 cookie
     */
    withCredentials?: boolean;
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传
     */
    beforeUpload?: (file: File) => boolean | Promise<void>;
    /**
     * 上传成功事件
     */
    onSuccess?: (response: any, file: File) => any;
    /**
     * 上传失败事件
     */
    onError?: (err: any, response: any, file: File) => any;
}
export default class Upload {
    static defaultOptions: Options;
    options: Options;
    codemirror: any;
    lastValue?: string;
    constructor(instance: any, options: Options);
    uploadFiles(files: File[]): void;
    upload(file: File): void;
    insertProgressText(): void;
    isFileAllowed(file: File): boolean;
    onUploadSuccess(xhr: XMLHttpRequest, file: File): void;
    onUploadError(xhr: XMLHttpRequest, file: File): void;
    onPaste: (e: ClipboardEvent) => void;
    onDrop: (instance: any, e: any) => void;
    removeEvents(): void;
    addEvents(): void;
    destroy(): void;
}
