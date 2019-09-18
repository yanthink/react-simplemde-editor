## 3.2.0

`2019-09-18`

- 抽离emoji相关依赖，可以按需引入

## 3.1.2

`2019-08-13`

- emoji-toolkit版本升级到5.0
- 增加emojiToolkit配置选项并去除emoji-assets依赖

## 3.1.0

`2019-07-18`

- 修复全屏状态下组件被卸载导致无法页面滚动的bug
- 修复组件初始化时自动保存的内容没有被同步的bug
- 删除getLineAndCursor参数
- 单独抽离出./dist/style.css样式，需要时可以通过 import yt-simplemde-editor/dist/style.css 引入
- 添加emoji支持
