const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const root = path.resolve(__dirname, '../');
const dist = path.join(root, 'dist');

const extractCSS = new ExtractTextPlugin({ filename: '[name].css', allChunks: true });
const extractVendorCSS = new ExtractTextPlugin({ filename: '[name].css', allChunks: true });

const jsRule = {
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /(node_modules)/,
};

const tsRule = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /(node_modules)/,
};

const bundleSassRule = {
  test: /\.(css|scss)$/,
  exclude: fs.realpathSync('./vendor'),
  use: extractCSS.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          url: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
        },
      },
    ],
  })
};

const vendorSassRule = {
  test: /\.(css|scss)$/,
  include: fs.realpathSync('./vendor'),
  use: extractVendorCSS.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          url: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
        },
      },
    ],
  })
}

const imageRule = {
  test: /\.(png|gif|jpe?g|svg|woff|woff2|ttf|eot)$/,
  loader: 'file-loader',
};

const htmlRuls = {
  test: /\.html/,
  loader: 'html-loader',
};

module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/index.tsx',
    vendor: './vendor/css/import.scss',
  },
  output: {
    path: dist,
    filename: '[name].js',
  },
  module: {
    rules: [jsRule, tsRule, bundleSassRule, vendorSassRule, imageRule, htmlRuls],
  },
  plugins: [
    extractCSS,
    extractVendorCSS,
    new CleanWebpackPlugin([dist], { root: path.resolve(__dirname, '..'), verbose: true }),
    new HtmlWebpackPlugin({ template: './src/index.html', inject: true, excludeAssets: [/vendor.js/] }),
    new HtmlWebpackExcludeAssetsPlugin()
  ],
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ],
  }
};
