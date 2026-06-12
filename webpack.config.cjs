const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

class CleanStaleAssetsPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CleanStaleAssetsPlugin', (compilation) => {
      const out = compilation.outputOptions.path
      if (!fs.existsSync(out)) return

      const keep = new Set(Object.keys(compilation.assets))

      for (const file of fs.readdirSync(out)) {
        if (keep.has(file)) continue
        if (/^app\.[a-f0-9]+\.(js|css)(\.(map|LICENSE\.txt))?$/.test(file)) {
          fs.unlinkSync(path.join(out, file))
        }
      }
    })
  }
}

module.exports = {
  entry: {
    app: './src/main.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    clean: true, // xóa dist trước mỗi lần build
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[name].[contenthash].css' : '[name].css',
    }),
    ...(isProd ? [new CleanStaleAssetsPlugin()] : []),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    devMiddleware: {
      writeToDisk: false, // dev không ghi file rác vào dist
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval-source-map',
}
