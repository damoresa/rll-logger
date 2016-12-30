'use strict';

const path = require('path');
const webpack = require('webpack');
const PATH_SRC = path.resolve(__dirname + '/../src');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ PATH_SRC, 'node_modules' ]
    },

    module: {
        rules: [
          /**
           * Source map loader support for *.js files
           * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
           *
           * See: https://github.com/webpack/source-map-loader
           */
          {
            enforce: 'pre',
            test: /\.js$/,
            use: 'source-map-loader',
            exclude: [
              // these packages have problems with their sourcemaps
              path.resolve('node_modules/rxjs'),
              path.resolve('node_modules/@angular')
            ]
          },
          /*{
            enforce: 'pre',
            test: /\.ts$/,
            use: 'tslint-loader',
            exclude: [
              path.resolve('node_modules')
            ]
          },*/

          /**
           * Typescript loader support for .ts and Angular 2 async routes via .async.ts
           * See: https://github.com/s-panferov/awesome-typescript-loader
           */
          {
              test: /\.ts$/,
              loaders: [
                'awesome-typescript-loader?inlineSourceMap=true,sourceMap=false,compilerOptions{}=removeComments:true',
                'angular2-template-loader'
              ],
              exclude: [/\.e2e\.ts$/]
          },

          /**
           * Instruments JS files with Istanbul for subsequent code coverage reporting.
           * Instrument only testing sources.
           *
           * See: https://github.com/deepsweet/istanbul-instrumenter-loader
           */
          {
            test: /\.(js|ts)$/,
            enforce: 'post',  // postLoaders
            loader: 'istanbul-instrumenter-loader',
            include: PATH_SRC,
            exclude: [
              /\.(e2e|spec)\.ts$/,
              /node_modules/
            ]
          }
        ]
    },

    plugins: [
      // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
      new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
          path.resolve('./../src')
      ),

      new LoaderOptionsPlugin({
          debug: true,
          options: {
              /**
               * Static analysis linter for TypeScript advanced options configuration
               * Description: An extensible linter for the TypeScript language.
               * See: https://github.com/wbuchwalter/tslint-loader
               */
              tslint: {
                  emitErrors: false,
                  failOnHint: false,
                  resourcePath: 'src'
              },

          }
      })
    ]
};
