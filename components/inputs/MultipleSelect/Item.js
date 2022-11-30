import React from "react";
import * as PropTypes from "prop-types";
import memoize from "lodash/memoize";
import {
  Platform, TouchableNativeFeedback, TouchableOpacity, View,
} from "react-native";
import styles from "../styles";
import Paragraph from "../../text/Paragraph";

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const getTitle = memoize((title) => title || "");
const includes = (str, title) => !str || title.toLowerCase().includes(str.toLowerCase());

function Item(props) {
  const {
    data, onSelect, selectedIds, search,
  } = props;
  if (Array.isArray(data?.items)) {
    const items = data.items.filter((child) => includes(search, child?.title));
    if (items.length > 0) {
      return (
        <View style={styles.listItem}>
          <Paragraph
            bold
            size={16}>
            {getTitle(data?.title)}
          </Paragraph>
          {items.map((child, idx) => (
            <Item
              key={child.id || String(idx)}
              onSelect={onSelect}
              selectedIds={selectedIds}
              data={child} />
          ))}
        </View>
      );
    }
  }
  const isSelected = selectedIds.includes(data?.id);
  // #ccc
  return !search || includes(search, data?.title) ? (
    <Touchable
      disabled={isSelected}
      onPress={() => onSelect(data)}>
      <View style={styles.listItem}>
        <Paragraph
          color={isSelected ? "#ccc" : undefined}
          size={16}>
          {getTitle(data?.title)}
        </Paragraph>
      </View>
    </Touchable>
  ) : null;
}

const itemShape = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
};

Item.propTypes = {
  data: PropTypes.shape({
    ...itemShape,
    items: PropTypes.arrayOf(PropTypes.shape({
      ...itemShape,
    })),
  }),
  onSelect: PropTypes.func,
  selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  search: PropTypes.string,
};

export default React.memo(Item);
