'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let next;

    switch (action.type) {
      case 'addProperties':
        next = { ...currentState, ...action.extraData };
        history.push(next);
        currentState = next;
        break;

      case 'removeProperties':
        next = { ...currentState };

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        history.push(next);
        currentState = next;
        break;

      case 'clear':
        next = {};
        history.push(next);
        currentState = next;
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
