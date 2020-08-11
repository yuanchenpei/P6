module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'primary-color': '#838889', //#2C9678
                    'link-color': '#fff',//#18A784
                    'border-radius-base': '2px',
                    'font-size-base':'12px'
                }
            },
        },
    },
    devServer: {
        port: 8099,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: "https://www.fastmock.site/mock/9d3c2acdb18204e7ac7eee4610698595/p6", // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                changOrigin: true, //是否跨域
                pathRewrite: { "^/api": "" }
            }
        }
    }
};