import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import {navigate} from "../../navigation/root";
import {USER_PAGE_SCREEN} from "../../constants/Vars";
import {idProp} from "../../lib/utils";

function ToUser({userId, children}) {
  const redirect = React.useCallback(() => {
    if (!userId) {
      return null;
    }
    return navigate(USER_PAGE_SCREEN, {userId});
  }, [userId]);

  return (
    <TouchableOpacity onPress={redirect}>
      {children}
    </TouchableOpacity>
  );
}

ToUser.propTypes = {
  userId: idProp,
  children: PropTypes.node.isRequired,
};

export default React.memo(ToUser);
