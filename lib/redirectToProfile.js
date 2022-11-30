import {navigate} from "../navigation/root";
import {USER_PAGE_SCREEN} from "../constants/Vars";

function redirectRoProfile(userId) {
  if (!userId) {
    return null;
  }
  return navigate(USER_PAGE_SCREEN, {userId});
}

export default redirectRoProfile;
