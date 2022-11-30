import React from "react";
import * as PropTypes from "prop-types";
import ImagePickerActionSheet from "../actionSheets/ImagePicker";
import MediaLibrary from "../modals/MediaLybrary";
import {MODAL_TIMING} from "../../constants/Layout";

const ACTION_SHEET = "ACTION_SHEET";
const MEDIA_GALLERY = "MEDIA_GALLERY";
const timing = MODAL_TIMING;
const delay = (timing) + (timing / 1.5);

function ImagePicker(props) {
  const {
    open, dismiss, onConfirm, single, onlyImages, paramLinkId, kind,
  } = props;
  const [actionSheet, setActionSheet] = React.useState(true);
  const [library, setLibrary] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);

  const select = React.useCallback((item) => {
    const arr = Array.from(selected);
    const idx = arr.findIndex((el) => el.id === item.id);
    if (single) {
      if (idx !== -1) {
        return setSelected([]);
      }
      return setSelected([item]);
    }
    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(item);
    }
    setSelected(arr);
  }, [selected]);

  const onDismiss = React.useCallback(() => {
    setSelected([]);
    setPhotos([]);
    dismiss();
  }, []);

  const _onConfirm = React.useCallback((payload) => {
    onDismiss();
    onConfirm(payload);
  }, [onConfirm]);

  const changeView = (next) => {
    switch (next) {
      case MEDIA_GALLERY: {
        setActionSheet(false);
        setTimeout(() => {
          setLibrary(true);
        }, delay);
        break;
      }
      case ACTION_SHEET: {
        setLibrary(false);
        setTimeout(() => {
          setActionSheet(true);
        }, delay);
        break;
      }
      default:
    }
  };

  return (
    <React.Fragment>
      <ImagePickerActionSheet
        kind={kind}
        paramLinkId={paramLinkId}
        onlyImages={onlyImages}
        single={single}
        dismiss={onDismiss}
        timing={timing}
        selected={selected}
        select={select}
        visible={open && actionSheet}
        photos={photos}
        setPhotos={setPhotos}
        onConfirm={_onConfirm}
        openMediaLibrary={() => changeView(MEDIA_GALLERY)} />
      <MediaLibrary
        timing={timing}
        selected={selected}
        select={select}
        dismiss={() => changeView(ACTION_SHEET)}
        visible={library} />
    </React.Fragment>
  );
}

ImagePicker.propTypes = {
  open: PropTypes.bool,
  paramLinkId: PropTypes.shape({}),
  dismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  single: PropTypes.bool,
  onlyImages: PropTypes.bool,
  kind: PropTypes.string,
};

export default React.memo(ImagePicker);
