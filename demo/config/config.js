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
          'markup',
          'markup-templating',
          'css',
          'less',
          'scss',
          'clike',
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'php',
          'java',
          'bash',
          'ini',
          'json',
          'sql',
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
