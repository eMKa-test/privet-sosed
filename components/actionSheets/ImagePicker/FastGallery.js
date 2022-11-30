import React from "react";
import * as PropTypes from "prop-types";
import {Image, View} from "react-native";
import * as MediaLibrary from "expo-media-library";
import {SortBy} from "expo-media-library";
import {imagePickerStyles as styles} from "../styles";
import Card from "./Card";
import {imageSource} from "../../../lib/utils";

async function getAssets(setAssets) {
  const {status} = await MediaLibrary.requestPermissionsAsync();
  if (!status === "granted") {
    return;
  }
  const {assets} = await MediaLibrary.getAssetsAsync({
    first: 5,
    sortBy: [SortBy.modificationTime],
  });
  if (Array.isArray(assets)) {
    setAssets(assets);
  }
}

function FastGallery(props) {
  const {
    visible, onSelect, selected, timing = 150,
  } = props;
  const [assets, setAssets] = React.useState([]);

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => {
        getAssets(setAssets);
      }, timing);
    }
  }, [visible]);

  return Array.isArray(assets) ? assets.map((item) => {
    const active = Array.isArray(selected) && selected.findIndex((el) => el.id === item.id);
    return (
      <Card
        big={selected?.length > 0}
        key={item.id}
        onPress={() => onSelect(item)}>
        <React.Fragment>
          {active !== -1 && (
          <View style={styles.checkBox}>
            <View style={styles.check} />
          </View>
          )}
          <Image
            style={styles.preview}
            source={imageSource(item.uri)} />
        </React.Fragment>
      </Card>
    );
  }) : null;
}

FastGallery.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
  })),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  timing: PropTypes.number,
};

export default React.memo(FastGallery);
