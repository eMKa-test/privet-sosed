import {Platform} from "react-native";
import vkIcon from "../../../../components/icons/authIcons/vk";
import fbIcon from "../../../../components/icons/authIcons/fb";
import googleIcon from "../../../../components/icons/authIcons/google";
import appleIcon from "../../../../components/icons/authIcons/apple";
import okIcon from "../../../../components/icons/authIcons/ok";
import yaIcon from "../../../../components/icons/authIcons/ya";

const options = [
  {
    id: "vk",
    icon: vkIcon,
    title: "ВКонтакте",
  },
  {
    id: "fb",
    icon: fbIcon,
    title: "Facebook",
  },
  {
    id: "google",
    icon: googleIcon,
    title: "Google",
  },
  {
    id: "ok",
    icon: okIcon,
    title: "Одноклассники",
  },
  {
    id: "ya",
    icon: yaIcon,
    title: "Яндекс",
  },
];

if (Platform.OS === "ios") {
  options.push({
    id: "apple",
    icon: appleIcon,
    title: "Apple ID",
  });
}

export {options};

export default null;
