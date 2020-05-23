import React, { Component } from "react";
import { connect } from "react-redux";
import { login, logout } from "~/store/action/auth";
import { removeLocal, setLocal } from "~/utils/auth";

import { Container, User, ButtonSpan, Text } from "./styles";
import queryString from "query-string";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let access_token = queryString.parse(window.location.search).access_token;
    if (access_token) window.localStorage.setItem("access_token", access_token);
    // if (access_token) setLocal("access_token", access_token);
    this.props.dispatch(login(access_token));
  }

  isLogin = async () => {
    window.location = "http://localhost:8888/login";
  };

  isLogout = () => {
    window.localStorage.removeItem("access_token");
    // removeLocal("access_token")
    this.props.dispatch(logout());
  };

  render() {
    return (
      <Container imgHeader>
        {!this.props.token ? (
          <User>
            <ButtonSpan onClick={() => this.isLogin()}>{"Login"}</ButtonSpan>
          </User>
        ) : (
          <User>
            <Text>{this.props.username}</Text>
            <ButtonSpan onClick={() => this.isLogout()}>{"Logout"}</ButtonSpan>
          </User>
        )}
      </Container>
    );
  }
}

// export default Header;
const mapStateToProps = (state) => {
  return {
    username: state.auth.user.display_name,
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps)(Header);
