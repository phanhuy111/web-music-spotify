import React, { Component } from "react";
import { connect } from "react-redux";
import { getSong } from "../../store/action/songs";
import {
  playSong,
  getSongChoosen,
  changeSource,
} from "../../store/action/player";
import { addTrack } from "../../store/action/songs";
import Plus from "../../assets/images/plus.svg";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";
import { Container, SongList, Playlist } from "./styles";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: null,
      uri: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(getSong(this.props.token));
  }

  getPlaylistId = (playlistId) => {
    this.props.dispatch(
      addTrack(this.props.token, [this.state.uri], playlistId)
    );
  };

  getTrackUri = (uri) => {
    let URI = encodeURIComponent(uri);
    this.setState({
      uri: URI,
    });
  };

  modalPlaylist = () => {
    return (
      <Playlist>
        {this.props.playlists.items !== undefined &&
        this.props.playlists.items.length !== 0 &&
        this.props.token
          ? this.props.playlists.items.map((playlist) => {
              return (
                <li key={playlist.id}>
                  <img src={playlist.images[0].url} alt="" />
                  <span onClick={() => this.getPlaylistId(playlist.id)}>
                    {playlist.name}
                  </span>
                </li>
              );
            })
          : ""}
      </Playlist>
    );
  };

  msToTime = (duration) => {
    if (!duration) return null;

    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  playSongId = (song, index) => {
    this.props.dispatch(playSong(song.track));
    this.props.dispatch(getSongChoosen(index));
    this.props.dispatch(changeSource(song.track.preview_url));
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }
    const startSong =
      this.props.songs.items !== undefined &&
      this.props.songs.items.length !== 0
        ? this.props.songs.items[0]
        : "";
    return (
      <Container>
        <div>
          <div>
            <img
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt=""
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h1>{"Bài hát đã thích: 5"}</h1>
            <button onClick={() => this.playSongId(startSong, 0)}>
              {"Phát"}
            </button>
          </div>
        </div>
        <SongList>
          {this.props.songs.items !== undefined &&
          this.props.songs.items.length !== 0
            ? this.props.songs.items.map((song, index) => {
                // console.log(song);
                return (
                  <div
                    style={{ display: "inline-flex", margin: 10 }}
                    key={song.track.id}
                  >
                    <div
                      style={{ flex: 1 }}
                      onClick={() => this.playSongId(song, index)}
                    >
                      <h1
                        style={
                          this.props.indexSong === index
                            ? { color: "red", cursor: "pointer" }
                            : { color: "white", cursor: "pointer" }
                        }
                      >
                        {song.track.name}
                      </h1>
                      <h2
                        style={
                          this.props.indexSong === index
                            ? { color: "red" }
                            : { color: "white" }
                        }
                      >
                        {`${song.track.artists[0].name} - ${song.track.album.name}`}
                      </h2>
                    </div>
                    <div>
                      <span
                        style={
                          this.props.indexSong === index
                            ? { color: "red" }
                            : { color: "white" }
                        }
                      >
                        {this.msToTime(song.track.duration_ms)}
                      </span>
                    </div>
                    <Popup
                      modal
                      trigger={
                        <div className="heart_vote">
                          <img src={Plus} alt="Add Playlist" />
                        </div>
                      }
                      onOpen={() => this.getTrackUri(song.track.uri)}
                    >
                      {this.modalPlaylist()}
                    </Popup>
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
    playlists: state.playlists.playlist,
    songs: state.songs.songs,
    token: state.auth.access_token,
    indexSong: state.player.indexSong,
  };
};

export default connect(mapStateToProps)(Songs);
