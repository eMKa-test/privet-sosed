import React from "react";
import * as PropTypes from "prop-types";
import {idProp} from "../../lib/utils";
import Poll from "../FeedItemCard/Poll";

function RenderPostByType(props) {
  const {type, data} = props;
  if (!data) {
    return null;
  }
  switch (type) {
    case 4:
      return (
        <Poll
          poll={data?.poll}
          postId={data?.id} />
      );
    default:
      return null;
  }
}

RenderPostByType.propTypes = {
  type: PropTypes.number,
  data: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(RenderPostByType);
