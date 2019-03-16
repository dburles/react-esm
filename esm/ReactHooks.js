/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import invariant from "./react-shared/invariant.js";
import warning from "./react-shared/warning.js";
import ReactCurrentDispatcher from "./ReactCurrentDispatcher.js";

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  invariant(dispatcher !== null, 'Hooks can only be called inside the body of a function component. ' + '(https://fb.me/react-invalid-hook-call)');
  return dispatcher;
}

export function useContext(Context, unstable_observedBits) {
  const dispatcher = resolveDispatcher();

  if (
  /* __DEV__ */
  false) {
    warning(unstable_observedBits === undefined, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : ''); // TODO: add a more generic warning for invalid values.

    if (Context._context !== undefined) {
      const realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        warning(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        warning(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
export function useReducer(reducer, initialArg, init) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
export function useRef(initialValue) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
export function useEffect(create, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}
export function useLayoutEffect(create, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}
export function useCallback(callback, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}
export function useMemo(create, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}
export function useImperativeHandle(ref, create, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}
export function useDebugValue(value, formatterFn) {
  if (
  /* __DEV__ */
  false) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}