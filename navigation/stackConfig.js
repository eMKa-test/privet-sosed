import {Platform} from "react-native";
import {HEADER_BG_COLOR, MAIN_BG_COLOR} from "../constants/Colors";

const stackConfig = {
  cardStyle: {
    backgroundColor: MAIN_BG_COLOR,
  },
  defaultNavigationOptions: {
    headerBackTitle: null,
    headerTitleStyle: {
      ...Platform.select({
        ios: {
          marginHorizontal: 4,
        },
      }),
    },
    headerStyle: {
      backgroundColor: HEADER_BG_COLOR,
    },
  },
};

export default stackConfig;
