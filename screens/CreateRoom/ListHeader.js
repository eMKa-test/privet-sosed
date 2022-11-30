import React from "react";
import * as PropTypes from "prop-types";
import NoUsers from "./NoUsers";
import NoFilterResult from "../../components/MsgCard/NoFilterResult";

function ListHeader({loading, len}) {
  // if (filterFocus && len === 0) {
  //     return <NoFilterResult filterType="neighbours" />;
  // }
  if (len === 0 && !loading) {
    return (
      <NoUsers />
    );
  }
  return null;
}

ListHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  len: PropTypes.number.isRequired,
};

export default React.memo(ListHeader);
