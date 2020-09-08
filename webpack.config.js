const path = require('path');

module.exports = {
    mode: "production",
    target: "node",
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
 
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
    ],
    'alias': {
      '@src': path.resolve(__dirname, 'src'),
      '@env': path.resolve(__dirname, 'envs'),
      '@customTypes': path.resolve(__dirname, 'customTypes'),
    },
    },
    module: {
        rules: [{
          test: /\.(ts|tsx)$/,
          exclude: [/node_modules/, /test/],
          use: {
            
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread'
              ]
            }}
          }]
        }
}