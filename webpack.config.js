const path = require('path');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        open: false,
        port: 1337,
        historyApiFallback: true,
    },
    plugins:[
        new Dotenv({
            path: path.resolve(__dirname, 'src', 'base.env')
        })
    ],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            },
        }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
};
