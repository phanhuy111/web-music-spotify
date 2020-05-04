import React, { Component } from "react";

import { connect } from "react-redux";
import { getGener, getFeature, getRelease } from "../../store/action/browse";
// import moduleName from '../../store'

import { Container, ContainerAuth, Title } from "./styles";

const browse = [
  {
    id: 1,
    img: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
  },
  {
    id: 2,
    img: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
  },
  {
    id: 3,
    img: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
  },
  {
    id: 4,
    img: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
  },
  {
    id: 5,
    img: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.token !== this.props.token) {
      // await this.props.dispatch(getGener(this.props.token));
      // await this.props.dispatch(getFeature(this.props.token));
      // await this.props.dispatch(getRelease(this.props.token));
    }
  };

  componentDidMount() {
    // console.log(this.state.token)
  }

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
            {browse.map((e) => {
              return (
                <div key={e.id}>
                  <img style={{ width: 200 }} src={e.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Title>{"NEW RELEASES"}</Title>
        </div>
        <div>
          <Title>{"FEATURED"}</Title>
        </div>
      </ContainerAuth>
    );
  };

  render() {
    return this.props.token ? this.ScreenAuth() : this.ScreenNoAuth();
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps)(Home);
