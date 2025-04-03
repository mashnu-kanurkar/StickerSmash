const { withAppDelegate, withPlugins } = require('@expo/config-plugins');
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

function withClevertapAppDelegate(config) {
    return withAppDelegate(config, (cfg) => {
      const { modResults } = cfg;
      const { contents } = modResults;
      const lines = contents.split('\n');

      // Get Clevertap info from app config
      //const Clevertap = cfg.extra.Clevertap;

      const importIndex = lines.findIndex((line) =>
        /^#import "AppDelegate.h"/.test(line)
      );
      const didLaunchIndex = lines.findIndex((line) =>
        /\[super application:application didFinishLaunching/.test(line)
      );

      modResults.contents = [
        ...lines.slice(0, importIndex + 1),
        '#import <CleverTap-iOS-SDK/CleverTap.h>',
        '#import <Clevertap-react-native/CleverTapReactManager.h>',
        ...lines.slice(importIndex + 1, didLaunchIndex + 1),
        '  [CleverTap autoIntegrate];',
        '  [[CleverTapReactManager sharedInstance] applicationDidLaunchWithOptions:launchOptions];',
        ...lines.slice(didLaunchIndex + 1),
      ].join('\n');

      return cfg;
    });
  }
function withClevertap(config) {
  return withPlugins(config, [
  //  withClevertapPod,
    withClevertapAppDelegate,
  ]);
}

module.exports = withClevertap;