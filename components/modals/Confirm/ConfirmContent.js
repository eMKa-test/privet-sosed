import React from "react";
import PropTypes from "prop-types";
import {TextInput, View} from "react-native";
import Paragraph from "../../text/Paragraph";
import styles from "./styles";

const contentType = {
  clear: {
    headerText: "Вы действительно хотите удалить всю переписку с данной беседой?",
    footerText: "Отменить это действие будет невозможно.",
  },
  leave: {
    headerText: "Покинув беседу, Вы не будете получать новые сообщения от участников.",
  },
  delete: {
    headerText: "Вы действительно хотите удалить беседу?",
    footerText: "Отменить это действие будет невозможно.",
  },
  link: {
    headerText: "Ссылка на видео",
    passiveText: "Вы можете указать ссылку на страницу видеозаписи на таких сайтах, как Youtube, Rutube, Vimeo, ВКонтакте, Яндекс и др.",
  },
  account: {
    headerText: "Пожалуйста, укажите причину удаления Вашей страницы",
  },
};

function ConfirmMessagesContent(props) {
  const {
    type, setText, text, exception,
  } = props;

  return (
    <View style={styles.root}>
      <Paragraph
        style={styles.headerText}
        size={17}>
        {contentType[type].headerText}
      </Paragraph>
      {contentType[type].footerText ? (
        <Paragraph
          style={styles.footerText}
          size={17}>
          {contentType[type].footerText}
        </Paragraph>
      ) : null}
      {type === "link" ? (
        <React.Fragment>
          <TextInput
            placeholderTextColor="#333"
            placeholder="https://"
            style={[styles.linkInput, exception && styles.exceptionInput]}
            defaultValue={text}
            onChangeText={setText} />
          {exception ? (
            <Paragraph
              noMargin
              size={14}
              style={styles.exceptionText}
              color="#FF0000">
              {exception}
            </Paragraph>
          ) : null}
          <Paragraph
            color="#8D8D8D"
            style={styles.passiveText}
            size={15}>
            {contentType[type].passiveText}
          </Paragraph>
        </React.Fragment>
      ) : null}
    </View>
  );
}

ConfirmMessagesContent.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  setText: PropTypes.func,
  exception: PropTypes.string,
};

export default React.memo(ConfirmMessagesContent);
