const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Входная точка
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV || 'development', // Режим сборки
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Поддержка JS/TS
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Поддержка CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    historyApiFallback: true, // Для работы с React Router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Шаблон HTML
      filename: 'index.html',
    }),
  ],
};
