import React, { Component } from "react";
// import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { Container, Header, SongList } from "./styles";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  msToTime = (duration) => {
    if (!duration) return null;

    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  render() {
    return (
      <Container>
        {this.props.playlists !== undefined &&
        Object.keys(this.props.playlists).length !== 0 ? (
          <Header>
            <img src={this.props.playlists.images[0].url} alt="minhhuy" />
            <div>
              <h1>{this.props.playlists.name}</h1>
              <h3>{this.props.playlists.owner.display_name}</h3>
              <button type="button">PLAY</button>
            </div>
          </Header>
        ) : (
          ""
        )}
        <SongList>
          {this.props.playlistTrack !== undefined
            ? this.props.playlistTrack.items.map((song, index) => {
                return (
                  <div
                    style={{ display: "inline-flex", margin: 10 }}
                    key={index}
                  >
                    <div style={{ flex: 1 }}>
                      <h1>{song.track.name}</h1>
                      <h2>{song.track.artists[0].name}</h2>
                    </div>
                    <div>
                      <span>{this.msToTime(song.track.duration_ms)}</span>
                    </div>
                  </div>
                );
              })
            : ""}
        </SongList>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
    playlists: state.playlists.playlistTrack,
    playlistTrack: state.playlists.playlistTrack.tracks,
  };
};

export default connect(mapStateToProps, null)(Playlist);
