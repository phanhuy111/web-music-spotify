import React, { Component } from "react";
import { getAlbum, getAlbumTrack } from "~/store/action/albums";
import { connect } from "react-redux";
import { Container } from "./styles";
import { Redirect } from "react-router-dom";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getAlbum(this.props.token));
  }

  getTrackTop = (id) => {
    const { history } = this.props;
    this.props.dispatch(getAlbumTrack(this.props.token, id));
    history.push(`/album/${id}`);
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        {this.props.albums.items !== undefined
          ? this.props.albums.items.map((e) => {
              return (
                <div onClick={() => this.getTrackTop(e.album.id)}>
                  <img src={e.album.images[0].url} alt="" />
                  <h1>{e.album.name}</h1>
                </div>
              );
            })
          : ""}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.albums.albums,
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(Album);
