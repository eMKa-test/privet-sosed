import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import CommonList from "./CommonList";

function NeighborsList(props) {
  const {
    neighbors, loading, refreshLoading, refreshActiveList, onAction, onMomentumScrollEnd,
  } = props;

  return (
    <CommonList
      data={neighbors}
      loading={loading}
      refreshLoading={refreshLoading}
      refreshActiveList={refreshActiveList}
      onAction={onAction}
      onMomentumScrollEnd={onMomentumScrollEnd} />
  );
}

NeighborsList.propTypes = {
  neighbors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  loading: PropTypes.bool,
  refreshLoading: PropTypes.bool,
  refreshActiveList: PropTypes.func,
  onAction: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
};

const mapStateToProps = (store) => ({
  neighbors: store?.neighbors?.neighborsList,
  refreshLoading: store?.neighbors?.refreshLoading,
});

export default connect(mapStateToProps)(NeighborsList);
