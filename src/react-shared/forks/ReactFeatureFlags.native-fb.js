/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'shared/invariant.js';

import typeof * as FeatureFlagsType from 'shared/ReactFeatureFlags.js';
import typeof * as FeatureFlagsShimType from './ReactFeatureFlags.native-fb.js';

// Re-export dynamic flags from the fbsource version.
export const {debugRenderPhaseSideEffects} = require('ReactFeatureFlags');

// The rest of the flags are static for better dead code elimination.
export const enableUserTimingAPI = (/* __DEV__ */ false);
export const enableProfilerTimer = __PROFILE__;
export const enableSchedulerTracing = __PROFILE__;
export const enableSuspenseServerRenderer = false;
export const enableStableConcurrentModeAPIs = false;
export const warnAboutShorthandPropertyCollision = false;
export const enableSchedulerDebugging = false;
export const debugRenderPhaseSideEffectsForStrictMode = true;
export const disableInputAttributeSyncing = false;
export const replayFailedUnitOfWorkWithInvokeGuardedCallback = (/* __DEV__ */ false);
export const warnAboutDeprecatedLifecycles = true;

// Only used in www builds.
export function addUserTimingListener() {
  invariant(false, 'Not implemented.');
}

// Flow magic to verify the exports of this file match the original version.
// eslint-disable-next-line no-unused-vars
type Check<_X, Y: _X, X: Y = _X> = null;
// eslint-disable-next-line no-unused-expressions
(null: Check<FeatureFlagsShimType, FeatureFlagsType>);
