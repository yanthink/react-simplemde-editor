const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // 设置 sourcemaps 为 eval 模式，将模块封装到 eval 包裹起来
  // devtool: 'eval',
  mode: "production",
  // 我们应用的入口, 在 `src` 目录 (我们添加到下面的 resolve.modules):
  entry: 'index.tsx',
  // 配置 devServer 的输出目录和 publicPath
  output: {
    filename: 'index.js',
    publicPath: 'public',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  // 告诉 Webpack 加载 TypeScript 文件
  resolve: {
    // 首先寻找模块中的 .ts(x) 文件, 然后是 .js 文件
    extensions: ['.ts', '.tsx', '.js'],
    // 在模块中添加 src, 当你导入文件时，可以将 src 作为相关路径
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: path.resolve('src'),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: require.resolve('less-loader'), // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
    ]
  },
  externals: [nodeExternals()],
};
