const { withDangerousMod, withPlugins } = require('@expo/config-plugins');
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

function withClevertapPod(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const { platformProjectRoot } = cfg.modRequest;
      const podfile = resolve(platformProjectRoot, 'Podfile');
      const contents = readFileSync(podfile, 'utf-8');
      const lines = contents.split('\n');
      const index = lines.findIndex((line) =>
        /\s+use_expo_modules!/.test(line)
      );

      writeFileSync(
        podfile,
        [
          ...lines.slice(0, index),
          `use_frameworks!
          pod 'clevertap-react-native' , :path => '../node_modules/clevertap-react-native'`,
          ...lines.slice(index),
        ].join('\n')
      );

      return cfg;
     }
  ]);
}

function withClevertap(config) {
  return withPlugins(config, [
    withClevertapPod,
  ]);
}

module.exports = withClevertap;