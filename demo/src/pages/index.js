import React from 'react';
import { Form, Modal, Button, Upload, Icon, message } from 'antd';
import SimpleMDEEditor from 'yt-simplemde-editor';
import emojiDependencies from 'yt-simplemde-editor/dist/emoji';
import marked from 'marked';
import Prism from 'prismjs';
import emojiToolkit from 'emoji-toolkit';
import 'yt-simplemde-editor/dist/style.css';
import './index.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const uploadUrl = '/api/attachments/upload';
const progressText = '![Uploading file {uid}...]()';
const urlText = '![file]({filename})';

marked.setOptions({
  headerIds: false,
  gfm: true,
  breaks: true,
  highlight (code, lang) {
    if (lang) {
      const language = lang.toLowerCase();
      const grammar = Prism.languages[language];
      if (grammar) {
        return Prism.highlight(code, grammar, language);
      }
    }

    return code;
  }
});

@Form.create()
class Demo extends React.Component {
  state = {
    uploadVisible: false, // 本地上传
  };

  handleSubmit = (e) => {
    e && e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // submit
      }
    });
  };

  renderMarkdown = text => {
    let html = marked(text);
    return emojiToolkit.toImage(html);
  };

  render () {
    const { form: { getFieldDecorator } } = this.props;

    const editorProps = {
      getMdeInstance: simplemde => {
        this.simplemde = simplemde;
      },
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
          {
            name: 'image',
            action: () => {
              this.setState({ uploadVisible: true })
            },
            className: 'fa fa-image',
            title: '上传图片',
          },
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          '|',
          'guide',
          {
            name: 'submit',
            action: () => {
              this.handleSubmit();
            },
            className: 'fa fa-paper-plane',
            title: '提交',
          },
          '|',
          'emoji',
        ],
      },
      uploadOptions: {
        action: uploadUrl,
        jsonName: 'data.fileUrl', // 服务端响应格式 {"data":{"fileUrl":"http:\/\/api.blog.test\/storage\/tmp\/w9jfWHWUUuiaeqYAl7K1PhBBRgzamCv20ScdW1mn.png"}}
        withCredentials: true,
        beforeUpload (file) {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
          }
          return isLt2M;
        },
        headers: {
          Accept: 'application/x.sheng.v2+json',
          authorization: 'authorization-text',
        },
        onError (err, response) {
          if (response.message) {
            message.error(response.message);
          }
        },
      },
      emoji: {
        enabled: true,
        autoComplete: true,
        insertConvertTo: 'unicode',
      },
      ...emojiDependencies, // emoji相关依赖包比较大，如果不需要emoji可以不引入
    };

    const uploadProps = {
      action: uploadUrl,
      name: 'file',
      multiple: true,
      showUploadList: false,
      beforeUpload: file => {
        const text = progressText.replace('{uid}', file.uid);
        this.simplemde.codemirror.replaceSelection(text);
        file.insertText = text;
      },
      headers: {
        Accept: 'application/x.sheng.v2+json',
        authorization: 'authorization-text',
      },
      onChange: ({ file }) => {
        if (file.status === 'done') {
          const { response: { data }, originFileObj } = file;
          const { fileUrl } = data;
          const cursor = this.simplemde.codemirror.getCursor();
          const newValue = urlText.replace('{filename}', fileUrl);
          const text = this.simplemde.codemirror.getValue().replace(originFileObj.insertText, newValue);
          this.simplemde.codemirror.setValue(text);
          cursor.ch += newValue.length - progressText.length;
          this.simplemde.codemirror.setCursor(cursor);
          this.simplemde.codemirror.focus();
          originFileObj.insertText = newValue;
        }

        if (file.status === 'error') {
          const { response: { message: msg }, originFileObj } = file;
          message.error(msg);
          const text = this.simplemde.codemirror.getValue().replace(originFileObj.insertText, '');
          this.simplemde.codemirror.setValue(text);
        }

        this.setState({ uploadVisible: false });
      },
    };

    return (
      <div className="normal">
        <FormItem {...formItemLayout} label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入文章内容' }],
          })(
            <SimpleMDEEditor {...editorProps} />,
          )}
        </FormItem>
        <Modal
          title="插入图片"
          visible={this.state.uploadVisible}
          footer={null}
          centered={true}
          onCancel={() => {
            this.setState({ uploadVisible: false });
          }}
        >
          <Upload {...uploadProps}>
            <Button type="primary">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </Modal>
      </div>
    )
  }
}

export default Demo;
