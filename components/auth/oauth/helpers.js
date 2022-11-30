import {Platform} from "react-native";
import VkIcon from "../../icons/authIcons/vk";
import FbIcon from "../../icons/authIcons/fb";
import GoolgeIcon from "../../icons/authIcons/google";
import OkIcon from "../../icons/authIcons/ok";
import AppleIcon from "../../icons/authIcons/apple";
import YaIcon from "../../icons/authIcons/ya";

const services = [
  {
    id: "vk",
    icon: VkIcon,
  },
  {
    id: "fb",
    icon: FbIcon,
  },
  {
    id: "ok",
    icon: OkIcon,
  },
  {
    id: "google",
    icon: GoolgeIcon,
  },
  {
    id: "ya",
    icon: YaIcon,
  },
];

if (Platform.OS === "ios") {
  services.push({
    id: "apple",
    icon: AppleIcon,
  });
}

export {services};

export default null;
