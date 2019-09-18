const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: [
    'location-backbone-canvas',
    'location-backbone-canvas-amap',
    'location-backbone-canvas-bmap',
    'location-backbone-fe',
    'location-backbone-sdk',
    'location-backbone-store'
  ]
});