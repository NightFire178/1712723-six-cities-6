const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public"),
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		open: false,
		port: 1337,
		historyApiFallback: true,
	},
	plugins: [
		new Dotenv({
			path: path.resolve(__dirname, "src", "base.env"),
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: ['file-loader'],
			}
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
	},
	devtool: "source-map",
};
