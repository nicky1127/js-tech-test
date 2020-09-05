import * as types from "./_types";

export const getLiveEventList = (priMarket = true) => {
  const obj = { type: types.GET_LIVE_EVENT_LIST, priMarket };
  return obj;
};

export const getEventById = id => {
  const obj = { type: types.GET_EVENT_BY_ID, id };
  return obj;
};
