import {WELCOME, STATIC_WEBVIEW} from "../constants/Vars";
import WelcomeScreen from "../screens/Welcome";
import StaticScreen from "../screens/StaticWebview";

const staticScreens = [{
  name: STATIC_WEBVIEW,
  component: StaticScreen,
  options: {
    headerShown: false,
  },
},
{
  name: WELCOME,
  component: WelcomeScreen,
  options: {
    header: () => null,
  },
}];

export default staticScreens;
