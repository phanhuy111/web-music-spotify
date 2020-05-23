import React, { Component } from "react";
// import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Container, Profiles, AccountImage } from "./styles";

class Profile extends Component {
  state = {
    user: [],
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }
    const { user } = this.props;
    return (
      <Container>
        <h1>Tổng Quan về người dùng</h1>
        <div style={{ display: "flex", margin: 30 }}>
          <AccountImage
            src="data:image/png;base64,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"
            alt=""
          />
          <Profiles>
            <div>
              <h1>ID người dùng</h1>
              <span>{user.id}</span>
            </div>
            <div>
              <h1>Tên người dùng</h1>
              <span>{user.display_name}</span>
            </div>
            <div>
              <h1>Email</h1>
              <span>{user.email}</span>
            </div>
            <div>
              <h1>Quốc gia</h1>
              <span>{user.country}</span>
            </div>
          </Profiles>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(Profile);
