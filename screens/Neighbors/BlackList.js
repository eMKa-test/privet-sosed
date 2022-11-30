import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import CommonList from "./CommonList";

function BlackList(props) {
  const {
    blacklist, loading, refreshLoading, refreshActiveList, onAction, onMomentumScrollEnd,
  } = props;

  return (
    <CommonList
      data={blacklist}
      loading={loading}
      refreshLoading={refreshLoading}
      refreshActiveList={refreshActiveList}
      onAction={onAction}
      onMomentumScrollEnd={onMomentumScrollEnd} />
  );
}

BlackList.propTypes = {
  blacklist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  loading: PropTypes.bool,
  refreshLoading: PropTypes.bool,
  refreshActiveList: PropTypes.func,
  onAction: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
};

const mapStateToProps = (store) => ({
  blacklist: store?.blacklist?.neighborBlacklist,
  refreshLoading: store?.blacklist?.refreshLoading,
});

export default connect(mapStateToProps)(BlackList);
