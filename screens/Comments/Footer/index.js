import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import DotSeparator from "../DotSeparator";
import styles from "./styles";
import Likes from "./Likes";
import {idProp} from "../../../lib/utils";
import {TEXT_GREY_COLOR} from "../../../constants/Colors";
import {EDITED_LABEL} from "../../../constants/Vars";

function Footer(props) {
  const {
    comment, createdTime = "", editedTime, liked, likesCount, onResponse, isDeleted,
  } = props;

  const handleResponsePress = React.useCallback(() => {
    onResponse(comment);
  }, [onResponse, comment]);

  return (
    <View style={styles.root}>
      <View style={styles.leftSide}>
        {!isDeleted ? (
          <React.Fragment>
            <TouchableOpacity onPress={handleResponsePress}>
              <Paragraph
                style={styles.footerText}
                noMargin
                color={TEXT_GREY_COLOR}
                size={13}>
                Ответить
              </Paragraph>
            </TouchableOpacity>
            <DotSeparator containerStyles={styles.dotSeparator} />
          </React.Fragment>
        ) : null}
        <Paragraph
          style={styles.footerText}
          noMargin
          color={TEXT_GREY_COLOR}
          size={13}>
          {`${createdTime} ${editedTime ? EDITED_LABEL : ""}`}
        </Paragraph>
      </View>
      {!isDeleted ? (
        <Likes
          commentId={comment?.id}
          likesCount={likesCount}
          liked={liked} />
      ) : null}
    </View>
  );
}

Footer.propTypes = {
  comment: PropTypes.shape({
    id: idProp,
  }),
  createdTime: PropTypes.string.isRequired,
  editedTime: PropTypes.string,
  liked: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
  onResponse: PropTypes.func,
  isDeleted: PropTypes.bool,
};

export default React.memo(Footer);
