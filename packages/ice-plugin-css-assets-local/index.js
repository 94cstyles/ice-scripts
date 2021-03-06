const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');

module.exports = ({ context, log, chainWebpack }, options = {}) => {
  const { command } = context;
  const { outputPath, relativeCssPath, activeInDev } = options;
  // it is increase dev build time by set default activeCommands ['build']
  const activeCommands = activeInDev ? ['dev', 'build'] : ['build'];
  if (activeCommands.indexOf(command) > -1) {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');

    chainWebpack((config) => {
      // TODO: set publicPath
      config.plugin('ExtractCssAssetsWebpackPlugin')
        .use(ExtractCssAssetsWebpackPlugin, [{
          outputPath: outputPath || 'assets',
          relativeCssPath: relativeCssPath || '../',
        }]);
    });
  }
};
