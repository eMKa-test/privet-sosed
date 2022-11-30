import NetInfo from "@react-native-community/netinfo";
import {Alert} from "react-native";
import * as Updates from "expo-updates";

async function init() {
  const {isConnected} = await NetInfo.fetch();
  if (isConnected) {
    // eslint-disable-next-line consistent-return
    try {
      const {isAvailable} = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        const update = await Updates.fetchUpdateAsync();
        if (update.isNew) {
          Alert.alert("", "Доступна новая версия приложения", [
            {
              text: "Продолжить",
            },
            {
              text: "Обновить",
              onPress: () => {
                Updates.reloadAsync();
              },
            },
          ]);
        }
      }
    } catch (e) {
      // ...
    }
  }
}

export default init;
