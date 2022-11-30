import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import * as PropTypes from "prop-types";
import {TabNavigationProvider} from "./tabNavigationProvider";
import {WebSocketProvider} from "./WebSocket";

const ContextProviders = ({children}) => (
  <SafeAreaProvider>
    <WebSocketProvider>
      <TabNavigationProvider>
        {children}
      </TabNavigationProvider>
    </WebSocketProvider>
  </SafeAreaProvider>
);

ContextProviders.propTypes = {
  children: PropTypes.node,
};

export default ContextProviders;
