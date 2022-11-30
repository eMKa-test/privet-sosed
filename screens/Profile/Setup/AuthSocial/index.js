import React, {useState, useCallback, useEffect} from "react";
import {View} from "react-native";
import {Divider} from "react-native-elements";
import SwitchToggle from "@dooboo-ui/native-switch-toggle";
import {useDispatch, useSelector} from "react-redux";
import Paragraph from "../../../../components/text/Paragraph";
import {ACCENT_COLOR, WHITE} from "../../../../constants/Colors";
import styles from "./styles";
import {options} from "./helpers";
import {socialAuth} from "../../../../lib/auth";
import unlinkProfile from "../../../../lib/api/account/unlink-profile";
import {getMyAccount} from "../../../../store/actions/accountActions";

const unlinkProfileFn = async (id, callback) => {
  try {
    const err = await unlinkProfile(id);
    if (!err) {
      callback();
      return;
    }
    callback(err);
  } catch (e) {
    console.sendError(`Err unlinkProfile ${e.message}`);
  }
};

function AuthSocial() {
  const dispatch = useDispatch();
  const socialNetworks = useSelector((state) => state.account.profiles);

  const reduce = useCallback((profiles) => {
    if (Array.isArray(profiles)) {
      return profiles.reduce((acc, {is_active, network}) => {
        if (is_active) {
          acc.push(network);
        }
        return acc;
      }, []);
    }
    return [];
  }, []);

  const [switches, setSwitch] = useState(reduce(socialNetworks));

  const fetchAcc = useCallback(() => dispatch(getMyAccount()), [dispatch]);

  useEffect(() => {
    fetchAcc();
  }, []);

  useEffect(() => {
    setSwitch(reduce(socialNetworks));
  }, [socialNetworks]);

  const toggleSwitch = useCallback((id) => {
    if (switches.includes(id)) {
      unlinkProfileFn(id, (err) => {
        if (!err) {
          fetchAcc();
        }
      }).catch((e) => {
        console.sendError(`Err unlinkProfile ${e.message}`);
      });
    } else {
      socialAuth(id, () => {
        fetchAcc();
      }).catch((e) => {
        console.sendError(`Err socialAuth ${e.message}`);
      });
    }
  }, [switches, unlinkProfileFn, socialAuth]);

  return (
    <React.Fragment>
      {options.map((item) => (
        <React.Fragment key={item.id}>
          <View style={styles.itemCard}>
            <View style={styles.itemLeft}>
              <View
                style={styles.logoWrapper}>
                <item.icon />
              </View>
              <Paragraph
                size={16}
                style={styles.socialTitle}>
                {item.title}
              </Paragraph>
            </View>
            <SwitchToggle
              backgroundColorOn={ACCENT_COLOR}
              backgroundColorOff="rgba(155,178,195,.4)"
              circleColorOn={WHITE}
              circleColorOff={WHITE}
              containerStyle={styles.switchContainer}
              circleStyle={styles.circle}
              switchOn={switches.includes(item.id)}
              duration={200}
              onPress={() => toggleSwitch(item.id)} />
          </View>
          <Divider style={styles.divider} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default React.memo(AuthSocial);
