import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const MAX_WIDTH = width > 450 ? 450 : width;
export const MODAL_BORDER_WIDTH = 4;
export const WIDTH = width;
export const MODAL_TIMING = 250;
export const ACTION_SHEET_BACKDROP = 0.6;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
