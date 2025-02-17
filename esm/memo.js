/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { REACT_MEMO_TYPE } from "./react-shared/ReactSymbols.js";
import isValidElementType from "./react-shared/isValidElementType.js";
import warningWithoutStack from "./react-shared/warningWithoutStack.js";
export default function memo(type, compare) {
  if (
  /* __DEV__ */
  false) {
    if (!isValidElementType(type)) {
      warningWithoutStack(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare
  };
}