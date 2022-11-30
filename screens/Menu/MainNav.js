import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {mainNavStyles} from "./styles";
import NeighborsIcon from "../../components/icons/neighbors";
import SettingsIcon from "../../components/icons/settings";
import {navigate} from "../../navigation/root";
import {NEIGHBORS, PROFILE} from "../../constants/Vars";

function MainNav() {
  return (
    <View style={mainNavStyles.root}>
      <TouchableOpacity onPress={() => navigate(NEIGHBORS)}>
        <View style={mainNavStyles.element}>
          <NeighborsIcon size={20} />
          <Text style={mainNavStyles.elementTitle}>
            Соседи
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(PROFILE)}>
        <View style={mainNavStyles.element}>
          <SettingsIcon size={20} />
          <Text style={mainNavStyles.elementTitle}>
            Мои настройки
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(MainNav);
