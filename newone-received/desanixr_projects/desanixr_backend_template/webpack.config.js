const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: { app: './src/app.ts' },
    externalsPresets: { node: true },
    context: __dirname,

    externals: [nodeExternals()],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'server.js',
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'package.json' }, { from: `.env` }],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.APP_ENV),
      }),
    ],
    optimization: {
      minimize: true,
    },
    node: {
      __dirname: true,
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
  };
};
