import React from "react";
import * as PropTypes from "prop-types";
import {useWindowDimensions, View} from "react-native";
import get from "lodash/get";
import moment from "moment";
import styles from "./styles";
import Paragraph from "../../text/Paragraph";
import RenderImages from "../../RenderImages";
import {idProp} from "../../../lib/utils";
import RenderLink from "../../RenderLink";
import RenderMsg from "../../RenderMsgFromType";

function FavMsg({data, myMsg}) {
  // eslint-disable-next-line camelcase
  const createdDate = moment(data?.created_day).format("DD.MM.YYYY");
  // eslint-disable-next-line camelcase
  const createdTime = moment(data?.created_time_ts).format("HH:mm");
  const title = get(data, "user.title", "");
  const msg = get(data, "html", "");
  const link = get(data, "attached_link", "");
  const {width} = useWindowDimensions();

  return (
    <View style={[{width: width / 1.5}, myMsg ? styles.myFavMsg : styles.usersFavMsg]}>
      <View style={styles.favMsgHeader}>
        <Paragraph
          noMargin
          size={15}
          medium
          style={styles.favUserName}>
          {title}
        </Paragraph>
        <Paragraph
          noMargin
          size={15}
          style={styles.favCreatedDay}>
          {createdDate}
        </Paragraph>
        <Paragraph
          noMargin
          size={15}
          style={styles.favCreatedTime}>
          {createdTime}
        </Paragraph>
      </View>
      {link ? <RenderLink linkInfo={link} /> : null}
      <RenderMsg msg={msg} />
      <RenderImages images={data?.images} />
    </View>
  );
}

FavMsg.propTypes = {
  data: PropTypes.shape({
    id: idProp,
    created_day: idProp,
    created_time_ts: idProp,
  }),
  myMsg: PropTypes.bool.isRequired,
};

export default React.memo(FavMsg);
