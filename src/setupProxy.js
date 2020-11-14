const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            "target": "http://localhost:8888",
            "changeOrgin": true,
            "pathRewrite": {
                "^/api": ''
            }
        })
    )
    app.use(
        createProxyMiddleware('/upload', {
            "target": "http://81.69.28.107:6868",
            "changeOrgin": true
        })
    )
}