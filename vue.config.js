const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://app153.qiyuesuo.net/',
                changeOrigin: true,
                wx: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    pluginOptions: { // 第三方插件配置
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/styles/base.less')]
        }
    }
}