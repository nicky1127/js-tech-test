import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  //  // Create WebSocket connection.
  // const socket = new WebSocket('ws://localhost:8889');

  // // Connection opened
  // socket.addEventListener('open', function (event) {
  //     socket.send('Hello Server!');
  // });

  // // Listen for messages
  // socket.addEventListener('message', function (event) {
  //     console.log('Message from server ', event.data);
  // });

  // // socket.send(JSON.stringify({type: "subscribe", keys: ["e.21249934"]}));

  // socket.open()

  // socket.send(JSON.stringify({ type: "getEvent", id: 21249934 }));

  let ws = new WebSocket("ws://localhost:8889");
  Promise.resolve(new WebSocket("ws://localhost:8889"))
      .then(ws=>ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true })))

  //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
  // ws.onopen = () => {
  //   console.log("open connection");
  //   ws.send(JSON.stringify({ type: "subscribe", keys: ["e.21249934"] }));
  //   ws.send(JSON.stringify({ type: "subscribe", keys: ["m.93650821"] }));
  //   ws.send(JSON.stringify({type: "subscribe", keys: ["m.*"]}));
  //   ws.send(JSON.stringify({type: "subscribe", keys: ["o.*"]}));
  //   ws.send(JSON.stringify({ type: "getEvent", id: 21249934 }));
  //   ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));
  // };

  //關閉後執行的動作，指定一個 function 會在連結中斷後執行
  ws.onclose = () => {
    console.log("close connection");
  };

  // ws.send(JSON.stringify({ type: "getLiveEvents" }));
  ws.onmessage = event => {
    console.log(JSON.parse(event.data));
  };
  // ws.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: true }));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
