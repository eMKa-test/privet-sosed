import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import {idProp} from "../../../lib/utils";
import styles from "./styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";
import Likes from "../../../components/FeedItemCard/Footer/Likes";
import ViewsIcon from "../../../components/icons/views";
import Paragraph from "../../../components/text/Paragraph";


const likesKeys = ["id", "likes_cnt", "is_liked"];

function Footer(props) {
  if (isEmpty(props?.data)) {
    return null;
  }

  const {data = {}} = props;

  const {views = UNKNOWN_ERROR} = data;

  return (
    <View style={styles.footer}>
      <View style={styles.footerElement}>
        <Likes initialState={pick(data, likesKeys)} />
      </View>
      <View style={styles.footerElement}>
        <ViewsIcon />
        <Paragraph style={styles.viewsCount}>
          {views}
        </Paragraph>
      </View>
    </View>
  );
}

Footer.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(Footer, () => true);
