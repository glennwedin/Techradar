var webpack = require('webpack');
var path = require('path')

var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
     nodeModules[mod] = 'commonjs ' + mod;    
});

module.exports = [
    {
        name: 'server',
        entry: "./src/server.js",
        output: {
            path: __dirname,
            filename: "server.js"
        },
        externals: nodeModules,
        target: 'node',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel'
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        }
    },
    {
        name: 'client',
        entry: "./src/client.js",
        output: {
            path: __dirname,
            filename: "./public/js/app.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "scss", "sass"]
                }
            ]
        }
    }
];