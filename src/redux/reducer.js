import * as types from "./_types";

const initialState = {
  liveEvents: [],
  event: {},
  markets: {},
  isOddsDecimal: true,
  loading: false
};

const reducer = (state = initialState, action) => {
  if (action.type === types.SET_LIVE_EVENT_LIST) {
    return { ...state, liveEvents: action.payload };
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
  return state;
};

export default reducer;
