import React, { Fragment, Component } from "react";
import Slider from "rc-slider";

import {
  updateVolume,
  pauseSong,
  getSongChoosen,
  resumeSong,
  playSong,
  increaseSongTime,
  changeSource,
  resetTime,
} from "~/store/action/player";

import { connect } from "react-redux";

import {
  Container,
  Current,
  Volume,
  Progress,
  Controls,
  Time,
  ProgressSlider,
} from "./styles";

import VolumeIcon from "~/assets/images/volume.svg";
import SuffleIcon from "~/assets/images/shuffle.svg";
import BackwardIcon from "~/assets/images/backward.svg";
import PlayIcon from "~/assets/images/play.svg";
import PauseIcon from "~/assets/images/pause.svg";
import ForwardIcon from "~/assets/images/forward.svg";
import RepeatIcon from "~/assets/images/repeat.svg";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      indexSong: null,
      songResume: false,
      timeElapsed: this.props.timeElapsed,
    };
    this.audioPlayer = new Audio();
  }

  componentDidMount() {
    this.setState({
      songs: this.props.songs.items,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.songs !== this.props.songs) {
      this.setState({
        songs: this.props.songs.items,
      });
    }
    if (prevProps.indexSong !== this.props.indexSong) {
      this.setState({
        indexSong: this.props.indexSong,
      });
      this.props.dispatch(resetTime());
    }
    if (prevProps.timeElapsed !== this.props.timeElapsed) {
      this.setState({
        timeElapsed: this.props.timeElapsed,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.songPaused &&
      nextProps.songPlaying &&
      nextProps.timeElapsed === 0
    ) {
      clearInterval(this.state.intervalId);
      const intervalId = setInterval(() => this.calculateTime(), 1000);
      this.setState({
        intervalId,
      });
    }
    if (nextProps.songPaused) {
      clearInterval(this.state.intervalId);
    }
  }

  calculateTime() {
    if (this.state.timeElapsed === 30) {
      clearInterval(this.state.intervalId);
      this.pauseTrack();
    }
    this.setState(
      {
        timeElapsed: this.state.timeElapsed + 1,
      },
      () => this.props.dispatch(increaseSongTime(this.state.timeElapsed))
    );
  }

  changeTrack = (index) => {
    if (this.props.songPaused && this.props.songResume) {
      this.props.dispatch(getSongChoosen(index));
      this.props.dispatch(
        changeSource(this.state.songs[index].track.preview_url)
      );
    }
  };

  playTrack = (index) => {
    this.changeTrack(index);
    if (!this.props.songPaused) {
      if (this.state.timeElapsed === 0) {
        this.audioPlayer.src = this.props.source ? this.props.source : "";
        this.props.dispatch(getSongChoosen(index));
        this.props.dispatch(
          changeSource(this.state.songs[index].track.preview_url)
        );
        this.props.dispatch(playSong(this.state.songs[index].track));
      } else {
        this.props.dispatch(getSongChoosen(index));
        this.props.dispatch(
          changeSource(this.state.songs[index].track.preview_url)
        );
      }
      this.audioPlayer.play().catch((e) => console.log(e));
    }
  };

  pauseTrack = () => {
    this.audioPlayer.pause();
    this.props.dispatch(pauseSong());
  };

  resumeSong = () => {
    // console.log("resumesong");
    this.props.dispatch(resumeSong());
  };

  nextSong = () => {
    let currentIndex = this.props.indexSong;
    currentIndex === 4 ? this.playTrack(0) : this.playTrack(currentIndex + 1);
  };

  prevSong = () => {
    let currentIndex = this.props.indexSong;
    currentIndex === 0 ? this.playTrack(0) : this.playTrack(currentIndex - 1);
  };

  msToTime = (duration) => {
    if (duration === 0) return "00:00";
    if (!duration) return null;
    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  };

  render() {
    // console.log(this.props);
    const { token, indexSong } = this.props;
    const time = Math.ceil((this.state.timeElapsed / 30) * 100);
    return (
      <div style={{ margin: 10 }}>
        {token ? (
          <Container>
            <Current>
              {this.props.songDetails !== undefined &&
              Object.keys(this.props.songDetails).length !== 0 ? (
                <Fragment>
                  <img
                    src={this.props.songDetails.album.images[0].url}
                    alt=""
                  />
                  <div>
                    <span>{this.props.songDetails.name}</span>
                    <small>{this.props.songDetails.artists[0].name}</small>
                  </div>
                </Fragment>
              ) : (
                ""
              )}
            </Current>
            <Progress>
              <Controls>
                <button type="button">
                  <img src={SuffleIcon} alt="Shuffle" />
                </button>
                <button type="button" onClick={() => this.prevSong()}>
                  <img src={BackwardIcon} alt="Backward" />
                </button>
                {!this.props.songPaused ? (
                  <button type="button" onClick={() => this.pauseTrack()}>
                    <img src={PauseIcon} alt="Pause" />
                  </button>
                ) : (
                  <button type="button" onClick={() => this.resumeSong()}>
                    <img src={PlayIcon} alt="Play" />
                  </button>
                )}
                <button type="button" onClick={() => this.nextSong()}>
                  <img src={ForwardIcon} alt="Forward" />
                </button>
                <button type="button">
                  <img src={RepeatIcon} alt="Repeat" />
                </button>
              </Controls>

              <Time>
                <ProgressSlider>
                  <Slider
                    railStyle={{ background: "#404040", borderRadius: 10 }}
                    trackStyle={{ background: "#1ED760" }}
                    handleStyle={{ border: 0 }}
                    value={time}
                  />
                </ProgressSlider>
                <span>{this.msToTime(this.props.progress)}</span>
              </Time>
            </Progress>
            <Volume>
              <img src={VolumeIcon} alt="Volume" />
              <Slider
                railStyle={{ background: "#404040", borderRadius: 10 }}
                trackStyle={{ background: "#FFF" }}
                handleStyle={{ display: "none" }}
                value={this.props.volume}
                onChange={(value) => this.props.dispatch(updateVolume(value))}
              />
            </Volume>
            {this.playTrack(indexSong)}
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
    token: state.auth.access_token,
    volume: state.player.volume,
    source: state.player.source,
    songPlaying: state.player.songPlaying,
    songPaused: state.player.songPaused,
    songResume: state.player.songResume,
    progress: state.player.songDetails
      ? state.player.songDetails.duration_ms
      : 0,
    // songPaused: state.player.songPaused,
    songDetails: state.player.songDetails ? state.player.songDetails : {},
    indexSong: state.player.indexSong ? state.player.indexSong : 0,
    timeElapsed: state.player.timeElapsed,
  };
};

export default connect(mapStateToProps)(Player);
