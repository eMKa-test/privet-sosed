export const ADD_VOTE = "ADD_VOTE";
export const DELETE_VOTE = "DELETE_VOTE";

export const PUBLIC_POLL = "Публичный опрос";
export const ANONYMOUS_POLL = "Анонимный опрос";
export const ONE_VOTE = "Проголосовал";
export const TWO_OR_FEW_VOTES = "Проголосовали";
export const ONE_OR_FEW_PEOPLE = "человек";
export const TWO_PEOPLE = "человека";
export const VOTE_FIRST = "Проголосуйте первым!";
export const RESULTS_AFTER_POLL_OVER = "Результаты будут доступны после окончания опроса";

// gradient colors
const WHITE = "#fff";
const ORANGE_LIGHT = "#e4b03c";
const ORANGE_DARK = "#cd5d4b";
const BLUE_LIGHT = "#3658d6";
const BLUE_DARK = "#37458c";
const GREEN_LIGHT = "#4ebd8d";
const GREEN_DARK = "#1f7861";
const PURPLE_LIGHT = "#6b21a7";
const PURPLE_DARK = "#4d2e75";
const GREY_LIGHT = "#8a9db8";
const GREY_DARK = "#2a3458";

// loader colors
const ORANGE_LOADER = "#e99114";
const WHITE_LOADER = "#fff";

// more menu colors (three dots)
const GREY_DOTS = "#C2C0C0";

// button colors
const BUTTON_WHITE = "rgba(255,255,255,0.9)";
const BUTTON_GREY = "rgba(155,178,195,0.6)";

// gradients
export const NO_GRADIENT = [WHITE, WHITE];
export const ORANGE_GRADIENT = [ORANGE_LIGHT, ORANGE_DARK];
export const BLUE_GRADIENT = [BLUE_LIGHT, BLUE_DARK];
export const GREEN_GRADIENT = [GREEN_LIGHT, GREEN_DARK];
export const PURPLE_GRADIENT = [PURPLE_LIGHT, PURPLE_DARK];
export const GREY_GRADIENT = [GREY_LIGHT, GREY_DARK];

export const GRADIENT_START = [0, 0];
export const GRADIENT_END = [1, 1];

// outer border
const DARK_BORDER = {
  borderWidth: 1,
  borderColor: "rgba(155,178,195,.4)",
};
const NONE_BORDER = {
  borderWidth: 0,
  borderColor: "transparent",
};

// option progress bar colors
const DARK_PROGRESS_BAR = {
  backgroundColor: "rgba(155,178,195,0.7)",
};
const LIGHT_PROGRESS_BAR = {
  backgroundColor: "rgba(255,255,255,0.25)",
};

// text and bg colors
const DARK_MAIN_TEXT_COLOR = "#333";
const LIGHT_MAIN_TEXT_COLOR = "#fff";

const DARK_SECOND_TEXT_COLOR = "#333";
const LIGHT_SECOND_TEXT_COLOR = "rgba(255,255,255,0.85)";

const DARK_OPTION_VOTES_COLOR = "rgba(51,51,51,.70)";
const LIGHT_OPTION_VOTES_COLOR = "rgba(255,255,255,.70)";

const DARK_OPTION_BG_COLOR = "rgba(155,178,195,.25)";
const LIGHT_OPTION_LIGHT_BG_COLOR = "rgba(255,255,255,.25)";

// checkbox & check mark colors
const DARK_CHECKBOX_COLOR = {
  borderColor: "rgba(155,178,195,0.8)",
  backgroundColor: "transparent",
};
const LIGHT_CHECKBOX_COLOR = {
  borderColor: "rgba(255,255,255,0.6)",
  backgroundColor: "transparent",
};

const DARK_CHECK_MARK_COLOR = {
  borderBottomColor: "#e99114",
  borderLeftColor: "#e99114",
};
const LIGHT_CHECK_MARK_COLOR = {
  borderBottomColor: "#fff",
  borderLeftColor: "#fff",
};

// full theme colors
export const DARK_COLORS = {
  mainColor: {color: DARK_MAIN_TEXT_COLOR},
  secondColor: {color: DARK_SECOND_TEXT_COLOR},
  optionVotesColor: {color: DARK_OPTION_VOTES_COLOR},
  optionBGColor: {backgroundColor: DARK_OPTION_BG_COLOR},
  outerBorder: DARK_BORDER,
  checkboxColor: DARK_CHECKBOX_COLOR,
  checkMarkColor: DARK_CHECK_MARK_COLOR,
  loaderColor: ORANGE_LOADER,
  dotsColor: GREY_DOTS,
  optionProgressColor: DARK_PROGRESS_BAR,
};

export const LIGHT_COLORS = {
  mainColor: {color: LIGHT_MAIN_TEXT_COLOR},
  secondColor: {color: LIGHT_SECOND_TEXT_COLOR},
  optionVotesColor: {color: LIGHT_OPTION_VOTES_COLOR},
  optionBGColor: {backgroundColor: LIGHT_OPTION_LIGHT_BG_COLOR},
  outerBorder: NONE_BORDER,
  checkboxColor: LIGHT_CHECKBOX_COLOR,
  checkMarkColor: LIGHT_CHECK_MARK_COLOR,
  loaderColor: WHITE_LOADER,
  dotsColor: WHITE,
  optionProgressColor: LIGHT_PROGRESS_BAR,
};

// extra colors theme for each theme
export const EXTRA_WHITE = {
  buttonColor: {backgroundColor: BUTTON_GREY, color: DARK_MAIN_TEXT_COLOR},
};
export const EXTRA_ORANGE = {
  buttonColor: {backgroundColor: BUTTON_WHITE, color: ORANGE_DARK},
};
export const EXTRA_BLUE = {
  buttonColor: {backgroundColor: BUTTON_WHITE, color: BLUE_DARK},
};
export const EXTRA_GREEN = {
  buttonColor: {backgroundColor: BUTTON_WHITE, color: GREEN_DARK},
};
export const EXTRA_PURPLE = {
  buttonColor: {backgroundColor: BUTTON_WHITE, color: PURPLE_DARK},
};
export const EXTRA_GREY = {
  buttonColor: {backgroundColor: BUTTON_WHITE, color: GREY_DARK},
};
