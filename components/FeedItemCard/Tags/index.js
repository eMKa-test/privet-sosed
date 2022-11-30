import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./styles";
import {navigate} from "../../../navigation/root";
import {SEARCH} from "../../../constants/Vars";
import {setSearchTagId} from "../../../store/actions/commonActions";
import {store} from "../../../store";

function Tags(props) {
  const {tags = []} = props;

  const openSearchScreen = (tag) => {
    if (tag?.id) {
      const editedTag = {id: tag.id, label: tag?.title};
      store.dispatch(setSearchTagId(editedTag));
      navigate(SEARCH);
    }
  };

  return (
    <React.Fragment>
      {(tags?.length > 0) ? (
        <View style={styles.root}>
          {tags.map((item, idx) => {
            return (
              <React.Fragment key={item?.id}>
                <TouchableOpacity onPress={() => { openSearchScreen(item); }}>
                  <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
                {(tags.length > 1) && (tags.length !== idx + 1) ? (
                  <Text style={styles.text}>, </Text>
                ) : null}
              </React.Fragment>
            );
          })}
        </View>
      ) : null}
    </React.Fragment>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ),
};

export default React.memo(Tags);
