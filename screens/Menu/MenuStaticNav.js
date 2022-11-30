import React from "react";
import {View} from "react-native";
import StaticNav from "../../components/StaticNav";
import {staticNavStyles} from "./styles";
import TransparentButton from "../../components/buttons/transparent";
import logout from "../../lib/api/logout";

function MenuStaticNav() {
  return (
    <View style={staticNavStyles.root}>
      <StaticNav vertical>
        <TransparentButton
          titleStyle={staticNavStyles.elementTitle}
          title="Выход"
          onPress={logout} />
      </StaticNav>
    </View>
  );
}

export default React.memo(MenuStaticNav);
