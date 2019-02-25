module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.jpg$/,
        use: ['file-loader'],
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    host: 'localhost',
    port: 3001,
    contentBase: `./public`,
    hotOnly: true,
  },
};
