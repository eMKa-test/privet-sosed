import React from "react";
import * as PropTypes from "prop-types";
import {ScrollView, View} from "react-native";
import styles from "./styles";
import TransparentButton from "../../components/buttons/transparent";

const types = [
  {
    id: 1,
    title: "Пост",
  },
  {
    id: 2,
    title: "Событие",
  },
  {
    id: 3,
    title: "Объявление",
  },
  {
    id: 4,
    title: "Опрос",
  },
];

function PostType(props) {
  const {initial = 1, afterSelect} = props;
  const [selected, setSelected] = React.useState(initial);

  const select = (id) => React.useCallback(() => {
    setSelected(id);
    if (typeof afterSelect === "function") {
      afterSelect(id);
    }
  }, [afterSelect]);

  React.useEffect(() => {
    setSelected(initial);
  }, [initial]);

  return (
    <ScrollView
      horizontal
      style={styles.row}>
      {types.map((type) => {
        const active = type.id === selected;
        return (
          <TransparentButton
            onPress={select(type.id)}
            key={type.id}
            light={!active}
            color="#1a1a1a"
            title={type.title} />
        );
      })}
    </ScrollView>
  );
}

PostType.propTypes = {
  initial: PropTypes.number,
  afterSelect: PropTypes.func,
};

export default React.memo(PostType);
