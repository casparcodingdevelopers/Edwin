import search from './api'
const SEARCH_FRIEND_REQUEST = '@kupara/SEARCH_FRIEND_REQUEST';
const SEARCH_FRIEND__SUCCESS = '@kupara/SEARCH_FRIEND__SUCCESS';
const SEARCH_FRIEND__FAILURE = '@kupara/SEARCH_FRIEND__FAILURE';

export function searchFriends(query) {
  return async dispatch => {
    dispatch({
      type: SEARCH_FRIEND_REQUEST,
    });

    try {
      const matches = await search(query);
      dispatch({
        type: SEARCH_FRIEND__SUCCESS,
        payload: {
          data: matches,
        },
      });
    } catch (e) {
      dispatch({
        type: SEARCH_FRIEND__FAILURE,
        payload: {
          errorMessage: 'No match found',
        },
      });
    }
  };
}
// =========================================================================
// Action Handlers

// Your reducer should be without side effects, simply digesting the action
// payload and returning a new state object
// =========================================================================

const ACTION_HANDLERS = {
  [SEARCH_FRIEND_REQUEST]: state =>
    Object.assign({}, state, {
      searching: true,
      errorMessage: '',
    }),
  [SEARCH_FRIEND__SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      searching: false,
      searchComplete: true,
      matches: action.payload.data,
    }),
  [SEARCH_FRIEND__FAILURE]: (state, action) =>
    Object.assign({}, state, {
      searching: false,
      searchComplete: true,
      matches: [],
      errorMessage: action.payload.errorMessage,
    }),
};

// ========
// Reducer
// ========

const initialState = {
  searching: false,
  matches: [],
  searchComplete: false,
};

function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export { initialState, reducer };