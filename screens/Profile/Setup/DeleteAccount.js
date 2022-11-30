import React, {useReducer, useCallback, useEffect} from "react";
import {
  TouchableOpacity, View, StyleSheet, TextInput,
} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import ConfirmModal from "../../../components/modals/Confirm/index";
import {keyExtractor} from "../../../lib/utils";
import CheckboxIcon from "../../../components/icons/checkbox";
import getCancelReasons from "../../../lib/api/account/cancel-reasons";
import cancelAccount from "../../../lib/api/account/cancel";
import {REGULAR_FONT} from "../../../constants/Vars";

const REASONS = "REASONS";
const OPEN_CONFIRM = "OPEN_CONFIRM";
const SELECT = "SELECT";
const COMMENT = "COMMENT";

const initialState = () => ({
  confirm: false,
  reasons: [],
  typeId: 0,
  note: "",
});

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_CONFIRM: {
      const {confirm} = action;
      if (!confirm) {
        return {
          ...state, note: "", typeId: 0, confirm,
        };
      }
      return {...state, confirm};
    }
    case SELECT: {
      const {typeId} = action;
      return {...state, typeId};
    }
    case REASONS: {
      const {reasons} = action;
      return {...state, reasons};
    }
    case COMMENT: {
      const {note} = action;
      return {...state, note};
    }
    default:
      return state;
  }
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxIcon: {
    marginRight: 5,
  },
  checkTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  comment: {
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    padding: 8,
    minHeight: 100,
    borderRadius: 3,
    color: "#333",
    fontSize: 16,
    fontFamily: REGULAR_FONT,
  },
});

function DeleteAccount() {
  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    getCancelReasons()
      .then((reasons) => {
        if (Array.isArray(reasons)) {
          dispatch({type: REASONS, reasons});
        }
      }).catch((e) => {
        console.sendError(`getCancelReasons ${e.message}`);
      });
  }, []);

  const toggleConfirm = useCallback((confirm) => {
    dispatch({type: OPEN_CONFIRM, confirm});
  }, []);

  const setSelect = useCallback((typeId) => {
    dispatch({type: SELECT, typeId});
  }, []);

  const onChangeText = useCallback((note) => {
    dispatch({type: COMMENT, note});
  }, []);

  const onConfirm = useCallback(() => {
    // cancelAccount()
    const {typeId, note} = state;
    console.log("Confirms delete => ", {typeId, note});
    setTimeout(() => {
      dispatch({type: OPEN_CONFIRM, confirm: false});
    }, 1500);
  }, [state]);

  const {typeId, reasons} = state;

  return (
    <View
      style={styles.root}>
      <Paragraph
        center
        size={14}>
        Вы можете&nbsp;
      </Paragraph>
      <TouchableOpacity onPress={() => toggleConfirm(true)}>
        <Paragraph
          color="#9bb2c3"
          center
          size={14}>
          удалить свой аккаунт
        </Paragraph>
      </TouchableOpacity>
      {Array.isArray(reasons) ? (
        <ConfirmModal
          onConfirm={onConfirm}
          type="account"
          visible={state.confirm}
          dismiss={() => toggleConfirm(false)}>
          <React.Fragment>
            {reasons.map((item, idx) => (
              <TouchableOpacity
                key={keyExtractor(item, idx)}
                onPress={() => setSelect(item?.id)}>
                <View style={styles.checkboxOption}>
                  <CheckboxIcon
                    checked={typeId === item?.id}
                    style={styles.checkboxIcon} />
                  <Paragraph
                    style={styles.checkTitle}
                    noMargin
                    size={15}>
                    {item.title}
                  </Paragraph>
                </View>
              </TouchableOpacity>
            ))}
            <TextInput
              onChangeText={onChangeText}
              style={styles.comment}
              multiline
              numberOfLines={5}
              placeholder="Комментарий..." />
          </React.Fragment>
        </ConfirmModal>
      ) : null}
    </View>
  );
}

export default React.memo(DeleteAccount);
