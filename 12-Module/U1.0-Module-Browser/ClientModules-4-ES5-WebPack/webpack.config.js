module.exports = {
  entry: "./scripts/main.js",
  output: {
    path: __dirname + "/deploy",
    filename: "bundle.js"
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      presets: ['es2015']
    }
  ]
}};
