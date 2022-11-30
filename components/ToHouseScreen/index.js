import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import {navigate} from "../../navigation/root";
import {HOMES} from "../../constants/Vars";
import {idProp} from "../../lib/utils";
import {TabNavigationContext} from "../../providers/tabNavigationProvider";

function ToHouse({
  houseId, houseLabel, addHouse, children,
}) {
  const {setParams} = React.useContext(TabNavigationContext);

  const redirect = React.useCallback(() => {
    if (!houseId && !addHouse) {
      return null;
    }
    const result = houseId ? {houseId, houseLabel} : {addHouse};
    setParams(result);
    navigate(HOMES);
  }, [houseId]);

  return (
    <TouchableOpacity onPress={redirect}>
      {children}
    </TouchableOpacity>
  );
}

ToHouse.propTypes = {
  houseId: idProp,
  houseLabel: PropTypes.string,
  addHouse: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default React.memo(ToHouse);
