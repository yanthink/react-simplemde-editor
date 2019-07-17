import React, { PureComponent } from 'react';
import cookie from 'cookie';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本可以配合webpack使用babel-plugin-prismjs插件
import loadLanguages from 'prismjs/components/index';
import 'prismjs/themes/prism-okaidia.css';
import 'yt-simplemde-editor/dist/style.css';

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
        action: '/api/attachments/upload',
        jsonName: 'data.fileUrl',
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
    };

    return (
      <div>
        <SimpleMDEEditor {...editorProps} />
      </div>
    )
  }
}

export default App;
