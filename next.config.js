const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: [
    'externalSDK',
    'location-backbone-canvas',
    'location-backbone-fe',
    'location-backbone-store'
  ]
});