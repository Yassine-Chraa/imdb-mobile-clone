import React from "react";
import PropTypes from "prop-types";
import Webview from "react-native-webview";
import Screen from "../components/Screen";

const WebView = ({ route }) => {
  const { key } = route.params;
  const url = `https://www.youtube.com/watch?v=${key}`;
  return (
    <Screen>
      <Webview source={{ uri: url }} />
    </Screen>
  );
};

export default WebView;

WebView.propTypes = {
  route: PropTypes.any,
};
