import * as types from "./_types";
import { Socket } from "./socket";

export const socketDataSetter = store => next => action => {
  const socket = new Socket("ws://localhost:8889", store);
  if (action.type === types.GET_LIVE_EVENT_LIST) {
    socket.getAllLiveEvents(action.priMarket);
  }
  if (action.type === types.GET_EVENT_BY_ID) {
    socket.getEventById(action.id);
  }

  if (action.type === types.GET_OUTCOME_LIST) {
    socket.getAllOutcomes(action.outcomeIds);
  }
  return next(action);
};
