const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  resolver: {
    extraNodeModules: {
      events: path.resolve(__dirname, 'node_modules/events'),
    },
  },
});
