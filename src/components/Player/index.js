import React, { Fragment, Component } from 'react';
import Slider from 'rc-slider';

import { updateVolume, pauseSong, getSongChoosen, resumeSong, increaseSongTime } from '../../store/action/player'
import { connect } from 'react-redux';

import {
  Container, 
  Current, Volume, Progress, Controls, Time, ProgressSlider,
} from './styles';

import VolumeIcon from '../../assets/images/volume.svg';
import SuffleIcon from '../../assets/images/shuffle.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import PlayIcon from '../../assets/images/play.svg';
import PauseIcon from '../../assets/images/pause.svg';
import ForwardIcon from '../../assets/images/forward.svg';
import RepeatIcon from '../../assets/images/repeat.svg';


class Player extends Component {
  constructor(props){
    super(props);
    this.state= {
        songs: [],
        indexSong: null
    }
    this.audioPlayer = new Audio()
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.song !=== this.props.song) {
  //     this.audio.src = this.state.songs[nextProps.song];
  //     this.audio.play();
  //   }
  // }
  
  componentDidUpdate (prevProps){
    // console.log(prevProps.indexSong)
    // console.log(this.props.indexSong)   
    if(prevProps.songs !== this.props.songs){
       this.setState({
         songs: this.props.songs.items,
       })
    }
    if(prevProps.indexSong !== this.props.indexSong){
        this.setState({
          indexSong: this.props.indexSong
        })
    }
  }

  playTrack = (song, index) => {  // chưa gọi lấy lol gì ra // chưa xử lí xong
      let id = index ? index : this.props.indexSong;
      let url = song ? song.track.preview_url : '';
      this.audioPlayer.src = this.props.sourceAudio === url ? url : this.props.sourceAudio;
      if (!this.props.songPaused) {
        if(this.props.indexSong !== id){
          this.props.dispatch(getSongChoosen(song.track.id,id))
          this.audioPlayer.play()
        }
        this.audioPlayer.play()
      }  
  }
  
  stopTrack = () => {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
  };
  
  pauseTrack = () => {
    this.audioPlayer.pause();
    this.props.dispatch(pauseSong());
  };

  resumeSong = () => {
    this.props.dispatch(resumeSong());
  }

  timeProgress = ()=> {
    if(this.props.songPlaying){
      this.props.dispatch(increaseSongTime())
    }
    
  }

  nextSong = () => {
    // console.log(this.state.songs.length)
    // console.log(typeof(this.props.indexSong))
    let currentIndex = this.props.indexSong;
    // const huy = this.props.indexSong === (this.state.songs.length - 1) ? 'hi' : 'hu'
    // console.log(huy)
    currentIndex === 4 ? this.playTrack(this.state.songs[0], 0) : this.playTrack(this.state.songs[currentIndex + 1], currentIndex + 1);
  }
  
  prevSong = () => {
    let currentIndex = this.props.indexSong;
    currentIndex === 0 ? this.playTrack(this.state.songs[this.state.songs.length - 1], this.state.songs.length - 1) : this.playTrack(this.state.songs[currentIndex - 1], currentIndex - 1);
  }

  msToTime = (duration) => {
    if (duration === 0) return '00:00'
    if (!duration) return null;
    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  render(){
    const { token } = this.props;
    return(
      <div style={{ margin: 10}}>
      {token ? (
        <Container>  
          <Current>
             <Fragment>
               <img src={this.props.imgSong} alt='' />
               <div>
                 <span>{this.props.nameSong}</span>
                 <small>{this.props.artistSong}</small>
               </div>
             </Fragment>
          </Current>
          <Progress>
           <Controls>
             <button type="button">
               <img src={SuffleIcon} alt="Shuffle" />
             </button>
             <button type="button" onClick={()=> this.prevSong()}>
               <img src={BackwardIcon} alt="Backward" />
             </button>
             {
                !this.props.songPaused ?
                  (
                    <button type="button" onClick={()=> this.pauseTrack()}>
                        <img src={PauseIcon} alt="Pause" />
                    </button>
                  ) : (
                    <button type="button" onClick={()=> this.resumeSong()}>
                        <img src={PlayIcon} alt="Play" />
                    </button>
                  )
             }
             <button type="button" onClick={()=> this.nextSong()}>
               <img src={ForwardIcon} alt="Forward" />
             </button>
             <button type="button">
               <img src={RepeatIcon} alt="Repeat" />
             </button>
            </Controls>

            <Time>
             <ProgressSlider>
               <Slider
                 railStyle={{ background: '#404040', borderRadius: 10 }}
                 trackStyle={{ background: '#1ED760' }}
                 handleStyle={{ border: 0 }}
                 value={(this.props.timeElapsed/this.props.progress)*100}
              />
             </ProgressSlider>
             <span>{  this.msToTime(this.props.progress)}</span>
            </Time>
          </Progress>
          <Volume>
            <img src={VolumeIcon} alt="Volume" />
            <Slider
              railStyle={{ background: '#404040', borderRadius: 10 }}
              trackStyle={{ background: '#FFF' }}
              handleStyle={{ display: 'none' }}
              value={this.props.volume}
              onChange={(value) => this.props.dispatch(updateVolume(value))}
            />
            </Volume>
            {this.playTrack()}
          </Container>
        ) : null}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    songs: state.songs.songs,
    token: state.auth.access_token,
    volume: state.player.volume,
    sourceAudio: state.player.songDetails ? state.player.songDetails.preview_url : null,
    songPlaying: state.player.songPlaying,
    songPaused: state.player.songPaused,
    progress: state.player.songDetails ? state.player.songDetails.duration_ms : 0,
    nameSong: state.player.songDetails ? state.player.songDetails.name : '',
    artistSong: state.player.songDetails ? state.player.songDetails.artists[0].name : '',
    imgSong: state.player.songDetails ? state.player.songDetails.album.images[0].url : null,
    indexSong: state.player.indexSong ? state.player.indexSong : null,
    timeElapsed: state.player.timeElapsed,
  }
}

export default connect(
  mapStateToProps,
)(Player)


