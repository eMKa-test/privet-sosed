import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  View, Image, TouchableOpacity, ScrollView, ImageBackground,
} from "react-native";
import * as Linking from "expo-linking";
import get from "lodash/get";
import styles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {idProp, imageSource} from "../../lib/utils";
import Paragraph from "../../components/text/Paragraph";
import DotsIcon from "../../components/icons/dots";
import {
  load,
  loadUser,
  openMenu,
  reducer,
  initialState,
  getUser,
} from "./helpers";
import PersonalPage from "./PersonalPage";
import {profileBg} from "../../assets";
import DropdownAction from "../../components/actionSheets/Dropdown";
import {navigate} from "../../navigation/root";
import {ABUSE, PROFILE, MENU} from "../../constants/Vars";
import {MODAL_TIMING} from "../../constants/Layout";
import BdInfo from "../../components/icons/personalInfoIcons/bdInfo";
import MailInfo from "../../components/icons/personalInfoIcons/mailInfo";
import GpsInfo from "../../components/icons/personalInfoIcons/gpsInfo";
import PhoneInfo from "../../components/icons/personalInfoIcons/phoneInfo";

const headerTitle = {label: "Соседи"};
const modalOptions = (meId, id) => {
  return String(meId) === String(id) ? [{
    id: 1,
    label: "Редактировать",
    action: () => navigate(MENU, {screen: PROFILE}),
  }] : [{
    id: 2,
    label: "Пожаловаться",
    action: (abuseId) => navigate(ABUSE, {abuseId, abuseType: "USER"}),
  }];
};

function UserPageScreen({route, me}) {
  const {params: {userId: id}} = route;
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  React.useEffect(() => {
    dispatch(load());
    getUser(id, (user) => {
      dispatch(loadUser(user));
    });
  }, []);

  const userName = get(state.info, "title", "");
  const userAvatar = get(state.info, "avatar_big", "");
  const userStatus = state.info?.online === "online";
  const lastVisit = get(state.info, "last_visit_time_formatted", "");
  const userLastVisit = userStatus ? "в сети" : lastVisit;
  const userBirth = get(state.info, "birthday", "");
  const userEmail = get(state.info, "email", "");
  const userPhone = get(state.info, "phone", "");
  const userAddress = get(state.info, "houses", "");

  const openUserMenu = React.useCallback(() => {
    dispatch(openMenu(true));
  }, []);

  const closeUserMenu = React.useCallback(() => {
    dispatch(openMenu(false));
  }, []);

  const onSelect = React.useCallback(({action}) => {
    dispatch(openMenu(false));
    setTimeout(() => {
      action(state.info?.id);
    }, MODAL_TIMING);
  }, [state.info]);

  const mailTo = React.useCallback(() => {
    Linking.openURL(`mailto:${userEmail}`);
  }, [userEmail]);

  const activeUser = state.about.length > 0;

  return (
    <View style={styles.rootUserPage}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
        )} />
      <ScrollView>
        <View style={styles.headerUserPage}>
          <ImageBackground
            style={styles.bg}
            source={profileBg} />
          {activeUser ? (
            <TouchableOpacity
              onPress={openUserMenu}
              style={styles.userMenu}>
              <DotsIcon />
            </TouchableOpacity>
          ) : null}
          <View style={styles.avatarContainer}>
            {userStatus ? (
              <View style={styles.personBadgeContainer} />
            ) : null}
            <Image
              source={imageSource(userAvatar)}
              style={styles.userAvatar} />
          </View>
        </View>
        <View style={styles.userTitle}>
          {userName ? (
            <Paragraph
              size={18}
              color="#333"
              medium
              noMargin>
              {userName}
            </Paragraph>
          ) : null}
          {userLastVisit ? (
            <Paragraph
              color="#ABABAB"
              size={14}
              noMargin>
              {userLastVisit}
            </Paragraph>
          ) : null}
        </View>
        <View style={styles.userAddress}>
          {userBirth ? (
            <View style={styles.userInfoWrapper}>
              <View style={styles.iconContainer}>
                <BdInfo />
              </View>
              <Paragraph
                style={styles.userInfoItem}
                size={15}
                noMargin>
                {userBirth}
              </Paragraph>
            </View>
          ) : null}
          {userEmail ? (
            <TouchableOpacity onPress={mailTo}>
              <View style={styles.userInfoWrapper}>
                <View style={styles.iconContainer}>
                  <MailInfo />
                </View>
                <Paragraph
                  color="#9bb2c3"
                  size={15}
                  noMargin>
                  {userEmail}
                </Paragraph>
              </View>
            </TouchableOpacity>
          ) : null}
          {userPhone ? (
            <View style={styles.userInfoWrapper}>
              <View style={styles.iconContainer}>
                <PhoneInfo />
              </View>
              <Paragraph
                style={styles.userInfoItem}
                size={15}
                noMargin>
                {userPhone}
              </Paragraph>
            </View>
          ) : null}
          {Array.isArray(userAddress) ? (
            userAddress.map(({name}) => (
              <View
                key={name}
                style={styles.userInfoWrapper}>
                <View style={styles.iconContainer}>
                  <GpsInfo />
                </View>
                <Paragraph
                  style={styles.userInfoItem}
                  size={15}
                  noMargin>
                  {name}
                </Paragraph>
              </View>
            ))
          ) : null}
        </View>
        {state.about.length > 0 ? (
          <PersonalPage about={state.about} />
        ) : null}
      </ScrollView>
      <DropdownAction
        options={modalOptions(me?.id, state.info?.id)}
        onSelect={onSelect}
        dismiss={closeUserMenu}
        open={state.menu} />
    </View>
  );
}

UserPageScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: idProp,
    }),
  }),
  me: PropTypes.shape({
    id: idProp,
    is_email_confirmed: idProp,
  }),
};

const mapStateToProps = (state) => ({
  me: state.account,
});

export default connect(mapStateToProps, null)(UserPageScreen);
