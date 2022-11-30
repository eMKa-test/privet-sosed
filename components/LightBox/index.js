import React, {useMemo} from "react";
import * as PropTypes from "prop-types";
import memoize from "lodash/memoize";
import ViewPager from "@react-native-community/viewpager";
import {View, Modal} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import {idProp, keyExtractor, imageSource} from "../../lib/utils";
import {lightBoxStyles} from "./styles";
import Header from "./Header";
import Video from "./Video";

export const TYPES = Object.freeze({
  IMAGE: "image",
  VIDEO: "video",
});

const makeImageUrlsList = memoize((list) => {
  return list.map((item) => {
    const {thumbs} = item;
    const thumbSize = thumbs["1920"] || thumbs["740"] || thumbs["370"];
    return imageSource(thumbSize, "url");
  });
});

function LightBox(props) {
  const {
    visible, dismiss, list, initial = 0, type,
  } = props;
  const [page, setPage] = React.useState(initial);

  const onPageSelected = React.useCallback(({nativeEvent}) => {
    setPage(nativeEvent.position + 1);
  }, []);

  const renderPager = useMemo(() => {
    switch (type) {
      case TYPES.IMAGE:
        return (
          <View style={lightBoxStyles.root}>
            <ImageViewer
              renderIndicator={() => null}
              renderHeader={(idx) => (
                <Header
                  page={idx + 1}
                  length={list?.length}
                  dismiss={dismiss} />
              )}
              index={initial}
              imageUrls={makeImageUrlsList(list)} />
          </View>
        );
      case TYPES.VIDEO:
        return (
          <View style={lightBoxStyles.root}>
            <Header
              page={page}
              length={list?.length}
              dismiss={dismiss} />
            <ViewPager
              scrollEnabled
              onPageSelected={onPageSelected}
              style={lightBoxStyles.viewPager}
              initialPage={initial}>
              {list?.map((el, i) => {
                return (
                  <Video
                    key={keyExtractor(el, i)}
                    data={el} />
                );
              })}
            </ViewPager>
          </View>
        );
      default:
        return null;
    }
  }, [initial, list, page]);

  return (
    <Modal
      onRequestClose={dismiss}
      visible={visible}
      transparent>
      {renderPager}
    </Modal>
  );
}

LightBox.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  initial: idProp,
  type: PropTypes.oneOf(Object.values(TYPES)),
};

export default React.memo(LightBox);
