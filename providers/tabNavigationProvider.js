import React from "react";
import * as PropTypes from "prop-types";

export const TabNavigationContext = React.createContext({
  params: null,
});

export const TabNavigationProvider = (props) => {
  const [params, setParams] = React.useState(null);

  return (
    <TabNavigationContext.Provider
      value={{
        params,
        setParams,
      }}>
      {props.children}
    </TabNavigationContext.Provider>
  );
};

TabNavigationProvider.propTypes = {
  children: PropTypes.node,
};
