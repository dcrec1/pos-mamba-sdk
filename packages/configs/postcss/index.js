const resolve = require('resolve');
const { existsSync } = require('fs');
const { fromCwd } = require('quickenv');

const postcssEasyImport = require('postcss-easy-import');
const postcssExtendRule = require('postcss-extend-rule');
const postcssAdvancedVariables = require('postcss-advanced-variables');
const postcssCalc = require('postcss-calc');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const cssMqPacker = require('css-mqpacker');
const postcssReporter = require('postcss-reporter');
const postcssHexRGBA = require('postcss-hexrgba');

const IS_BUILDING_APP = !!process.env.APP_ENV;
const __ANDROID__ = process.env.APP_ENV === 'android';

const isBuildingApp = typeof process.env.APP_ENV !== 'undefined';

const LOCAL_THEME_PATH = resolve(CWD, 'src/theme.pcss');

const THEME_FILES = [
  '@mamba/styles/theme.pcss',
  __ANDROID__ && '@mamba/styles/android_theme.pcss',
  existsSync(LOCAL_THEME_PATH) && LOCAL_THEME_PATH,
];

module.exports = {
  plugins: [
    /** Custom plugin to prepend imports */
    postcssUniqueImports.plugin([
      globalThemeFile && '@mamba/styles/theme.pcss',
      /** If building an app, append the local theme file */
      isBuildingApp && existsSync(appThemeFile) && appThemeFile,
    ]),
    postcssEasyImport({
      extensions: ['.css', '.pcss'],
    }),
    postcssExtendRule(),
    postcssAdvancedVariables(),
    postcssCalc({
      warnWhenCannotResolve: true,
    }),
    postcssHexRGBA(),
    postcssPresetEnv({
      stage: 2 /** Defaults postcss-preset-env to stage 2 */,
      features: {
        'custom-properties': {
          preserve: false,
        },
      },
    }),
    postcssNested(),
    cssMqPacker(),
    postcssReporter({ clearReportedMessages: false }),
  ],
};
