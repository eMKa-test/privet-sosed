import React from "react";
import memoize from "lodash/memoize";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity} from "react-native";
import ConfirmModal from "../../../../components/modals/confirm";
import ConfirmModalContent from "../../../../components/modals/ConfirmModalContent";
import {declinationWord} from "../../../../lib/utils";
import styles from "../../styles";
import CheckboxIcon from "../../../../components/icons/checkbox";
import Paragraph from "../../../../components/text/Paragraph";

const usersCountGroup = ["сообщение", "сообщения", "сообщений"];
const confirmContext = memoize((len) => {
  return `Вы действительно хотите удалить ${declinationWord(len, usersCountGroup)}?`;
});

function DeleteConfirm(props) {
  const {
    open, dismiss, onConfirm, selectedLen, canDeleteAll,
  } = props;
  const [forAll, setForAll] = React.useState(false);

  const _onConfirm = React.useCallback(() => {
    onConfirm(forAll);
    setForAll(false);
  }, [forAll, selectedLen]);

  const _deleteAll = React.useCallback(() => {
    setForAll(!forAll);
  }, [forAll]);

  return (
    <ConfirmModal
      visible={open}
      dismiss={dismiss}
      onConfirm={_onConfirm}
      title="Подтверждение удаления">
      <React.Fragment>
        <ConfirmModalContent headerActionText={confirmContext(selectedLen)} />
        {canDeleteAll ? (
          <TouchableOpacity onPress={_deleteAll}>
            <View style={styles.configRow}>
              <CheckboxIcon
                squared
                checked={forAll} />
              <Paragraph
                size={18}
                style={styles.configRowLabel}>
                Удалить у всех
              </Paragraph>
            </View>
          </TouchableOpacity>
        ) : null}
      </React.Fragment>
    </ConfirmModal>
  );
}

DeleteConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  selectedLen: PropTypes.number.isRequired,
  canDeleteAll: PropTypes.bool.isRequired,
};

export default React.memo(DeleteConfirm);
