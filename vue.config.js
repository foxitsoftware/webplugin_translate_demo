const path = require('path')
const fs = require('fs')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? './'
    : './'

module.exports = {
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    publicPath: BASE_URL,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
    },
    productionSourceMap: false,
    devServer: {
        port: 47777,
        https: true,
        key: fs.readFileSync('./certificate/server.key'),
        cert: fs.readFileSync('./certificate/server.crt'),
        proxy: {
            '/web': {
                target: 'http://localhost:8089/',
                ws: false,
                changeOrigin: true
            }
        }
    },
    transpileDependencies: [],
    configureWebpack: {
        plugins: []
    }
}
