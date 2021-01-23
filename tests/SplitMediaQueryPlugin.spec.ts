import path from 'path';

import { expect } from 'chai';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { createFsFromVolume, Volume } from 'memfs';
import { JSDOM } from 'jsdom';

import SplitMediaQueryPlugin from '../lib';

describe('SplitMediaQueryPlugin', () => {
  it('should split media query css into multiple css', (done) => {
    const outputFileSystem = createFsFromVolume(new Volume());

    const compiler = webpack(
      {
        mode: 'production',
        entry: {
          app: path.resolve('./tests/fixtures/app.js'),
        },
        output: {
          path: path.resolve('./dist'),
          filename: '[name].js',
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
          ],
        },
        plugins: [
          new HtmlWebpackPlugin(),
          new MiniCssExtractPlugin(),
          new SplitMediaQueryPlugin(),
        ],
      },
      (err, result) => {
        try {
          expect(err).to.be.null;
          expect(result!.compilation.errors).to.be.empty;

          const html = outputFileSystem
            .readFileSync(path.resolve('./dist/index.html'))
            ?.toString('utf-8');

          expect(html).to.not.empty;
          const dom = new JSDOM(html);

          const links = dom.window.document.querySelectorAll('link');

          expect(links.length).to.eq(4);
          expect(links[0].href).to.eq('app.css');
          expect(links[1].href).to.eq('app.1.css');
          expect(links[1].media).to.eq('(max-width:767px);');
          expect(links[2].href).to.eq('app.2.css');
          expect(links[2].media).to.eq(
            '(min-width:768px) and (max-width:1023px);'
          );
          expect(links[3].href).to.eq('app.3.css');
          expect(links[3].media).to.eq('(min-width:1024px);');

          done();
        } catch (e) {
          done(e);
        }
      }
    );

    compiler.outputFileSystem = outputFileSystem as any;
  });
});
