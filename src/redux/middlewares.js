import * as types from "./_types";
import socket from "./socket";

export const socketDataSetter = store => next => async action => {
  if (action.type === types.GET_LIVE_EVENT_LIST) {
    action.payload = await socket.getAllLiveEvents(action.priMarket);
  }
  if (action.type === types.GET_EVENT_BY_ID) {
    action.payload = await socket.getEventById(21249944);
  }
  return next(action);
};
