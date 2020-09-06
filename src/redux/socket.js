import * as actions from "redux/_actions";

export class Socket {
  constructor(url = "", store = {}) {
    const socket = new WebSocket(url);
    this.socket = socket;
    this.dispatch = store.dispatch;
    this.socket.addEventListener("message", e => {
      const response = JSON.parse(e.data);
      // console.log("e: ", JSON.parse(e.data));
      this.responseHandler(response);
    });
  }

  getAllLiveEvents = priMarket => {
    this.socket.addEventListener("open", () => {
      this.socket.send(
        JSON.stringify({ type: "getLiveEvents", primaryMarkets: priMarket })
      );
    });
  };

  getEventById = id => {
    this.socket.addEventListener("open", () => {
      this.socket.send(JSON.stringify({ type: "getEvent", id }));
    });
  };

  getMarketById = id => {
    // this.socket.addEventListener("open", () => {
    this.socket.send(JSON.stringify({ type: "getMarket", id }));
    // });
  };

  getOutcomeById = id => {
    // this.socket.addEventListener("open", () => {
    this.socket.send(JSON.stringify({ type: "getOutcome", id }));
    // });
  };

  responseHandler = res => {
    if (!res.type) return new Error("Type is not found in the response");
    if (res.type === "LIVE_EVENTS_DATA") {
      this.dispatch(actions.setLiveEventList(res.data));
    } else if (res.type === "EVENT_DATA") {
      this.dispatch(actions.setEventById(res.data));
      if (res.data.markets)
        res.data.markets.forEach(marketId => this.getMarketById(marketId));
    } else if (res.type === "MARKET_DATA") {
      this.dispatch(actions.setMarketById(res.data));
      // if (res.data.outcomes)
      //   res.data.outcomes.forEach(outcomeId => this.getOutcomeById(outcomeId));
    } else if (res.type === "OUTCOME_DATA") {
      this.dispatch(actions.setOutcomeById(res.data));
    }
  };
}

// const socket = new Socket("ws://localhost:8889", store);

// export default socket;
