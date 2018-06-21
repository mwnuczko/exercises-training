module.exports = {
  context: __dirname, // `__dirname` is root of project
  entry: {
    index: './index.ts',
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
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: ['node_modules', '../src'],
      },
    ],
  },
  devServer: {
    open: true, // to open the local server in browser
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
