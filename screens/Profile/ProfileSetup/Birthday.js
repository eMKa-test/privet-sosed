import memoize from "lodash/memoize";
import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import moment from "moment";
import Paragraph from "../../../components/text/Paragraph";
import DatePicker from "../../../components/actionSheets/Calendar";
import styles from "../../../components/auth/styles";

const formatDate = memoize((date) => {
  const d = moment(date);
  if (d.isValid()) {
    return d.format("DD MMMM YYYY");
  }
  return "Дата не указана";
});

function Birthday(props) {
  const {value, onChange} = props;
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const handleDate = React.useCallback((date) => {
    setPickerOpen(false);
    if (typeof date !== "undefined" && typeof onChange === "function") {
      onChange(date);
    }
  }, []);

  let initialDate = value;
  if (Number.isNaN(value.valueOf())) {
    initialDate = new Date(2014, 11, 29);
  }

  return (
    <React.Fragment>
      <Paragraph size={14}>Дата рождения</Paragraph>
      <TouchableOpacity onPress={() => setPickerOpen(true)}>
        <View style={styles.input}>
          <Paragraph
            size={14}>
            {formatDate(value)}
          </Paragraph>
        </View>
      </TouchableOpacity>
      <DatePicker
        initialDate={initialDate}
        open={pickerOpen}
        maxDate={new Date(2014, 11, 30)}
        dismiss={() => setPickerOpen(false)}
        onSelectDate={handleDate} />
    </React.Fragment>
  );
}

Birthday.propTypes = {
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func,
};

export default Birthday;
