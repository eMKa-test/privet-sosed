import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as PropTypes from "prop-types";
import {useFocusEffect} from "@react-navigation/native";
import styles from "../styles";
import Header from "../../../components/header";
import HeaderMenu from "../../../components/header/menu";
import CloseButton from "../../../components/buttons/close";
import {goBack, navigate} from "../../../navigation/root";
import GeoBanner from "../../../components/GeoBanner";
import Paragraph from "../../../components/text/Paragraph";
import DefaultButton from "../../../components/buttons/default";
import {DIMMED_TEXT} from "../../../constants/Colors";
import {HOMES} from "../../../constants/Vars";
import ImagePicker from "../../../components/ImagePicker";
import DocRow from "../../../components/DocRow";
import sendToApprove from "../../../lib/api/house/send-to-approve";
import {
  ADD, fetchDocs, filesReducer, INIT, initialFilesReducerState, makeBannerText, REMOVE, uploadAsync,
} from "./helpers";

function UploadDocsScreen(props) {
  const {route} = props;
  const [imagePickerOpen, setImagePickerOpen] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [files, dispatch] = React.useReducer(filesReducer, initialFilesReducerState(), initialFilesReducerState);

  useFocusEffect(React.useCallback(() => {
    if (route.params?.data?.id) {
      fetchDocs(route.params.data.id, (arr) => dispatch({
        type: INIT,
        files: arr,
      }));
    }
  }, [route.params?.data?.id]));

  const submit = React.useCallback(() => {
    setError(null);
    const id = get(route.params, "data.id");
    if (id) {
      sendToApprove(id, (err) => {
        if (err) {
          return setError(err);
        }
        navigate(HOMES);
      });
    }
  }, [route.params]);

  const uploadImage = React.useCallback((payload) => {
    uploadAsync(
      get(route.params, "data.id"),
      payload,
      (err, file) => {
        if (err) {
          return setError(err);
        }
        if (file) {
          dispatch({type: ADD, file});
        }
      },
    );
  }, [route.params]);

  const dismissPicker = React.useCallback(() => setImagePickerOpen(false), []);

  const closeScreen = React.useCallback(() => {
    if (typeof goBack === "function") {
      goBack();
    }
  }, [goBack]);

  const reset = React.useCallback(() => {
    setError(null);
    setImagePickerOpen(true);
  }, []);

  const afterDelete = React.useCallback((id) => dispatch({type: REMOVE, id}), []);

  return (
    <View style={styles.createAddrRoot}>
      <Header
        leftItem={<HeaderMenu active={{label: "Загрузка документов"}} />}
        rightItem={<CloseButton onPress={closeScreen} />} />
      <ScrollView>
        <GeoBanner
          title="Загрузка документов"
          description="Для подтверждения дома по адресу, загрузите квитанции за последние 2 месяца" />
        <View style={styles.uploadDocsTitle}>
          <Paragraph
            size={22}
            center>
            {makeBannerText(route.params)}
          </Paragraph>
        </View>
        <View style={styles.uploadDocs}>
          <TouchableOpacity onPress={reset}>
            <View style={styles.dropZone}>
              <Paragraph
                noMargin
                center
                size={18}
                style={styles.dropZoneTitle}>
                Загрузить файлы
              </Paragraph>
              <Paragraph
                noMargin
                center
                color={DIMMED_TEXT}
                size={14}>
                Допустимый формат файлов jpg, jpeg, png, pdf. Масимальный размер одного файла 20 Мб.
              </Paragraph>
              {error ? (
                <Paragraph
                  center
                  size={12}
                  color="red">
                  {error}
                </Paragraph>
              ) : null}
            </View>
          </TouchableOpacity>
          {files?.length > 0 ? (
            <View style={styles.uploadRows}>
              {files.map((file, idx) => (
                <DocRow
                  key={file?.id || String(idx)}
                  afterDelete={afterDelete}
                  data={file} />
              ))}
            </View>
                    ) : null}
          <DefaultButton
            disabled={isEmpty(files)}
            title="Отправить"
            onPress={submit} />
          <ImagePicker
            onConfirm={uploadImage}
            dismiss={dismissPicker}
            open={imagePickerOpen} />
        </View>
      </ScrollView>
    </View>
  );
}

UploadDocsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }).isRequired,
    }),
  }),
};

export default UploadDocsScreen;
