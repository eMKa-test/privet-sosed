import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import get from "lodash/get";
import Poll from "./Poll";
import styles from "./styles";
import PostAdvert from "./Advert";
import PostEvent from "./Event";
import {idProp} from "../../lib/utils";

function TypeHelperSwitch(props) {
  const {postType, typeHelperRef, initialValue} = props;
  if (!postType || typeof postType !== "number") {
    return null;
  }
  if (postType === 1) {
    typeHelperRef.current = null;
    return null;
  }

  const content = React.useMemo(() => {
    switch (postType) {
      case 2: {
        const start = get(initialValue, "start_time_ts", "");
        const finish = get(initialValue, "finish_time_ts", "");
        const price = get(initialValue, "price", "");
        const initial = {start, finish, price};
        return (
          <PostEvent
            initial={initial}
            typeHelperRef={typeHelperRef} />
        );
      }
      case 3: {
        const price = get(initialValue, "price", "");
        return (
          <PostAdvert
            initialPrice={price}
            typeHelperRef={typeHelperRef} />
        );
      }
      case 4: {
        const poll = get(initialValue, "poll", false);
        return (
          <Poll
            initialPoll={poll}
            typeHelperRef={typeHelperRef} />
        );
      }
      default:
        return null;
    }
  }, [postType, typeHelperRef]);

  return (
    <View style={styles.postTypeHelperContent}>
      {content}
    </View>
  );
}

TypeHelperSwitch.propTypes = {
  postType: PropTypes.number,
  typeHelperRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  initialValue: PropTypes.shape({
    id: idProp,
  }),
};

export default TypeHelperSwitch;
