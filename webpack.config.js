const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var nodeExternals = require('webpack-node-externals');





module.exports =  {
 mode: "development",

 devServer: {
   historyApiFallback: true,
 contentBase: path.join(__dirname + "/public"),

 // publicPath: "/dist/",
 

},
 target: "web",
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "public/dist"),
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
    })
  ],
 devtool: "production"? "source-map" : "inline-source-map"
};





  
 



