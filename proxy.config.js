const PROXY_CONFIG = {
    "/query-service/*": {
        "target": "http://localhost:19002",
        "secure": false,
        logLevel: "debug",
        pathRewrite: function (path, req) { return path.replace('/query-service', '/query/service')},
    }
}

module.exports = PROXY_CONFIG;