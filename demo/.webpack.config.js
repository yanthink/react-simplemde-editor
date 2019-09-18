/* eslint-disable */
export default {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/einsition/code/react-simplemde-editor/demo/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: info => {
      return (0, _path().relative)(opts.cwd, info.absoluteResourcePath).replace(/\\/g, '/');
    },
    pathinfo: true
  },
  resolve: {
    symlinks: true,
    alias: {
      react: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/react',
      'react-dom': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/react-dom',
      'react-router': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/react-router',
      'react-router-dom': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/react-router-dom',
      'react-router-config': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/react-router-config',
      history: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-history',
      '@': '/Users/einsition/code/react-simplemde-editor/demo/src/',
      '@tmp': '/Users/einsition/code/react-simplemde-editor/demo/src/pages/.umi',
      umi: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi',
      'regenerator-runtime': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/node_modules/regenerator-runtime',
      antd: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/antd',
      'antd-mobile': '/Users/einsition/code/react-simplemde-editor/demo/node_modules/antd-mobile'
    },
    extensions: [
      '.web.js',
      '.wasm',
      '.mjs',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json'
    ],
    modules: [
      'node_modules',
      '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules',
      '/Users/einsition/code/react-simplemde-editor/demo/node_modules/'
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules'
    ]
  },
  module: {
    rules: [
      /* config.module.rule('exclude') */
      {
        exclude: [
          /\.json$/,
          /\.(js|jsx|ts|tsx|mjs|wasm)$/,
          /\.(graphql|gql)$/,
          /\.(css|less|scss|sass)$/
        ],
        use: [
          /* config.module.rule('exclude').use('url-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-url-pnp-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: [
          '/Users/einsition/code/react-simplemde-editor/demo'
        ],
        exclude: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('eslint').use('eslint-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/eslint-loader/index.js',
            options: {
              formatter: function formatter(results) {
                let output = '\n';
                let hasErrors = false;
                let reportContainsErrorRuleIDs = false;
              
                results.forEach(result => {
                  let messages = result.messages;
                  if (messages.length === 0) {
                    return;
                  }
              
                  messages = messages.map(message => {
                    let messageType;
                    if (isError(message)) {
                      messageType = 'error';
                      hasErrors = true;
                      if (message.ruleId) {
                        reportContainsErrorRuleIDs = true;
                      }
                    } else {
                      messageType = 'warn';
                    }
              
                    let line = message.line || 0;
                    if (message.column) {
                      line += ':' + message.column;
                    }
                    let position = chalk.bold('Line ' + line + ':');
                    return [
                      '',
                      position,
                      messageType,
                      message.message.replace(/\.$/, ''),
                      chalk.underline(message.ruleId || ''),
                    ];
                  });
              
                  // if there are error messages, we want to show only errors
                  if (hasErrors) {
                    messages = messages.filter(m => m[2] === 'error');
                  }
              
                  // add color to rule keywords
                  messages.forEach(m => {
                    m[4] = m[2] === 'error' ? chalk.red(m[4]) : chalk.yellow(m[4]);
                    m.splice(2, 1);
                  });
              
                  let outputTable = table(messages, {
                    align: ['l', 'l', 'l'],
                    stringLength(str) {
                      return stripAnsi(str).length;
                    },
                  });
              
                  output += `${outputTable}\n\n`;
                });
              
                if (reportContainsErrorRuleIDs) {
                  // Unlike with warnings, we have to do it here.
                  // We have similar code in react-scripts for warnings,
                  // but warnings can appear in multiple files so we only
                  // print it once at the end. For errors, however, we print
                  // it here because we always show at most one error, and
                  // we can only be sure it's an ESLint error before exiting
                  // this function.
                  output +=
                    'Search for the ' +
                    chalk.underline(chalk.red('keywords')) +
                    ' to learn more about each error.';
                }
              
                return output;
              },
              baseConfig: {
                'extends': [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/eslint-config-umi/index.js'
                ]
              },
              ignore: false,
              eslintPath: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/eslint/lib/api.js',
              useEslintrc: false
            }
          }
        ]
      },
      /* config.module.rule('mjs-require') */
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: [
          '/Users/einsition/code/react-simplemde-editor/demo'
        ]
      },
      /* config.module.rule('mjs') */
      {
        test: /\.mjs$/,
        include: [
          '/Users/einsition/code/react-simplemde-editor/demo'
        ],
        use: [
          /* config.module.rule('mjs').use('babel-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                      modules: false
                    }
                  }
                ]
              ],
              plugins: [
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd-mobile'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false
                  },
                  'ant-design-pro'
                ],
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
                      'yaml'
                    ],
                    plugins: [
                      'line-numbers'
                    ],
                    theme: 'okaidia',
                    css: true
                  }
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'
                      }
                    }
                  }
                ],
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/babel-plugin-dynamic-import-node/lib/index.js'
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/webpack-overrides.js'
            }
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.js$/,
        include: [
          '/Users/einsition/code/react-simplemde-editor/demo'
        ],
        exclude: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                      modules: false
                    }
                  }
                ]
              ],
              plugins: [
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd-mobile'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false
                  },
                  'ant-design-pro'
                ],
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
                      'yaml'
                    ],
                    plugins: [
                      'line-numbers'
                    ],
                    theme: 'okaidia',
                    css: true
                  }
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'
                      }
                    }
                  }
                ],
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/babel-plugin-dynamic-import-node/lib/index.js'
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/webpack-overrides.js'
            }
          }
        ]
      },
      /* config.module.rule('jsx') */
      {
        test: /\.jsx$/,
        include: [
          '/Users/einsition/code/react-simplemde-editor/demo'
        ],
        use: [
          /* config.module.rule('jsx').use('babel-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                      modules: false
                    }
                  }
                ]
              ],
              plugins: [
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd-mobile'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false
                  },
                  'ant-design-pro'
                ],
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
                      'yaml'
                    ],
                    plugins: [
                      'line-numbers'
                    ],
                    theme: 'okaidia',
                    css: true
                  }
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'
                      }
                    }
                  }
                ],
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/babel-plugin-dynamic-import-node/lib/index.js'
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/webpack-overrides.js'
            }
          }
        ]
      },
      /* config.module.rule('extraBabelInclude_0') */
      {
        test: /\.jsx?$/,
        include: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('extraBabelInclude_0').use('babel-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                      modules: false
                    }
                  }
                ]
              ],
              plugins: [
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd-mobile'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false
                  },
                  'ant-design-pro'
                ],
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
                      'yaml'
                    ],
                    plugins: [
                      'line-numbers'
                    ],
                    theme: 'okaidia',
                    css: true
                  }
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'
                      }
                    }
                  }
                ],
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/babel-plugin-dynamic-import-node/lib/index.js'
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/webpack-overrides.js'
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.tsx?$/,
        use: [
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-loader/lib/index.js',
            options: {
              presets: [
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/index.js',
                  {
                    targets: {
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10
                    },
                    env: {
                      useBuiltIns: 'entry',
                      corejs: 2,
                      modules: false
                    }
                  }
                ]
              ],
              plugins: [
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/umi-build-dev/lib/plugins/afwebpack-config/lockCoreJSVersionPlugin.js',
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es',
                    style: true
                  },
                  'antd-mobile'
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-import/lib/index.js',
                  {
                    libraryName: 'ant-design-pro',
                    libraryDirectory: 'lib',
                    style: true,
                    camel2DashComponentName: false
                  },
                  'ant-design-pro'
                ],
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
                      'yaml'
                    ],
                    plugins: [
                      'line-numbers'
                    ],
                    theme: 'okaidia',
                    css: true
                  }
                ],
                [
                  '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/svgr.js?-prettier,-svgo![path]'
                      }
                    }
                  }
                ],
                '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/node_modules/babel-plugin-dynamic-import-node/lib/index.js'
              ],
              sourceType: 'unambiguous',
              cacheDirectory: true,
              babelrc: false,
              customize: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/babel-preset-umi/lib/webpack-overrides.js'
            }
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/ts-loader/index.js',
            options: {
              configFile: '/Users/einsition/code/react-simplemde-editor/demo/tsconfig.json',
              transpileOnly: true,
              errorFormatter(error, colors) {
                const messageColor = error.severity === 'warning' ? colors.bold.yellow : colors.bold.red;
                return colors.grey('[tsl] ') + messageColor(error.severity.toUpperCase()) + (error.file === '' ? '' : messageColor(' in ') + colors.bold.cyan(`${(0, _path().relative)(cwd, (0, _path().join)(error.context, error.file))}(${error.line},${error.character})`)) + _os().EOL + messageColor(`      TS${error.code}: ${error.content}`);
              }
            }
          }
        ]
      },
      /* config.module.rule('graphql') */
      {
        test: /\.(graphql|gql)$/,
        exclude: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('graphql').use('graphql-tag-loader') */
          {
            loader: 'graphql-tag/loader'
          }
        ]
      },
      /* config.module.rule('cssModulesExcludes_0') */
      {
        test: filePath => {
          if (exclude instanceof RegExp) {
            return exclude.test(filePath);
          } else {
            return filePath.indexOf(exclude) > -1;
          }
        },
        use: [
          /* config.module.rule('cssModulesExcludes_0').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('cssModulesExcludes_0').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('cssModulesExcludes_0').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('cssModulesExcludes_1') */
      {
        test: filePath => {
          if (exclude instanceof RegExp) {
            return exclude.test(filePath);
          } else {
            return filePath.indexOf(exclude) > -1;
          }
        },
        use: [
          /* config.module.rule('cssModulesExcludes_1').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('cssModulesExcludes_1').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('cssModulesExcludes_1').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('cssModulesExcludes_2') */
      {
        test: filePath => {
          if (exclude instanceof RegExp) {
            return exclude.test(filePath);
          } else {
            return filePath.indexOf(exclude) > -1;
          }
        },
        use: [
          /* config.module.rule('cssModulesExcludes_2').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('cssModulesExcludes_2').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('cssModulesExcludes_2').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          },
          /* config.module.rule('cssModulesExcludes_2').use('less-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/less-loader/dist/cjs.js',
            options: {
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      },
      /* config.module.rule('cssModulesExcludes_3') */
      {
        test: filePath => {
          if (exclude instanceof RegExp) {
            return exclude.test(filePath);
          } else {
            return filePath.indexOf(exclude) > -1;
          }
        },
        use: [
          /* config.module.rule('cssModulesExcludes_3').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('cssModulesExcludes_3').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('cssModulesExcludes_3').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('css').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('css').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('css').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('css-in-node_modules') */
      {
        test: /\.css$/,
        include: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('css-in-node_modules').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('css-in-node_modules').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('css-in-node_modules').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('less').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('less').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('less').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          },
          /* config.module.rule('less').use('less-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/less-loader/dist/cjs.js',
            options: {
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      },
      /* config.module.rule('less-in-node_modules') */
      {
        test: /\.less$/,
        include: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('less-in-node_modules').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('less-in-node_modules').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('less-in-node_modules').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          },
          /* config.module.rule('less-in-node_modules').use('less-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/less-loader/dist/cjs.js',
            options: {
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.(sass|scss)$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('sass').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('sass').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('sass').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      },
      /* config.module.rule('sass-in-node_modules') */
      {
        test: /\.(sass|scss)$/,
        include: [
          /node_modules/
        ],
        use: [
          /* config.module.rule('sass-in-node_modules').use('extract-css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/mini-css-extract-plugin/dist/loader.js',
            options: {
              publicPath: '/',
              hmr: true
            }
          },
          /* config.module.rule('sass-in-node_modules').use('css-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/css-loader-1/index.js',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: false
            }
          },
          /* config.module.rule('sass-in-node_modules').use('postcss-loader') */
          {
            loader: '/Users/einsition/code/react-simplemde-editor/demo/node_modules/postcss-loader/src/index.js',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), // eslint-disable-line
              (0, _autoprefixer().default)(_objectSpread({
                overrideBrowserslist: opts.browserslist || DEFAULT_BROWSERS,
                flexbox: 'no-2009'
              }, opts.autoprefixer || {})), ...(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []), ...(isDev || process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS ? [] : [require('cssnano')({
                preset: ['default', opts.cssnano || {
                  mergeRules: false,
                  // ref: https://github.com/umijs/umi/issues/955
                  normalizeUrl: false
                }]
              })])]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: '[name].css',
        chunkFilename: '[name].chunk.css'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"'
        },
        'process.env.BASE_URL': '"/"',
        __IS_BROWSER: 'true',
        __UMI_BIGFISH_COMPAT: undefined,
        __UMI_HTML_SUFFIX: 'false'
      }
    ),
    /* config.plugin('progress') */
    new WebpackBarPlugin(
      {
        color: 'green',
        reporters: [
          'fancy'
        ]
      }
    ),
    /* config.plugin('filter-css-conflicting-warnings') */
    new FilterCSSConflictingWarning(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        clearConsole: false
      }
    ),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin()
  ],
  entry: {
    umi: [
      '/Users/einsition/code/react-simplemde-editor/demo/node_modules/af-webpack/lib/webpackHotDevClient.js',
      '/Users/einsition/code/react-simplemde-editor/demo/src/pages/.umi/umi.js'
    ]
  }
}