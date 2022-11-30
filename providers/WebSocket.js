import React, {Component, createContext} from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {DOMAIN} from "../constants/Config";
import {store} from "../store";

export const WebSocketContext = createContext();

const socketURL = (token) => `wss://${DOMAIN}/ws?token=${token}`;
const cb = () => {
};

export class WebSocketProvider extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.token = undefined;
    this.timer = 0;
    this.state = {
      connected: false,
    };
    this.subscribers = {};
  }

  componentDidMount() {
    store.subscribe(() => {
      const token = get(store.getState(), "common.authToken");
      if (this.token !== token) {
        if (token) {
          this.token = token;
          this.connect();
          return;
        }
        this.disconnect();
      }
    });
  }

  send = (method = "ping", payload = {}) => {
    if (this.socket && this.state.connected) {
      this.socket.send(JSON.stringify({method, payload}));
    }
  };

  onerror = () => (err) => {
    if (!__DEV__) {
      console.sendError(`websocket onerror ${JSON.stringify(err.message)}`);
    } else {
      console.warn(err);
    }
  };

  onmessage = () => (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data?.method) {
        const {method} = data;
        Object.values(this.subscribers).forEach((subscriber = {}) => {
          const {methods = [], onmessage} = subscriber;
          if (methods.includes(method) && typeof onmessage === "function") {
            onmessage(data);
          }
        });
      }
    } catch (e) {
      console.sendError(`socket onmessage:  ${e.message}`);
    }
  };

  onopen = () => () => {
    clearInterval(this.timer);
    this.setState({connected: true});
  };

  onclose = () => () => {
    this.socket = null;
    this.setState({connected: false}, () => {
      this.timer = setInterval(() => {
        this.connect();
      }, 10000);
    });
  };

  connect = () => {
    if (this.token) {
      this.socket = new WebSocket(socketURL(this.token));
      this.socket.onerror = this.onerror();
      this.socket.onmessage = this.onmessage();
      this.socket.onopen = this.onopen();
      this.socket.onclose = this.onclose();
    }
  };

  disconnect = () => {
    if (typeof this.socket?.close === "function") {
      this.socket.close();
    }
  };

  subscribe = (id, methods = [], onmessage = cb) => {
    if (!id) {
      return;
    }
    this.subscribers[id] = {methods, onmessage};
  };

  unsubscribe = (id) => {
    delete this.subscribers[id];
  };

  get value() {
    return {
      connected: this.state.connected,
      send: this.send,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  }

  render() {
    return (
      <WebSocketContext.Provider value={this.value}>
        {this.props.children}
      </WebSocketContext.Provider>
    );
  }
}

WebSocketProvider.propTypes = {
  children: PropTypes.element,
};
