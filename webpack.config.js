const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  const isProduction = env === "production";
  return {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    },
    entry: "./src/App.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ],
          test: /\.s?css$/
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })
    ],
    devtool: isProduction ? "source-map" : "inline-source-map"
  };
};
