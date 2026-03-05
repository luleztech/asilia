const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
const merged = mergeConfig(config, {});
module.exports = withNativeWind(merged, { input: './global.css' });
