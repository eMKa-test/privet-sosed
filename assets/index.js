import {
  BOLD_FONT, LIGHT_FONT, REGULAR_FONT, MEDIUM_FONT,
} from "../constants/Vars";

const logo = require("./svg/h_logo.svg");
const splash = require("./images/splash.png");
const guys = require("./images/main_p.png");
const mapIcon = require("./images/map_icon-01.png");
const deletedUserIcon = require("./images/deleted_avatar.png");
const profileBg = require("./images/profile_bg.png");

// polls-backgrounds
const bluePoll = require("./images/poll-backgrounds/blue.png");
const greenPoll = require("./images/poll-backgrounds/green.png");
const greyPoll = require("./images/poll-backgrounds/grey.png");
const orangePoll = require("./images/poll-backgrounds/orange.png");
const purplePoll = require("./images/poll-backgrounds/purple.png");
const whitePoll = require("./images/poll-backgrounds/white.png");

// 300
const RobotoLight = require("./fonts/Roboto/Roboto-Light.ttf");
// 400
const RobotoRegular = require("./fonts/Roboto/Roboto-Regular.ttf");
// 500
const RobotoMedium = require("./fonts/Roboto/Roboto-Medium.ttf");
// 700
const RobotoBold = require("./fonts/Roboto/Roboto-Bold.ttf");

export const fonts = {
  [LIGHT_FONT]: RobotoLight,
  [REGULAR_FONT]: RobotoRegular,
  [MEDIUM_FONT]: RobotoMedium,
  [BOLD_FONT]: RobotoBold,
};

export const images = [
  splash, guys, logo, mapIcon, deletedUserIcon, bluePoll, greenPoll, greyPoll, orangePoll, purplePoll, whitePoll,
];

export {
  splash,
  guys,
  logo,
  mapIcon,
  deletedUserIcon,
  bluePoll,
  greenPoll,
  greyPoll,
  orangePoll,
  purplePoll,
  whitePoll,
  profileBg,
};
