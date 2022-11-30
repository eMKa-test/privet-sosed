import React from "react";
import {ScrollView, View} from "react-native";
import styles from "../styles";
import Paragraph from "../../../components/text/Paragraph";
import Passwords from "./Passwords";
import Email from "./Email";
import AuthSocial from "./AuthSocial";

function Setup() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            Смена пароля
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          <Passwords />
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            Смена электронной почты
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          <Email />
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            Авторизация через соцсети
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          <AuthSocial />
        </View>
      </View>
    </ScrollView>
  );
}

export default Setup;
