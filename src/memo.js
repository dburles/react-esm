/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {REACT_MEMO_TYPE} from 'shared/ReactSymbols.js';

import isValidElementType from 'shared/isValidElementType.js';
import warningWithoutStack from 'shared/warningWithoutStack.js';

export default function memo<Props>(
  type: React$ElementType,
  compare?: (oldProps: Props, newProps: Props) => boolean,
) {
  if ((/* __DEV__ */ false)) {
    if (!isValidElementType(type)) {
      warningWithoutStack(
        false,
        'memo: The first argument must be a component. Instead ' +
          'received: %s',
        type === null ? 'null' : typeof type,
      );
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
}
