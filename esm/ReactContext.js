/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE } from "./react-shared/ReactSymbols.js";
import warningWithoutStack from "./react-shared/warningWithoutStack.js";
import warning from "./react-shared/warning.js";
export function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    if (
    /* __DEV__ */
    false) {
      warningWithoutStack(calculateChangedBits === null || typeof calculateChangedBits === 'function', 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
    }
  }

  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  let hasWarnedAboutUsingNestedContextConsumers = false;
  let hasWarnedAboutUsingConsumerProvider = false;

  if (
  /* __DEV__ */
  false) {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    const Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get() {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },

        set(_Provider) {
          context.Provider = _Provider;
        }

      },
      _currentValue: {
        get() {
          return context._currentValue;
        },

        set(_currentValue) {
          context._currentValue = _currentValue;
        }

      },
      _currentValue2: {
        get() {
          return context._currentValue2;
        },

        set(_currentValue2) {
          context._currentValue2 = _currentValue2;
        }

      },
      _threadCount: {
        get() {
          return context._threadCount;
        },

        set(_threadCount) {
          context._threadCount = _threadCount;
        }

      },
      Consumer: {
        get() {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }

      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  } else {
    context.Consumer = context;
  }

  if (
  /* __DEV__ */
  false) {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}