/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactContext} from 'shared/ReactTypes.js';
import invariant from 'shared/invariant.js';
import warning from 'shared/warning.js';

import ReactCurrentDispatcher from './ReactCurrentDispatcher.js';

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  invariant(
    dispatcher !== null,
    'Hooks can only be called inside the body of a function component. ' +
      '(https://fb.me/react-invalid-hook-call)',
  );
  return dispatcher;
}

export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,
) {
  const dispatcher = resolveDispatcher();
  if ((/* __DEV__ */ false)) {
    warning(
      unstable_observedBits === undefined,
      'useContext() second argument is reserved for future ' +
        'use in React. Passing it is not supported. ' +
        'You passed: %s.%s',
      unstable_observedBits,
      typeof unstable_observedBits === 'number' && Array.isArray(arguments[2])
        ? '\n\nDid you call array.map(useContext)? ' +
          'Calling Hooks inside a loop is not supported. ' +
          'Learn more at https://fb.me/rules-of-hooks'
        : '',
    );

    // TODO: add a more generic warning for invalid values.
    if ((Context: any)._context !== undefined) {
      const realContext = (Context: any)._context;
      // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.
      if (realContext.Consumer === Context) {
        warning(
          false,
          'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' +
            'removed in a future major release. Did you mean to call useContext(Context) instead?',
        );
      } else if (realContext.Provider === Context) {
        warning(
          false,
          'Calling useContext(Context.Provider) is not supported. ' +
            'Did you mean to call useContext(Context) instead?',
        );
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}

export function useState<S>(initialState: (() => S) | S) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

export function useRef<T>(initialValue: T): {current: T} {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

export function useEffect(
  create: () => (() => void) | void,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

export function useLayoutEffect(
  create: () => (() => void) | void,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

export function useCallback(
  callback: () => mixed,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

export function useMemo(
  create: () => mixed,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

export function useImperativeHandle<T>(
  ref: {current: T | null} | ((inst: T | null) => mixed) | null | void,
  create: () => T,
  inputs: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

export function useDebugValue(value: any, formatterFn: ?(value: any) => any) {
  if ((/* __DEV__ */ false)) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}
