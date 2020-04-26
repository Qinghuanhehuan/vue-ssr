const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSrClientPlugin = require('vue-server-renderer/client-plugin')
//优化策略
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
//根据WEBPACK_TARGET环境变量做相应的输出
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  css: {
    extract: false
  },
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    //外置化应用程序依赖模块，使服务器构建速度更快，生成较小的bundle
    externals: TARGET_NODE ? nodeExternals({
      whitelist: [/\.css$/]
    }) : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSrClientPlugin()]
  }),
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(options => {
      merge(options, {
        optimizeSSR: false
      })
    })
  }
}
