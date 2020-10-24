## React SimpleMDE Markdown Editor

### 演示地址
https://www.einsition.com/demos/yt-simplemde-editor

### 更新日志

[CHANGELOG.md](CHANGELOG.md)

### 特性

* 支持粘贴和拖拽上传图片。
* 支持自定义预览渲染
* 支持emoji表情

### 安装

```
npm install -S yt-simplemde-editor
```


### 使用

您可以在 [demo](demo/src/pages/index.js) 中查看基本用法。

### Demo

```
git clone https://github.com/yanthink/react-simplemde-editor
cd react-simplemde-editor
npm install
npm run build
npm link

cd demo
npm install
npm link yt-simplemde-editor
npm start
```

### API

| 参数 | 说明 | 类型 | 默认值	 |
| --- | --- | --- | --- |
| id | 编辑器id | string |  - |
| className | 根元素的类名称 | string | - |
| label | label | string | - |
| uploadOptions | 上传附件参数 | [UploadOptions](#UploadOptions) | - |
| theme | 主题设置 | string | - |
| getMdeInstance | 获取编辑器实例方法 | simplemde => void | - |
| extraKeys | 快捷键设置，详见 [extraKeys](https://codemirror.net/doc/manual.html#option_extraKeys) | object | - |
| value | 初始化内容 | string | - |
| onChange | 内容发生改变时触发 | value => void | - |
| options | [SimpleMDE选项](https://github.com/sparksuite/simplemde-markdown-editor#configuration) | object | - |
| emoji | emoji参数 | [Emoji](#Emoji) | - |

### UploadOptions
| 参数 | 说明 | 类型 | 默认值	 |
| --- | --- | --- | --- |
| action | 上传的地址 | string | 无 |
| name | 发到后台的文件参数名 | string | file |
| jsonName | 后台响应的文件地址名称 | string | fileUrl |
| allowedTypes | 接受上传的文件类型 | string &#x7C; array | image/* |
| progressText | 上传中显示内容 | string | &#x21;&#x5B;Uploading file...&#x5D;() |
| data | 上传所需参数 | object &#x7C; file => object | - |
| headers | 设置上传的请求头部 | object | - |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传 | (file) => boolean &#x7C; Promise | - |
| onSuccess | 上传成功事件 | (response, file) => any | - |
| onError | 上传失败事件 | (err, response, file) => any | - |


### Emoji
| 参数 | 说明 | 类型 | 默认值	 |
| --- | --- | --- | --- |
| enabled | 是否开启 | boolean | false |
| autoComplete | 是否开启 [shortname](https://www.einsition.com/tools/emoji-cheat-sheet) 自动补全 | boolean | false |
| insertConvertTo | 插值转换，可选值 `shortname`，`unicode` | string | shortname |
| emojiToolkit | [emoji-toolkit配置](https://github.com/joypixels/emoji-toolkit/blob/master/USAGE.md) | object |  - |
| categories | [类别设置](https://github.com/yanthink/react-emoji-picker#api) | { [key: string]: { title: string; emoji: string; } } | [defaultCategories](#defaultCategories) |


### defaultCategories
```json
const defaultCategories: CategoriesType = {
  recent: {
    title: '常用',
    emoji: 'clock3',
  },
  people: {
    title: '表情符号与人物',
    emoji: 'smile',
  },
  nature: {
    title: '动物与自然',
    emoji: 'hamster',
  },
  food: {
    title: '食物与饮料',
    emoji: 'pizza',
  },
  activity: {
    title: '活动',
    emoji: 'soccer',
  },
  travel: {
    title: '旅行与地点',
    emoji: 'earth_americas',
  },
  objects: {
    title: '物体',
    emoji: 'bulb',
  },
  symbols: {
    title: '符号',
    emoji: 'symbols',
  },
  flags: {
    title: '旗帜',
    emoji: 'flag_cn',
  },
};
```
