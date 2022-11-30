import React, {memo, useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import get from "lodash/get";
import Paragraph from "../../components/text/Paragraph";
import styles from "./styles";
import SubscribeDistrictIcon from "../../components/icons/subscribeDistrict";
import UnSubscribeDistrictIcon from "../../components/icons/unSubscribeDistrict";
import BookmarkDistrictIcon from "../../components/icons/bookmarkDistrict";
import UnBookmarkDistrictIcon from "../../components/icons/unBookmarkDistrict";
import {idProp} from "../../lib/utils";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import {DIMMED_COLOR, TEXT_COLOR} from "../../constants/Colors";
import DotsIcon from "../../components/icons/dots";
import {
  updateLocalInfo,
} from "./helpers";
import localsBookmark from "../../lib/api/locals/locals-bookmark";
import localsUnBookmark from "../../lib/api/locals/locals-unbookmark";
import localsSubscribe from "../../lib/api/locals/locals-subscribe";
import localsUnSubscribe from "../../lib/api/locals/locals-unsubscribe";

function DistrictItem(props) {
  const {
    item, updateLocals, openDropdown,
  } = props;
  const isSubscribe = get(item, "is_subscribe", 0);
  const isBookmark = get(item, "is_bookmark", 0);
  const district = get(item, "local.name", UNKNOWN_ERROR);
  const city = get(item, "local.topname", UNKNOWN_ERROR);
  const locaId = get(item, "local.id", UNKNOWN_ERROR);

  const onPressSubscribe = useCallback((val) => () => {
    const fetchData = val ? localsUnSubscribe : localsSubscribe;
    updateLocalInfo(locaId, fetchData, updateLocals);
  }, [locaId, isSubscribe]);

  const onPressBookmark = useCallback((val) => () => {
    const fetchData = val ? localsUnBookmark : localsBookmark;
    updateLocalInfo(locaId, fetchData, updateLocals);
  }, [locaId, isBookmark]);

  return (
    <View style={styles.districtItemRoot}>
      <TouchableOpacity
        onPress={onPressSubscribe(isSubscribe)}
        style={styles.districtItemHeader}>
        {isSubscribe ? <SubscribeDistrictIcon /> : <UnSubscribeDistrictIcon />}
      </TouchableOpacity>
      <View
        style={styles.districtItemBody}>
        <TouchableOpacity
          style={styles.address}
          onPress={() => {}}>
          <Paragraph
            size={16}
            color={TEXT_COLOR}
            style={styles.districtName}
            noMargin>
            {district}
          </Paragraph>
          <Paragraph
            size={13.5}
            color={DIMMED_COLOR}
            style={styles.districtCity}
            noMargin>
            {city}
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookmarkToggler}
          onPress={onPressBookmark(isBookmark)}>
          {isBookmark ? <BookmarkDistrictIcon /> : <UnBookmarkDistrictIcon />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={openDropdown(item)}
        style={styles.dropdownToggler}>
        <DotsIcon />
      </TouchableOpacity>
    </View>
  );
}
DistrictItem.propTypes = {
  openDropdown: PropTypes.func,
  updateLocals: PropTypes.func,
  item: PropTypes.shape({
    is_subscribe: idProp,
  }),
};

export default memo(DistrictItem);
