import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import Paragraph from "../../components/text/Paragraph";
import styles from "./styles";
import {keyExtractor} from "../../lib/utils";

const transformArray = (array) => {
  return array.join(", ");
};

function PersonalPage({about}) {
  return (
    <View style={styles.personalContainer}>
      <Paragraph
        style={styles.personInfoTitle}
        size={18}
        medium
        noMargin>
        Личная информация
      </Paragraph>
      {about.map((el, idx) => {
        const {title, items} = el;
        const text = Array.isArray(items) ? transformArray(items) : items;
        return (
          <View
            key={keyExtractor(el, idx)}
            style={styles.aboutContainer}>
            {title?.text ? (
              <Paragraph
                style={styles.aboutTitle}
                size={16}
                color="#ababab"
                noMargin>
                {title.text}
              </Paragraph>
            ) : null}
            <Paragraph
              size={16}
              color="#333"
              noMargin>
              {text}
            </Paragraph>
          </View>
        );
      })}
    </View>
  );
}

PersonalPage.propTypes = {
  about: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(PersonalPage);
