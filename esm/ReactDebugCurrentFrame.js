/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import describeComponentFrame from "./react-shared/describeComponentFrame.js";
import getComponentName from "./react-shared/getComponentName.js";
const ReactDebugCurrentFrame = {};
let currentlyValidatingElement = null;
export function setCurrentlyValidatingElement(element) {
  if (
  /* __DEV__ */
  false) {
    currentlyValidatingElement = element;
  }
}

if (
/* __DEV__ */
false) {
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    let stack = ''; // Add an extra top frame while an element is being validated

    if (currentlyValidatingElement) {
      const name = getComponentName(currentlyValidatingElement.type);
      const owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    } // Delegate to the injected renderer-specific implementation


    const impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

export default ReactDebugCurrentFrame;