import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import memoize from "lodash/memoize";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useFocusEffect} from "@react-navigation/native";
import {Platform, View, Text} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {ifIphoneX} from "react-native-iphone-x-helper";
import {
  FEED, MENU, HOMES, MESSAGES, REGULAR_FONT, DISTRICT,
} from "../constants/Vars";
import {
  ACTIVE_ICON_COLOR, ICON_COLOR, ORANGE_COLOR, WHITE,
} from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import MenuStack from "./MenuStack";
import FeedStack from "./FeedStack";
import MessagesStack from "./MessagesStack";
import HomesStack from "./HomesStack";
import DistrictStack from "./DistrictStack";
import {getMyAccount} from "../store/actions/accountActions";
import Paragraph from "../components/text/Paragraph";
import {SCREEN_WIDTH} from "../constants/Layout";
import {MESSAGE_COUNT} from "../store/actions/messagesActions";
import getUnreadRooms from "../lib/api/chat/get-unread-rooms";
import {idProp} from "../lib/utils";

const Tabs = createBottomTabNavigator();

const LABELS = {
  [FEED]: "Новости",
  [MESSAGES]: "Сообщения",
  [DISTRICT]: "Районы",
  [HOMES]: "Дома",
  [MENU]: "Меню",
};

const textStyles = memoize((shiftLeft = false) => {
  if (shiftLeft) {
    return {
      marginLeft: -1,
    };
  }
  return {};
});

const badgeStyles = {
  view: {
    padding: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ORANGE_COLOR,
    position: "absolute",
    zIndex: 2,
    top: -3,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 0,
    color: WHITE,
    fontSize: 10,
    fontFamily: REGULAR_FONT,
  },
};

const tabBarIcon = memoize((routeName) => (props) => {
  return (
    <TabBarIcon
      name={routeName}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props} />
  );
});

// eslint-disable-next-line react/prop-types
const tabBarLabel = memoize((routeName) => ({color}) => (
  <Paragraph
    style={textStyles(routeName === MENU)}
    color={color}
    noMargin
    size={SCREEN_WIDTH < 375 ? 11 : 13}
    medium>
    {LABELS[routeName]}
  </Paragraph>
));

const options = ({route}) => {
  return {
    tabBarIcon: tabBarIcon(route.name),
    tabBarLabel: tabBarLabel(route.name),
  };
};

const tabs = [
  {
    name: FEED,
    component: FeedStack,
    options,
  },
  {
    name: MESSAGES,
    component: MessagesStack,
    options: () => {
      const unread = useSelector((state) => state.messages.unread);
      return {
        tabBarIcon: (props) => {
          return (
            <View>
              {unread > 0 ? (
                <View style={badgeStyles.view}>
                  <Text style={badgeStyles.text}>
                    {unread}
                  </Text>
                </View>
              ) : null}
              <TabBarIcon
                name={MESSAGES}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props} />
            </View>
          );
        },
        tabBarLabel: tabBarLabel(MESSAGES),
      };
    },
  },
  {
    name: DISTRICT,
    component: DistrictStack,
    options,
  },
  {
    name: HOMES,
    component: HomesStack,
    options,
  },
  {
    name: MENU,
    component: MenuStack,
    options,
  },
];

const tabBarOptions = {
  activeTintColor: ACTIVE_ICON_COLOR,
  inactiveTintColor: ICON_COLOR,
  keyboardHidesTabBar: Platform.OS === "android" && true,
  tabBadgeStyle: {
    color: "yellow",
    backgroundColor: "blue",
  },
  tabStyle: {
    paddingTop: 5,
    paddingBottom: 1,
  },
  style: {
    height: ifIphoneX(82, SCREEN_WIDTH < 375 ? 50 : 54),
  },
};

function MainTabsNavigator(props) {
  const {fetchAccount, count} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: MESSAGE_COUNT, unread: count});
  }, [count]);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      getUnreadRooms().then((unread) => {
        dispatch({type: MESSAGE_COUNT, unread});
      }).catch(console.sendError);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onFocus = React.useCallback(() => {
    if (typeof fetchAccount === "function") {
      fetchAccount();
    }
  }, [fetchAccount]);

  useFocusEffect(onFocus);

  return (
    <Tabs.Navigator
      initialRouteName={FEED}
      tabBarOptions={tabBarOptions}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options} />
      ))}
    </Tabs.Navigator>
  );
}

MainTabsNavigator.propTypes = {
  fetchAccount: PropTypes.func,
  count: idProp,
};

const mapStateToProps = (state) => ({
  count: state?.account?.unread_chats_cnt,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAccount: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainTabsNavigator);
