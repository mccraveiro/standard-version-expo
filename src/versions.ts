import { AppJSONConfig, getExpoSDKVersion } from '@expo/config';
import { coerce as semver } from 'semver';

/**
 * Get the version code from a manifest and target version.
 * It's designed for Android using the approach from Maxi Rosson.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
export function getVersionCode(manifest: AppJSONConfig, version: string): number {
  const sdk = getExpoSDKVersion(process.cwd(), manifest.expo);
  const expo = semver(sdk);
  const target = semver(version);

  if (!expo) {
    throw new Error('Could not parse the `expo.sdkVersion` from the manifest.');
  }

  if (!target) {
    throw new Error('Could not parse the new version from standard version.');
  }

  if (target.minor >= 100) {
    throw new Error('Minor version cannot be higher than 99.');
  }

  if (target.patch >= 100) {
    throw new Error('Patch version cannot be higher than 99.');
  }

  return expo.major * 10000000 + target.major * 10000 + target.minor * 100 + target.patch;
}
