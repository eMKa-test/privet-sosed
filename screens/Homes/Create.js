import React from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, View,
} from "react-native";
import styles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {navigate} from "../../navigation/root";
import NewAddressForms from "./NewAddressForms";
import {HOMES} from "../../constants/Vars";
import AddHouseIcon from "../../components/icons/addHouse";

const headerTitle = {label: "Добавление нового адреса"};

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

function CreateHouseScreen() {
  const afterSubmit = React.useCallback((newAddr, data) => {
    navigate(HOMES, {newAddr, data});
  }, []);

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.createAddrRoot}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
                )} />
      <ScrollView keyboardShouldPersistTaps="always">
        <AddHouseIcon />
        <NewAddressForms afterSubmit={afterSubmit} />
      </ScrollView>
    </Wrapper>
  );
}

export default CreateHouseScreen;
