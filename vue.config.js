const { defineConfig } = require('@vue/cli-service');
module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        // Target API backend hosted in cyclic
        target: 'https://puce-kingfisher-tutu.cyclic.app/',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
};
