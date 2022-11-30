import isEmpty from "lodash/isEmpty";
import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {View} from "react-native";
import styles from "./styles";
import Header from "./Header";
import {idProp} from "../../lib/utils";
import Footer from "./Footer";
import Anchor from "../dropdown/Anchor";
import Gallery from "./Gallery";
import FeedParsedContent from "./FeedParsedContent";
import FeedAttachedFiles from "./FeedAttachedFiles";
import Tags from "./Tags";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import RenderLink from "../RenderLink";
import Paragraph from "../text/Paragraph";

function FeedItemCard(props) {
  const {
    openDropdown, data = {}, showStreet = true, children,
  } = props;
  const linkInfo = get(data, "attached_link", UNKNOWN_ERROR);
  const price = data?.price && String(data.price) && data.price;

  const onAnchorPress = React.useCallback(() => {
    openDropdown(data);
  }, [data]);

  if (isEmpty(data)) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={styles.dropdownToggler}>
        <Anchor onPress={onAnchorPress} />
      </View>
      <Header
        data={data}
        showStreet={showStreet} />
      <FeedParsedContent data={data} />
      <View style={styles.linkContainer}>
        <RenderLink
          delta={0}
          linkInfo={linkInfo} />
      </View>
      <Gallery media={data?.media} />
      <FeedAttachedFiles files={data?.files} />
      {children}
      {price ? (
        <Paragraph
          style={styles.price}
          size={18}
          noMargin
          medium>
          {`${price} \u20BD`}
        </Paragraph>
      ) : null}
      <Tags tags={data?.tags} />
      <Footer data={data} />
    </View>
  );
}

FeedItemCard.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
  showStreet: PropTypes.bool,
  children: PropTypes.node,
  openDropdown: PropTypes.func,
};

// стоит заглушка от ререндера, так как это обертка и будут меняться компоненты внутри
export default React.memo(FeedItemCard, () => true);
