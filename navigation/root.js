import React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  return navigationRef.current?.navigate(name, params);
}

export function goBack(params) {
  if (navigationRef.current && navigationRef.current.canGoBack()) {
    return navigationRef.current.goBack(params);
  }
}
