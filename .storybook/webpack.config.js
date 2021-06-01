'use strict';
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /.(js|ts)$/,
        use: [
          {loader: 'babel-loader'}
        ],
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/@foxone/uikit')
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
      
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /.sass$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true
            },
          }
        }]
      }

    ],
  },
  plugins: [],
  mode: 'development',
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, '../src/utils')
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".md", ".scss", ".css", ".sass"]
  }
};
