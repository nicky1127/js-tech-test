import * as actions from "redux/_actions";

export class Socket {
  constructor(url = "", store = {}) {
    const socket = new WebSocket(url);
    this.socket = socket;
    this.dispatch = store.dispatch;
    this.marketNum = 0;
    this.socket.addEventListener("message", e => {
      const response = JSON.parse(e.data);
      this.responseHandler(response);
    });
    this.socket.addEventListener("close", e => {
      console.log("Connection close");
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

  getAllOutcomes = outcomeIds => {
    this.socket.addEventListener("open", () => {
      outcomeIds.forEach(id => this.getOutcomeById(id));
    });
  };

  getOutcomeById = id => {
    // this.socket.addEventListener("open", () => {
    this.socket.send(JSON.stringify({ type: "getOutcome", id }));
    // });
  };

  responseHandler = res => {
    if (!res.type) return new Error("Type is not found in the response");
    console.log("res.type: ", res);
    if (res.type === "LIVE_EVENTS_DATA") {
      this.dispatch(actions.setLiveEventList(res.data));
    } else if (res.type === "EVENT_DATA") {
      this.dispatch(actions.setEventById(res.data));
      this.marketNum = 0;
      if (res.data.markets)
        res.data.markets.forEach(marketId => this.getMarketById(marketId));
    } else if (res.type === "MARKET_DATA") {
      // filter undisplayable and zero outcome market 
      if (res.data.status.displayable) {
        if (Array.isArray(res.data.outcomes) && res.data.outcomes.length > 0) {
          this.dispatch(actions.setMarketById(res.data));
          this.marketNum++;
        }
      }
      if (this.marketNum > 10) {
        this.socket.close();
        setTimeout(this.dispatch(actions.setLoading(false)), 1500);
      }
    } else if (res.type === "OUTCOME_DATA") {
      // filter displayable outcome
      if (res.data.status.displayable) {
        this.dispatch(actions.setOutcomeById(res.data));
      }
    } else if (res.type === "ERROR") {
      this.dispatch(actions.setError(res.data));
    }
  };
}

// const socket = new Socket("ws://localhost:8889", store);

// export default socket;
