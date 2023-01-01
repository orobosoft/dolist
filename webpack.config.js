// process.env.NODE_ENV = "production";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		index: "./src/index.js",
	},
	// devtool: "source-map",
	// devServer: {
	// 	static: "./dist",
	// },
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({title: "DoList" }),
		new MiniCssExtractPlugin({ filename: "[name].css" }),
	],
	// plugins: [
	// 	new HtmlWebpackPlugin({ template: "./src/index.html", title: "DoList" }),
	// 	new MiniCssExtractPlugin({ filename: "[name].css" }),
	// ],
	performance: {
		hints: process.env.NODE_ENV === "production" ? "warning" : false,
	},
};
