const { AndroidConfig, withAndroidManifest } = require("@expo/config-plugins");
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;
function addAttributesToApplication(androidManifest, attributes) {
  const { manifest } = androidManifest;

  if (!Array.isArray(manifest["application"])) {
    console.warn(
      "withAndroidApplicationAttributes: No manifest.application array?"
    );
    return androidManifest;
  }

  const application = manifest["application"].find(
    (item) => item.$["android:name"] === ".MainApplication"
  );
  if (!application) {
    console.warn("withAndroidApplicationAttributes: No .MainApplication?");
    return androidManifest;
  }

  application.$ = { ...application.$, ...attributes };

  return androidManifest;
}
function setCustomConfigAsync(
  config,
  androidManifest
) {
  const appId = 'WW6-ZRZ-676Z';
  // Get the <application /> tag and assert if it doesn't exist.
  const mainApplication = getMainApplicationOrThrow(androidManifest);

  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    'CLEVERTAP_ACCOUNT_ID',
    // value for `android:value`
    appId
  );
  addMetaDataItemToMainApplication(
    mainApplication,
    // value for `android:name`
    'CLEVERTAP_TOKEN',
    // value for `android:value`
    "121-600"
  );
    return androidManifest
  }
module.exports = function withAndroidApplicationAttributes(config, attributes) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addAttributesToApplication(
      config.modResults,
      attributes
    );
    config.modResults = setCustomConfigAsync(config, config.modResults);
    return config;
  });
};