import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {TouchableOpacity, View} from "react-native";
import {
  DELETE, UNMUTE, JOIN, MUTE, modalOptions,
} from "../helpers";
import DropdownActionSheet from "../../actionSheets/Dropdown";
import {roomActions} from "../../../store/actions/messagesActions";
import ConfirmModalContent from "../../modals/ConfirmModalContent";
import ConfirmModal from "../../modals/confirm";
import styles from "../styles";
import CheckboxIcon from "../../icons/checkbox";
import Paragraph from "../../text/Paragraph";

const initialConfirm = (action, room) => {
  const data = {
    clear: {
      title: "Удалить все сообщения",
      contentText: `Вы действительно хотите удалить всю переписку с данной беседой?
            \nОтменить это действие будет невозможно.`,
    },
    leave: {
      title: "Выйти из беседы",
      contentText: "Покинув беседу, Вы не будете получать новые сообщения от участников.",
    },
    delete: {
      title: "Удаление беседы",
      contentText: `Вы действительно хотите удалить беседу?
            \nОтменить это действие будет невозможно.`,
    },
  };
  return {
    id: room.id,
    action,
    ...data[action],
  };
};

function RoomModal({item, dismissRoomMenu, modalsActions}) {
  const [confirm, openConfirm] = React.useState(null);
  const [delRoom, setDellRoom] = React.useState(false);
  const onSelectHandler = ({action}) => {
    if (![UNMUTE, MUTE, JOIN].includes(action)) {
      dismissRoomMenu(null);
      setTimeout(() => {
        openConfirm(initialConfirm(action, item?.room));
      }, 40);
    } else {
      modalsActions({id: item?.room?.id, mode: action});
      dismissRoomMenu(null);
    }
  };

  const dismissConfirm = React.useCallback(() => {
    dismissRoomMenu(null);
    openConfirm(null);
  }, []);

  const handleConfirmDelete = () => {
    let {id, action: mode} = confirm;
    if (delRoom) {
      mode = DELETE;
    }
    modalsActions({id, mode});
    openConfirm(null);
  };

  return (
    <React.Fragment>
      <DropdownActionSheet
        open={Boolean(item)}
        dismiss={() => dismissRoomMenu(null)}
        options={modalOptions(
                    // eslint-disable-next-line camelcase
                    item?.is_muted,
                    // eslint-disable-next-line camelcase
                    item?.can_leave,
                    // eslint-disable-next-line camelcase
                    item?.can_delete,
                    // eslint-disable-next-line camelcase
                    item?.can_join,
                    item?.room?.type,
        )}
        onSelect={onSelectHandler} />
      <ConfirmModal
        visible={Boolean(confirm)}
        dismiss={dismissConfirm}
        onConfirm={handleConfirmDelete}
        title={confirm?.title}>
        <React.Fragment>
          <ConfirmModalContent
            headerActionText={confirm?.contentText} />
          {confirm?.action === "leave" && (
            <TouchableOpacity
              onPress={() => setDellRoom(!delRoom)}>
              <View style={styles.configRow}>
                <CheckboxIcon
                  squared
                  checked={delRoom} />
                <Paragraph
                  size={18}
                  style={styles.configRowLabel}>
                  Удалить беседу
                </Paragraph>
              </View>
            </TouchableOpacity>
                    )}
        </React.Fragment>
      </ConfirmModal>
    </React.Fragment>
  );
}

RoomModal.propTypes = {
  item: PropTypes.shape({
    is_muted: PropTypes.bool,
  }),
  dismissRoomMenu: PropTypes.func.isRequired,
  modalsActions: PropTypes.func.isRequired,
};

export default connect(null, {modalsActions: roomActions})(React.memo(RoomModal));
