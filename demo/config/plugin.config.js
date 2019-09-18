import fs from 'fs';

export default (config) => {
  const configStr = '/* eslint-disable */\nexport default ' + config.toString();
  fs.writeFileSync('./.webpack.config.js', configStr);
};
