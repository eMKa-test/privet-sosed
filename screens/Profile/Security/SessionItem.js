import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import sessionItemStyles from "./styles";

const dot = (
  <View style={sessionItemStyles.dot} />
);

function SessionItem(props) {
  const {data} = props;
  return (
    <View style={sessionItemStyles.root}>
      <View style={sessionItemStyles.row}>
        {/* eslint-disable-next-line camelcase */}
        {data?.created_time ? (
          <Paragraph style={sessionItemStyles.firstRowBold}>{data.created_time}</Paragraph>
                ) : null}
        {data?.ip ? (
          <React.Fragment>
            {dot}
            <Paragraph style={sessionItemStyles.firstRowBold}>{`IP: ${data.ip}`}</Paragraph>
          </React.Fragment>
                ) : null}
        {data?.location ? (
          <React.Fragment>
            {dot}
            <Paragraph style={sessionItemStyles.firstRowRegion}>
              {`${data.location}, ${data?.country}`}
            </Paragraph>
          </React.Fragment>
                ) : null}
      </View>
      <View style={sessionItemStyles.row}>
        {data?.os ? (
          <Paragraph style={sessionItemStyles.secondRowText}>{data.os}</Paragraph>
                ) : null}
        {data?.browser ? (
          <React.Fragment>
            {dot}
            <Paragraph style={sessionItemStyles.secondRowText}>{data.browser}</Paragraph>
          </React.Fragment>
                ) : null}
        {/* eslint-disable-next-line camelcase */}
        {data?.is_current ? (
          <React.Fragment>
            {dot}
            <Paragraph style={sessionItemStyles.isCurrent}>Текущая</Paragraph>
          </React.Fragment>
                ) : null}
      </View>
    </View>
  );
}

SessionItem.propTypes = {
  data: PropTypes.shape({
    browser: PropTypes.string,
    country: PropTypes.string,
    created_time: PropTypes.string,
    expire_time: PropTypes.string,
    ip: PropTypes.string,
    is_current: PropTypes.bool,
    last_time: PropTypes.string,
    location: PropTypes.string,
    token: PropTypes.string,
    ua: PropTypes.string,
    os: PropTypes.string,
  }),
};

export default React.memo(SessionItem);
