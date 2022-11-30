import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import moment from "moment";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import Paragraph from "../../components/text/Paragraph";
import indexScreenStyles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import UserInfo from "./UserInfo";
import MainNav from "./MainNav";
import MenuStaticNav from "./MenuStaticNav";

const screenHeading = {label: "Меню"};

const ver = () => {
  return `TimeZone: ${new Date().getTimezoneOffset() / -60} \n
Дата сборки: ${moment(Constants.manifest.publishedTime).format("DD.MM.YYYY HH:mm")}`;
};

function MenuScreen() {
  return (
    <View style={indexScreenStyles.root}>
      <Header leftItem={<HeaderMenu active={screenHeading} />} />
      <ScrollView>
        <UserInfo />
        <MainNav />
        <MenuStaticNav />

        {/* TODO: ↓ ↓ ↓ убрать перед релизом ↓ ↓ ↓ */}
        <TouchableOpacity
          onLongPress={() => {
            Updates.reloadAsync();
          }}>
          <Paragraph
            style={{
              backgroundColor: "white",
              padding: 15,
            }}
            size={14}>
            {ver()}
          </Paragraph>
        </TouchableOpacity>
        {/* TODO: ↑ ↑ ↑ убрать перед релизом ↑ ↑ ↑ */}
      </ScrollView>
    </View>
  );
}

export default MenuScreen;
