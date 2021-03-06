// vue.config.js
const path = require('path');

const PORT = 8989;
const DEV_HOST = '0.0.0.0';

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // outputDir: path.resolve(__dirname, './build'),
    // assetsDir: path.resolve(__dirname, './assets'),
    // output: {
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    pages: {
        authentication: {
            entry: 'src/authentication/authentication.js',
            template: 'public/index.html',
            filename: 'authentication/index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'authentication']
        },
        account: {
            entry: 'src/account/account.js',
            template: 'public/index.html',
            filename: 'account/index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'account']
        },
        application: {
            entry: 'src/application/application.js',
            template: 'public/index.html',
            filename: 'application/index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'application']
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                src: path.resolve(__dirname, './src')
            }
        },
    },
    devServer: {
        port: PORT,
        historyApiFallback: {
            rewrites: [
                { from: /^\/authentication/, to: path.posix.join('/', 'authentication/index.html') },
                { from: /^\/account/, to: path.posix.join('/', 'account/index.html') },
                { from: /^\/application/, to: path.posix.join('/', 'application/index.html') },
                { from: /./, to: path.posix.join('/', 'application/index.html') },
            ]
        },
        allowedHosts: [DEV_HOST]
    },
    chainWebpack: config => {
        // config
        //     .entry("app")
        //     .clear();

        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'));

        // config
        //     .entry('authentication')
        //     .add('./src/authentication.js')
        //     .end();

        // config
        //     .entry('application')
        //     .add('./src/application.js')
        //     .end();

        // Preferences | Languages & Frameworks | JavaScript | Webpack | Set Webpack path
        // config.resolve.alias
        //     .set('@', resolve('src'));

        // config.devServer
        //     .public('http://127.0.0.1:9697')
        //     .host('127.0.0.1')
        //     .port(9697)
        //     .hotOnly(true)
        //     .watchOptions({poll: 1000})
        //     .https(false)
        //     .headers({"Access-Control-Allow-Origin": ["*"]})
    },
};