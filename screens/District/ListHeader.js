import React, {memo} from "react";
import * as PropTypes from "prop-types";
import NoLocals from "../../components/noLocals";
import Paragraph from "../../components/text/Paragraph";

function ListHeader(props) {
  const {
    typeLocals, onAddDistrict,
  } = props;
  if (typeLocals === "allLocals") {
    return <NoLocals toLocals={onAddDistrict} />;
  }
  return <Paragraph center>Список районов пуст</Paragraph>;
}

ListHeader.propTypes = {
  typeLocals: PropTypes.string.isRequired,
  onAddDistrict: PropTypes.func.isRequired,
};

export default memo(ListHeader);
