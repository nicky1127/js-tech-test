import * as types from "./_types";

export const getLiveEventList = (priMarket = true) => {
  const obj = { type: types.GET_LIVE_EVENT_LIST, priMarket };
  return obj;
};

export const setLiveEventList = payload => {
  const obj = { type: types.SET_LIVE_EVENT_LIST, payload };
  return obj;
};

export const getEventById = id => {
  const obj = { type: types.GET_EVENT_BY_ID, id };
  return obj;
};

export const setEventById = payload => {
  const obj = { type: types.SET_EVENT_BY_ID, payload };
  return obj;
};

// export const getMarketById = id => {
//   const obj = { type: types.GET_MARKET_BY_ID, id };
//   return obj;
// };

export const setMarketById = payload => {
  const obj = { type: types.SET_MARKET_BY_ID, payload };
  return obj;
};

export const getOutcomeListByIds = outcomeIds => {
  const obj = { type: types.GET_OUTCOME_LIST, outcomeIds };
  return obj;
};

// export const getOutcomeById = id => {
//   const obj = { type: types.GET_OUTCOME_BY_ID, id };
//   return obj;
// };

export const setOutcomeById = payload => {
  const obj = { type: types.SET_OUTCOME_BY_ID, payload };
  return obj;
};

export const setLoading = payload => {
  const obj = { type: types.SET_LOADING, payload };
  return obj;
};

export const setError = payload => {
  const obj = { type: types.SET_ERROR, payload };
  return obj;
};

export const setOddsForamt = payload => {
  const obj = { type: types.SET_ODDS_FORMAT, payload };
  return obj;
};
