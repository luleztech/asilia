/**
 * Project-level React Native CLI config.
 * Registers run-android / run-ios so the CLI finds them (fixes "unknown command" when
 * the config from node_modules/react-native is not loaded correctly).
 */
const android = require('@react-native-community/cli-platform-android');
const ios = require('@react-native-community/cli-platform-ios');

module.exports = {
  commands: [...android.commands, ...ios.commands],
  platforms: {
    android: {
      projectConfig: android.projectConfig,
      dependencyConfig: android.dependencyConfig,
    },
    ios: {
      projectConfig: ios.projectConfig,
      dependencyConfig: ios.dependencyConfig,
    },
  },
};
