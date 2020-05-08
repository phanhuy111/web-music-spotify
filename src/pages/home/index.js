import React, { Component } from "react";

import { connect } from "react-redux";
import { getGener, getFeature, getRelease } from "../../store/action/browse";

import { Container, ContainerAuth, Title } from "./styles";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.token !== this.props.token) {
      await this.props.dispatch(getGener(this.props.token));
      await this.props.dispatch(getFeature(this.props.token));
      await this.props.dispatch(getRelease(this.props.token));
    }
  };

  componentDidMount() {}

  ScreenNoAuth = () => {
    return <Container></Container>;
  };

  ScreenAuth = () => {
    return (
      <ContainerAuth>
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <Title>{"GENRES"}</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {this.props.geners !== undefined
              ? this.props.geners.items.map((e) => {
                  return (
                    <div key={e.id}>
                      <img style={{ width: 200 }} src={e.icons[0].url} alt="" />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div>
          <Title>{"NEW RELEASES"}</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {this.props.release !== undefined
              ? this.props.release.items.map((e) => {
                  return (
                    <div key={e.id}>
                      <img
                        style={{ width: 200 }}
                        src={e.images[1].url}
                        alt=""
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div>
          <Title>{"FEATURED"}</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {this.props.feature !== undefined
              ? this.props.feature.items.map((e) => {
                  // console.log(e);
                  return (
                    <div key={e.id}>
                      <img
                        style={{ width: 200 }}
                        src={e.images[0].url}
                        alt=""
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </ContainerAuth>
    );
  };

  render() {
    // console.log(this.props.geners !== undefined ? this.props.geners.items : "");

    return this.props.token ? this.ScreenAuth() : this.ScreenNoAuth();
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
    geners: state.browse.gener.categories,
    feature: state.browse.feature.playlists,
    release: state.browse.release.albums,
  };
};

export default connect(mapStateToProps)(Home);
