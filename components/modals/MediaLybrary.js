import React from "react";
import * as PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
  FlatList, Image, Text, TouchableOpacity, View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles, {COLS} from "./styles";
import CloseButton from "../buttons/close";
import Header from "../header";
import useCameraRoll from "../../lib/hooks/useCameraRoll";
import {imageSource} from "../../lib/utils";
import {imagePickerStyles} from "../actionSheets/styles";

function MediaLibrary(props) {
  const {
    visible, dismiss, timing = 150, select, selected,
  } = props;
  const inset = useSafeAreaInsets();
  const [photos, getPhotos] = useCameraRoll({first: 20});

  React.useEffect(() => {
    if (visible && typeof getPhotos === "function") {
      setTimeout(() => {
        getPhotos();
      }, timing);
    }
  }, [visible]);

  return (
    <Modal
      useNativeDriver
      animationOutTiming={timing / 1.6}
      animationInTiming={timing}
      style={[styles.modal, {
        marginTop: inset.top,
        marginBottom: inset.bottom > 0 ? inset.bottom : 20,
      }]}
      hideModalContentWhileAnimating
      isVisible={visible}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}>
      <View style={styles.modalContent}>
        <Header
          isModal
          leftItem={(
            <View style={styles.modalHeader}>
              <CloseButton onPress={dismiss} />
              <Text style={styles.modalHeaderText}>Выберите фото</Text>
            </View>
          )}
          rightItem={(
            <TouchableOpacity onPress={dismiss}>
              <Text style={styles.modalHeaderHelper}>
                {`Выбрано ${selected?.length} фото`}
              </Text>
            </TouchableOpacity>
          )} />
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={photos}
          onEndReachedThreshold={100}
          onEndReached={getPhotos}
          numColumns={COLS}
          columnWrapperStyle={styles.flatListRow}
          renderItem={({item}) => {
            const active = Array.isArray(selected)
              && selected.findIndex((el) => el.id === item.id);
            return (
              <TouchableOpacity onPress={() => select(item)}>
                <View style={styles.card}>
                  {active !== -1 && (
                    <View style={imagePickerStyles.checkBox}>
                      <View style={imagePickerStyles.check} />
                    </View>
                  )}
                  <Image
                    style={styles.cardImage}
                    source={imageSource(item.uri)} />
                </View>
              </TouchableOpacity>
            );
          }} />
      </View>
    </Modal>
  );
}

MediaLibrary.propTypes = {
  visible: PropTypes.bool,
  dismiss: PropTypes.func,
  timing: PropTypes.number,
  select: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
  })),
};

export default MediaLibrary;
