import React from "react";
import * as PropTypes from "prop-types";
import {Image, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import isEmpty from "lodash/isEmpty";
import {userInfoStyles} from "./styles";
import {imageSource} from "../../lib/utils";
import Paragraph from "../../components/text/Paragraph";
import {getMyAccount} from "../../store/actions/accountActions";

function UserInfo(props) {
  const {account, getMyAcc} = props;

  React.useEffect(() => {
    if (isEmpty(account) && typeof getMyAcc === "function") {
      getMyAcc();
    }
  }, []);

  return (
    <View style={userInfoStyles.root}>
      <Image
        style={userInfoStyles.avatar}
        source={imageSource(account?.avatar)} />
      {account?.title ? (
        <Paragraph
          noMargin
          size={18}
          medium>
          {account.title}
        </Paragraph>
            ) : null}
    </View>
  );
}

UserInfo.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avatar: PropTypes.string,
    title: PropTypes.string,
  }),
  getMyAcc: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMyAcc: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(UserInfo));
