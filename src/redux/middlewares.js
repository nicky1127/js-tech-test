import * as types from "./_types";
import socket from "./socket";

export const liveEventsSetter = store => next => async action => {
  if (action.type === types.GET_LIVE_EVENT_LIST) {
    action.payload = await socket.getAllLiveEvents(action.priMarket);
  }
  return next(action);
};
