import isEmpty from "lodash/isEmpty";
import React from "react";
import * as PropTypes from "prop-types";
import Header from "../../../components/FeedItemCard/Header";

import Footer from "./Footer";
import FeedParsedContent from "../../../components/FeedItemCard/FeedParsedContent";
import Gallery from "../../../components/FeedItemCard/Gallery";
import FeedAttachedFiles from "../../../components/FeedItemCard/FeedAttachedFiles";
import Tags from "../../../components/FeedItemCard/Tags";
import {idProp} from "../../../lib/utils";

function SinglePostCard(props) {
  const {data = {}, children} = props;

  if (isEmpty(data)) {
    return null;
  }

  return (
    <React.Fragment>
      <Header data={data} />
      <FeedParsedContent data={data} />
      <Gallery media={data?.media} />
      <FeedAttachedFiles files={data?.files} />
      {children}
      <Tags tags={data?.tags} />
      <Footer data={data} />
    </React.Fragment>
  );
}

SinglePostCard.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
  children: PropTypes.node,
};

// стоит заглушка от ререндера, так как это обертка и будут меняться компоненты внутри
export default React.memo(SinglePostCard, () => true);
