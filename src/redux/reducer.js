import * as types from "./_types";

const initialState = {
  liveEvents: [],
  markets: [],
  isOddsDecimal: true,
  loading: false
};

const reducer = (state = initialState, action) => {
  if (action.type === types.GET_LIVE_EVENT_LIST) {
    return { ...state, liveEvents: action.payload };
  }
  return state;
};

export default reducer;
