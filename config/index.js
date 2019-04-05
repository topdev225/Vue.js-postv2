// see http://vuejs-templates.github.io/webpack for documentation.
// var path = require('path')
// const customer = 'wsaq';
// const rootUrl = process.env.NODE_ENV !== 'production'
//   ? ('https://test-post.futurimedia.com/' + customer + '/')
//   : '/';

// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
const customer = 'wphm';
const rootUrl = process.env.NODE_ENV !== 'production'
  ? ('http://post-live-frontend.futurimedia.com/' + customer + '/')
  : '/';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/postv2.html'),
    //index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'postv2',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    // proxyTable: {},
    proxyTable: {
      '/api': {
        // target: 'http://192.168.17.190:3000',
        target: rootUrl,
        changeOrigin: true,
        pathRewrite: {
          //'^/api/v1': ''
        }
      },
      '/event': {
        // target: 'http://192.168.17.190:3000',
        target: rootUrl,
        changeOrigin: true,
        pathRewrite: {
          //'^/api/v1': ''
        }
      },
      '/playlist': {
        // target: 'http://192.168.17.190:3000',
        target: rootUrl,
        changeOrigin: true,
        pathRewrite: {
          //'^/api/v1': ''
        }
      },
      '/wphm': {
        // target: 'http://192.168.17.190:3000',
        target: rootUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/wphm/': '/'
        }
      },
      '/ckkq': {
        // target: 'http://192.168.17.190:3000',
        target: rootUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/ckkq/': '/'
        }
      },
    }
  }
}
