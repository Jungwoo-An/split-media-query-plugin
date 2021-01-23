import { WebpackPluginInstance, Compiler } from 'webpack';
import { RawSource } from 'webpack-sources';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import extract from './extract';

class SplitMediaQueryPlugin implements WebpackPluginInstance {
  static PLUGIN_NAME = 'SplitMediaQueryPlugin';

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      SplitMediaQueryPlugin.PLUGIN_NAME,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
          SplitMediaQueryPlugin.PLUGIN_NAME,
          (data) => {
            data.assetTags.styles.forEach((style) => {
              const filename = style.attributes.href as string;
              const source = compilation.assets[filename].source();
              const extractedMediaQueries = extract(source.toString('utf-8'));

              extractedMediaQueries.forEach(({ query, stylesheet }, index) => {
                const normalizedFilename = !!query
                  ? filename.replace(/(\.css)$/, `.${index}$1`)
                  : filename;

                compilation.assets[normalizedFilename] = new RawSource(
                  stylesheet
                ) as any;

                if (query) {
                  data.assetTags.styles.push({
                    tagName: 'link',
                    voidTag: true,
                    attributes: {
                      href: normalizedFilename,
                      rel: 'stylesheet',
                      media: query,
                    },
                  });
                }
              });
            });

            return data;
          }
        );
      }
    );
  }
}

export default SplitMediaQueryPlugin;
