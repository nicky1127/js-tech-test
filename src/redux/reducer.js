import * as types from "./_types";

const initialState = {
  liveEvents: [],
  event: {},
  markets: {},
  isOddsDecimal: false,
  loading: false,
  error: {},
  selections: []
};

const reducer = (state = initialState, action) => {
  if (action.type === types.SET_LOADING) {
    return { ...state, loading: action.payload };
  }

  if (action.type === types.SET_ODDS_FORMAT) {
    return { ...state, isOddsDecimal: action.payload };
  }

  if (action.type === types.SET_ERROR) {
    return { ...state, error: action.payload };
  }

  if (action.type === types.SET_LIVE_EVENT_LIST) {
    return { ...state, liveEvents: action.payload };
  }

  if (action.type === types.GET_EVENT_BY_ID) {
    return { ...state, markets: {}, loading: true };
  }

  if (action.type === types.SET_EVENT_BY_ID) {
    return { ...state, event: action.payload };
  }

  if (action.type === types.SET_MARKET_BY_ID) {
    const markets = { ...state.markets };
    markets[action.payload.marketId] = { ...action.payload, outcomeList: {} };
    return { ...state, markets };
  }

  if (action.type === types.SET_OUTCOME_BY_ID) {
    const market = { ...state.markets[action.payload.marketId] };
    const outcomeList = market.outcomeList;
    outcomeList[action.payload.outcomeId] = action.payload;

    const markets = { ...state.markets };
    markets[action.payload.marketId] = market;

    return { ...state, markets };
  }

  if (action.type === types.ADD_SELECTION) {
    const arr = state.selections.concat(action.payload);
    return { ...state, selections: arr };
  }

  if (action.type === types.REMOVE_SELECTION) {
    console.log("huu");
    const arr = state.selections.filter(
      selection => selection.outcomeId !== action.payload
    );
    return { ...state, selections: arr };
  }

  return state;
};

export default reducer;
