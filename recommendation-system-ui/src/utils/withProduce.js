import produce from 'immer';

export default (initialState,reducers) => produce((state = initialState(), { type, payload, meta = {} }) => {
    if (reducers[type]) {
      reducers[type](state, payload, meta);
    }

    return state;
  });