const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        open: true,
        hot: true,   
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean:true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/index.html',
            filename: 'main/index.html',
        }),
        new HtmlWebpackPlugin({ 
            template: './src/pets/index.html',
            filename: 'pets/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader, 
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                               plugins: [postcssPresetEnv({ stage: 0 })],
                            }
                        }
                    },
                    "sass-loader"
                ],
              },
              {
                test: /\.(ttf|woff|woff2)?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
              },
               {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env']
                    ]
                  }
                }
              }
        ]
    }
}