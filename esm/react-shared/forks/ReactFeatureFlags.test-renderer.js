/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import invariant from "../invariant.js";
export const debugRenderPhaseSideEffects = false;
export const debugRenderPhaseSideEffectsForStrictMode = false;
export const enableUserTimingAPI =
/* __DEV__ */
false;
export const warnAboutDeprecatedLifecycles = false;
export const replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
export const enableProfilerTimer = false;
export const enableSchedulerTracing = false;
export const enableSuspenseServerRenderer = false;
export const disableInputAttributeSyncing = false;
export const enableStableConcurrentModeAPIs = false;
export const warnAboutShorthandPropertyCollision = false;
export const enableSchedulerDebugging = false; // Only used in www builds.

export function addUserTimingListener() {
  invariant(false, 'Not implemented.');
} // Flow magic to verify the exports of this file match the original version.
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-expressions
null;