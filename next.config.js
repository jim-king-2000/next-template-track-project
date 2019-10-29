const withTM = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = () => {};
 }
 
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
  [withCSS()],
  [withTM, {
    transpileModules: [
      'location-backbone-canvas',
      'location-backbone-canvas-amap',
      'location-backbone-canvas-bmap',
      'location-backbone-canvas-react-map',
      'location-backbone-fe',
      'location-backbone-react-map',
      'location-backbone-sdk',
      'location-backbone-store',
    ]
  }],
]);
