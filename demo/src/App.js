import React, { PureComponent } from 'react';
import cookie from 'cookie';
import SimpleMDEEditor from 'yt-simplemde-editor';
import emojiToolkit from 'emoji-toolkit';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本可以配合webpack使用babel-plugin-prismjs插件
import loadLanguages from 'prismjs/components/index';
import 'prismjs/themes/prism-okaidia.css';
import 'emoji-assets/sprites/joypixels-sprite-32.min.css';
import 'yt-simplemde-editor/dist/style.css';
import './App.css';

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

emojiToolkit.sprites = true;
emojiToolkit.spriteSize = 32;

class App extends PureComponent {
  state = {
    value: '',
  };

  renderMarkdown = text => {
    let html = marked(text, {breaks: true});
    if (/language-/.test(html)) {
      const container = document.createElement('div');
      container.innerHTML = html;
      Prism.highlightAllUnder(container);
      html = container.innerHTML;
    }
    return emojiToolkit.toImage(html);
  };

  render () {
    const editorProps = {
      value: this.state.value,
      getMdeInstance: simplemde => {
        this.simplemde = simplemde;
      },
      onChange: (value) => {
        this.setState({ value })
      },
      // 配置文档 https://github.com/sparksuite/simplemde-markdown-editor#configuration
      options: {
        spellChecker: false,
        forceSync: true,
        autosave: {
          enabled: true,
          delay: 3000,
          uniqueId: `article_content`,
        },
        previewRender: this.renderMarkdown,
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
          'preview',
          'side-by-side',
          'fullscreen',
          '|',
          'guide',
          {
            name: 'submit',
            action () {
              //
            },
            className: 'fa fa-paper-plane',
            title: '提交',
          },
          '|',
          'emoji',
        ],
      },
      uploadOptions: {
        action: '/api/attachments/upload',
        jsonName: 'data.fileUrl', // 服务端响应格式 {"data":{"fileUrl":"http:\/\/api.blog.test\/storage\/tmp\/w9jfWHWUUuiaeqYAl7K1PhBBRgzamCv20ScdW1mn.png"}}
        withCredentials: true,
        beforeUpload (file) {
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
      emoji: {
        enabled: true,
        autoComplete: true,
        insertConvertTo: 'unicode', // 'shortname' or 'unicode'
      },
    };

    return (
      <div className="app">
        <SimpleMDEEditor {...editorProps} />
      </div>
    )
  }
}

export default App;
