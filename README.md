## React SimpleMDE Markdown Editor

### 特性

* 支持粘贴和拖拽上传图片。
* 支持自定义预览渲染


### 安装

```
npm install -S yt-simplemde-editor
```


### 使用

```javascript
import React, { PureComponent } from 'react';
import cookie from 'cookie';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本可以配合webpack使用babel-plugin-prismjs插件
import 'prismjs/themes/prism-okaidia.css';
import loadLanguages from 'prismjs/components/index';

loadLanguages([
  'css',
  'javascript',
  'bash',
  'git',
  'ini',
  'java',
  'json',
  'less',
  'markdown',
  'php',
  'php-extras',
  'python',
  'jsx',
  'tsx',
  'scss',
  'sql',
  'vim',
  'yaml',
]);

class App extends PureComponent {
  state = {
    value: '',
  };

  renderMarkdown = text => {
    const html = marked(text, { breaks: true });
    if (/language-/.test(html)) {
      const container = document.createElement('div');
      container.innerHTML = html;
      Prism.highlightAllUnder(container);
      return container.innerHTML;
    }

    return html;
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({ value: '222' })
    }, 1000);

    setTimeout(() => {
      this.setState({ value: '2222222' })
    }, 10000);
  }

  render () {
    const editorProps = {
      value: this.state.value,
      getMdeInstance: simplemde => {
        this.simplemde = simplemde;
      },
      onChange: (value) => {
        console.info(value);
        this.setState({ value })
      },
      options: {
        // see https://github.com/sparksuite/simplemde-markdown-editor#configuration
        spellChecker: false,
        forceSync: true,
        // autosave: {
        //   enabled: true,
        //   delay: 5000,
        //   uniqueId: 'article_content',
        // },
        renderingConfig: {
          // codeSyntaxHighlighting: true,
        },
        previewRender: this.renderMarkdown, // 自定义预览渲染
        tabSize: 4,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          'table',
          'horizontal-rule',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'side-by-side',
          'fullscreen',
          '|',
          {
            name: 'guide',
            action () {
              const win = window.open(
                'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                '_blank',
              );
              if (win) {
                // Browser has allowed it to be opened
                win.focus();
              }
            },
            className: 'fa fa-info-circle',
            title: 'Markdown 语法！',
          },
        ],
      },
      uploadOptions: {
        action: '/api/attachment/upload',
        jsonName: 'data.fileUrl',
        withCredentials: true,
        beforeUpload(file) {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            alert('Image must smaller than 2MB!');
          }
          return isLt2M;
        },
        headers: {
          Accept: 'application/x.sheng.v2+json',
          authorization: 'authorization-text',
          'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'],
        },
        onError (err, ret, file) {
          console.info({ err, ret, file })
        },
      },
    };

    return (
      <div>
        <SimpleMDEEditor {...editorProps} />
      </div>
    )
  }
}

export default App;
```

```php
<?php

namespace App\Http\Controllers\V2;

use Illuminate\Http\Request;
use Storage;

class AttachmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function upload(Request $request)
    {
        $rules = [
            'file' => 'required|image|mimes:png,jpg,jpeg,gif|max:2048',
        ];

        $this->validate($request, $rules);

        $disk = Storage::disk('public');
        $path = $disk->putFile('tmp', $request->file('file'));

        $data = [
            'fileUrl' => $disk->url($path),
        ];
        return compact('data');
    }
}
```

### Demo

```
git clone https://github.com/yanthink/react-simplemde-editor
cd react-simplemde-editor
npm install
npm run build
npm link

cd demo
npm install
npm link react-simplemde-editor
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
| getLineAndCursor | 获取光标对象 | cursor => void | - |
| extraKeys | 快捷键设置，详见 [extraKeys](https://codemirror.net/doc/manual.html#option_extraKeys) | object | - |
| value | 初始化内容 | string | - |
| onChange | 内容发生改变时触发 | value => void | - |
| options | [SimpleMDE选项](https://github.com/sparksuite/simplemde-markdown-editor#configuration) | object | - |


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
