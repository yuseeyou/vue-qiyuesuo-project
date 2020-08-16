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
    }
}
