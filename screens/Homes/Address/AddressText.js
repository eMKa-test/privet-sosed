import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import Paragraph from "../../../components/text/Paragraph";
import {DIMMED_COLOR, TEXT_COLOR} from "../../../constants/Colors";
import styles from "./styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

function AddressText({data}) {
  const {house, text} = data;
  if (typeof text === "string" && text !== "") {
    return (
      <Paragraph
        size={16}
        color={TEXT_COLOR}
        noMargin
        style={styles.addressFullname}>
        {text}
      </Paragraph>
    );
  }
  return (
    <React.Fragment>
      <Paragraph
        size={16}
        color={TEXT_COLOR}
        noMargin
        style={styles.addressFullname}>
        {get(house, "name", UNKNOWN_ERROR)}
      </Paragraph>
      <Paragraph
        noMargin
        size={13.5}
        color={DIMMED_COLOR}
        style={styles.addressRegion}>
        {get(house, "topname", UNKNOWN_ERROR)}
      </Paragraph>
    </React.Fragment>
  );
}

AddressText.propTypes = {
  data: PropTypes.shape({
    house: PropTypes.object,
    text: PropTypes.string,
  }),
};

export default React.memo(AddressText);
