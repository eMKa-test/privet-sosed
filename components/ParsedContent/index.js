import React, {Fragment, useState} from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import {idProp} from "../../lib/utils";
import Html from "./Html";
import Paragraph from "../text/Paragraph";
import {HASHTAG_COLOR} from "../../constants/Colors";

function ParsedContent(props) {
  const {html, html_tail} = props?.data;
  const [openTail, setOpenTail] = useState(false);
  const htmlTail = html_tail ? html + html_tail : html;

  if (html && typeof html === "string") {
    return (
      <View>
        {!openTail ? (
          <Fragment>
            <Html html={html} />
            {html_tail ? (
              <TouchableOpacity
                onPress={() => setOpenTail(true)}>
                <Paragraph
                  medium
                  size={16}
                  color={HASHTAG_COLOR}>
                  Показать полностью...
                </Paragraph>
              </TouchableOpacity>
            ) : null}
          </Fragment>
        ) : <Html html={htmlTail} />}
      </View>
    );
  }
  return null;
}

ParsedContent.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(ParsedContent);
