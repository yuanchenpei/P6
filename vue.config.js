module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'primary-color': '#1b6e7d', //#2C9678
                    'link-color': '#fff',//#18A784
                    'border-radius-base': '3px',
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
                target: "http://10.0.7.109:9000", // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                changOrigin: true, //是否跨域
                pathRewrite: { "^/api": "" }
            }
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
};