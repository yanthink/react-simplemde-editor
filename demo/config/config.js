import webpackPlugin from './plugin.config';

export default {
  treeShaking: true,
  chainWebpack: webpackPlugin,
  disableCSSModules: true,
  cssLoaderOptions: {
    modules: false,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'demo',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  extraBabelPlugins: [
    [
      'prismjs',
      {
        languages: [
          'css',
          'javascript',
          'bash',
          'ini',
          'java',
          'json',
          'less',
          'php',
          'jsx',
          'tsx',
          'sass',
          'scss',
          'sql',
          'stylus',
          'typescript',
          'yaml',
        ],
        plugins: ['line-numbers'],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://api.blog.test',
      changeOrigin: true,
    },
  },
}
