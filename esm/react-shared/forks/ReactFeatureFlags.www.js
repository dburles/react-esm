/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// Re-export dynamic flags from the www version.
export const {
  debugRenderPhaseSideEffects,
  debugRenderPhaseSideEffectsForStrictMode,
  replayFailedUnitOfWorkWithInvokeGuardedCallback,
  warnAboutDeprecatedLifecycles,
  disableInputAttributeSyncing,
  warnAboutShorthandPropertyCollision
} = require('ReactFeatureFlags'); // In www, we have experimental support for gathering data
// from User Timing API calls in production. By default, we
// only emit performance.mark/measure calls in (/* __DEV__ */ false). But if
// somebody calls addUserTimingListener() which is exposed as an
// experimental FB-only export, we call performance.mark/measure
// as long as there is more than a single listener.

export let enableUserTimingAPI =
/* __DEV__ */
false;
export const enableProfilerTimer = __PROFILE__;
export const enableSchedulerTracing = __PROFILE__;
export const enableSchedulerDebugging = true;
export const enableStableConcurrentModeAPIs = false;
export const enableSuspenseServerRenderer = true;
let refCount = 0;
export function addUserTimingListener() {
  if (
  /* __DEV__ */
  false) {
    // Noop.
    return () => {};
  }

  refCount++;
  updateFlagOutsideOfReactCallStack();
  return () => {
    refCount--;
    updateFlagOutsideOfReactCallStack();
  };
} // The flag is intentionally updated in a timeout.
// We don't support toggling it during reconciliation or
// commit since that would cause mismatching user timing API calls.

let timeout = null;

function updateFlagOutsideOfReactCallStack() {
  if (!timeout) {
    timeout = setTimeout(() => {
      timeout = null;
      enableUserTimingAPI = refCount > 0;
    });
  }
} // Flow magic to verify the exports of this file match the original version.
// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-expressions
null;