module.exports = {
  context: __dirname, // `__dirname` is root of project
  entry: {
    index: './index.js',
    html: './index.html',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  devServer: {
    open: true, // to open the local server in browser
  },
};
