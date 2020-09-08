import * as actions from "redux/_actions";
import * as types from "redux/_types";

describe("actions ", () => {
  const payload = "test";
  it("should create an action to get live event list", () => {
    const expectedAction = {
      type: types.GET_LIVE_EVENT_LIST,
      priMarket: true
    };
    expect(actions.getLiveEventList(true)).toEqual(expectedAction);
  });
  it("should create an action to set live event list", () => {
    const expectedAction = {
      type: types.SET_LIVE_EVENT_LIST,
      payload
    };
    expect(actions.setLiveEventList(payload)).toEqual(expectedAction);
  });
  it("should create an action to get a event by its id", () => {
    const expectedAction = {
      type: types.GET_EVENT_BY_ID,
      id: payload
    };
    expect(actions.getEventById(payload)).toEqual(expectedAction);
  });
  it("should create an action to set a event by its id", () => {
    const expectedAction = {
      type: types.SET_EVENT_BY_ID,
      payload
    };
    expect(actions.setEventById(payload)).toEqual(expectedAction);
  });

  it("should create an action to set a market by its id", () => {
    const expectedAction = {
      type: types.SET_MARKET_BY_ID,
      payload
    };
    expect(actions.setMarketById(payload)).toEqual(expectedAction);
  });

  it("should create an action to get a list of outcome by their ids", () => {
    const expectedAction = {
      type: types.GET_OUTCOME_LIST,
      outcomeIds: payload
    };
    expect(actions.getOutcomeListByIds(payload)).toEqual(expectedAction);
  });

  it("should create an action to set a outcome by its id", () => {
    const expectedAction = {
      type: types.SET_OUTCOME_BY_ID,
      payload
    };
    expect(actions.setOutcomeById(payload)).toEqual(expectedAction);
  });

  it("should create an action to set loading state", () => {
    const expectedAction = {
      type: types.SET_LOADING,
      payload
    };
    expect(actions.setLoading(payload)).toEqual(expectedAction);
  });
  it("should create an action to set error state", () => {
    const expectedAction = {
      type: types.SET_ERROR,
      payload
    };
    expect(actions.setError(payload)).toEqual(expectedAction);
  });
  it("should create an action to set odds ofrmat state", () => {
    const expectedAction = {
      type: types.SET_ODDS_FORMAT,
      payload
    };
    expect(actions.setOddsFormat(payload)).toEqual(expectedAction);
  });
  it("should create an action to add a selection", () => {
    const expectedAction = {
      type: types.ADD_SELECTION,
      payload
    };
    expect(actions.addSelection(payload)).toEqual(expectedAction);
  });

  it("should create an action to remove a selection", () => {
    const expectedAction = {
      type: types.REMOVE_SELECTION,
      payload
    };
    expect(actions.removeSelection(payload)).toEqual(expectedAction);
  });
});



  