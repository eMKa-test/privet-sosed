import React, {memo} from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import styles from "../styles";

function Settings({onSelect, options}) {
  if (!Array.isArray(options)) {
    return null;
  }

  return (
    <View>
      {options.map((opt) => (
        <React.Fragment key={opt.name}>
          <View style={styles.blockTitle}>
            <Paragraph
              noMargin
              size={16}>
              {opt.name}
            </Paragraph>
          </View>
          {opt.items.map((item) => {
            return (
              <View
                style={[styles.blockContent, styles.rowContent]}
                key={item.title}>
                <Paragraph
                  style={styles.labelOption}
                  size={14}
                  noMargin>
                  {item.title}
                </Paragraph>
                <TouchableOpacity
                  onPress={() => onSelect(item.values, item.name, item?.value?.value)}
                  style={styles.dropdownOptionAction}>
                  <Paragraph
                    color="#8B8B8B"
                    size={14}
                    noMargin>
                    {item?.value?.title || "Не выбрано"}
                  </Paragraph>
                </TouchableOpacity>
              </View>
            );
          })}
        </React.Fragment>
      ))}
    </View>
  );
}

Settings.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default memo(Settings);
