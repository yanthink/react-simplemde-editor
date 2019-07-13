import React, { PureComponent } from 'react';
import cookie from 'cookie';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本有bug
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
        uploadUrl: '/api/attachment/upload',
        jsonFieldName: 'data.filename',
        headers: {
          Accept: 'application/x.sheng.v1+json',
          'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'],
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
