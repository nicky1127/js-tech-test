export class Socket {
  constructor(url = "") {
    const socket = new WebSocket(url);

    this.socket = socket;
  }

  getAllLiveEvents = priMarket => {
    return new Promise(resolve => {
      this.socket.addEventListener("open", () => {
        this.socket.send(
          JSON.stringify({ type: "getLiveEvents", primaryMarkets: priMarket })
        );
        this.socket.addEventListener("message", e => {
          const response = JSON.parse(e.data);
          console.log("e: ", JSON.parse(e.data));
          if (response.type === "LIVE_EVENTS_DATA")
            resolve(JSON.parse(e.data).data);
        });
      });
    });
  };

  getEventById = id => {
    return new Promise(resolve => {
      this.socket.addEventListener("open", () => {
        this.socket.send(
          JSON.stringify( { type: "getEvent", id } )
        );
        this.socket.addEventListener("message", e => {
          const response = JSON.parse(e.data);
          console.log("e: ", JSON.parse(e.data));
          if (response.type === "EVENT_DATA")
            resolve(JSON.parse(e.data).data);
        });
      });
    });
  };
}

const socket = new Socket("ws://localhost:8889");

export default socket;
