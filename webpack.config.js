const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
let target = 'web'; // https://github.com/webpack/webpack-dev-server/issues/2758

const plugins = [new HtmlWebpackPlugin({ template: './src/index.html' })];

if (process.env.NODE_ENV === 'production') {
  target = 'browserslist';
  mode = 'production';
}

module.exports = {
  entry: './src/index.tsx', // react-refresh-webpack-plugin can't find the entry without it.
  mode,
  output: {
    path: path.resolve(__dirname, 'dist'), // output path is required for `clean-webpack-plugin`
    assetModuleFilename: 'static/[name].[hash:8].[ext]',
    publicPath: '/', // https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/getPublicUrlOrPath.js
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  devtool: mode === 'development' ? 'cheap-module-source-map' : false,

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
  },

  devServer: {
    contentBase: './dist',
    hot: true,
    open: true,
  },
};
