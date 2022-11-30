import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "./styles";
import {idProp} from "../../lib/utils";
import NoListItems from "./NoListItems";
import AttachedFiles from "../../components/AttachedFiles";
import ImageThumb from "./ImageThumb";
import LinkThumb from "./LinkThumb";
import VideoThumb from "./VideoThumb";
import Loader from "../../components/loader";
import LightBox from "../../components/LightBox";
import {SCREEN_WIDTH as width} from "../../constants/Layout";

const height = (width - 20) / 3.3;

function ItemsGrid(props) {
  const [open, setOpen] = React.useState(null);

  if (Array.isArray(props.list) && props.list.length === 0) {
    return <NoListItems />;
  }

  const {
    list, listType, p, load,
  } = props;

  const dismiss = React.useCallback(() => {
    setOpen(null);
  }, []);

  const renderList = React.useMemo(() => {
    switch (listType) {
      case "images":
        return (
          <View style={styles.gridImageContainer}>
            {list.map((item, i) => {
              return (
                <ImageThumb
                  duration={item?.duration}
                  thumbs={item?.thumbs}
                  height={height}
                  key={String(i)}
                  onPress={() => setOpen({idx: i, type: "image"})} />
              );
            })}
          </View>
        );
      case "videos":
        return (
          <View style={styles.gridVideoContainer}>
            {list.map((item, i) => {
              return (
                <VideoThumb
                  duration={item?.duration}
                  thumbs={item?.thumbs}
                  height={height}
                  key={String(i)}
                  onPress={() => setOpen({idx: i, type: "video"})} />
              );
            })}
          </View>
        );
      case "files":
        return <AttachedFiles files={list} />;
      case "links":
        return (
          <View>
            {list.map((item, i) => {
              return (
                <LinkThumb
                  item={item}
                  height={height}
                  key={String(i)} />
              );
            })}
          </View>
        );
      default:
        return null;
    }
  }, [listType, p]);

  return (
    <View style={styles.gridContainer}>
      {renderList}
      {open ? (
        <LightBox
          visible={Boolean(open)}
          dismiss={dismiss}
          initial={open?.idx}
          type={open?.type}
          list={list} />
      ) : null}
      {load ? (
        <Loader
          active
          containerStyle={styles.loader} />
      ) : null}
    </View>
  );
}

ItemsGrid.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
  p: PropTypes.number.isRequired,
  load: PropTypes.bool.isRequired,
  listType: PropTypes.string.isRequired,
};

export default React.memo(ItemsGrid);
