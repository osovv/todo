const { configure, presets } = require('eslint-kit');

module.exports = configure({
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react({ newJSXTransform: true }),
    presets.effector(),
  ],
  extend: {
    plugins: ['@reatom'],
    extends: ['plugin:storybook/recommended', 'plugin:@reatom/recommended'],
    overrides: [
      {
        files: ['vite.config.ts', 'src/**/*.stories.tsx'],
        rules: {
          'import/no-default-export': ['off'],
        },
      },
    ],
  },
});
