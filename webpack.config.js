const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');




module.exports =  {
 mode: "development",

 devServer: {
   hot: true, 
   historyApiFallback: true,
 contentBase: path.join(__dirname + "/public"),


 // publicPath: "/dist/",
 

},
 target: "web",
  entry: ['webpack-dev-server/client?http://localhost:8080',
'webpack/hot/dev-server', 
"webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
'./src/App.js'],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js", 
    publicPath: '/'
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
    }), 
    new webpack.HotModuleReplacementPlugin()
  ],
 devtool: "production"? "source-map" : "inline-source-map"
};





  
 



