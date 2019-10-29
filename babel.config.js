
module.exports = {
  presets: [
    'next/babel'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ['@babel/plugin-proposal-private-methods', { 'loose': true }],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ]
  ]
};