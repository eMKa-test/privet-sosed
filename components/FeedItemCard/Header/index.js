import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import React from "react";
import * as PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import {idProp, imageSource} from "../../../lib/utils";
import Paragraph from "../../text/Paragraph";
import styles from "../styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";
import GpsMarkIcon from "../../icons/gpsmark";
import ToUser from "../../ToUserProfile";
import ToHouse from "../../ToHouseScreen";

function Header(props) {
  if (isEmpty(props?.data)) {
    return null;
  }

  const {showStreet = true} = props;
  const {
    user, created_time: createdAt, house, group,
  } = props.data;
  const address = group?.name || group?.fullname || house?.name || house?.fullname || "";

  return (
    <View style={styles.header}>
      <ToUser userId={user?.id}>
        <Image
          style={styles.avatar}
          source={imageSource(user?.avatar)} />
      </ToUser>
      <View>
        <ToUser userId={user?.id}>
          <Paragraph noMargin>
            {get(user, "title", UNKNOWN_ERROR)}
          </Paragraph>
        </ToUser>
        {showStreet && address ? (
          <ToHouse
            houseLabel={house?.name}
            houseId={house?.id}>
            <View style={styles.street}>
              <GpsMarkIcon />
              <Paragraph
                style={styles.streetName}
                color="#9bb2c3"
                noMargin>
                {address}
              </Paragraph>
            </View>
          </ToHouse>
        ) : null}
        <Paragraph
          noMargin
          color="#ababab"
          size={13}>
          {createdAt}
        </Paragraph>
      </View>
    </View>
  );
}

Header.propTypes = {
  data: PropTypes.shape({
    id: idProp,
    created_time: PropTypes.string,
    house: PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
      fullname: PropTypes.string,
    }),
    group: PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
      fullname: PropTypes.string,
    }),
    user: PropTypes.shape({
      id: idProp,
      avatar: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
  showStreet: PropTypes.bool,
};

export default React.memo(Header, () => true);
