import React, { Component } from "react";
import { connect } from "react-redux";
import { getSong } from '../../store/action/songs'
import { playSong, getSongChoosen } from '../../store/action/player'

import { Redirect } from 'react-router-dom'
import { Container, SongList } from "./styles";

class Songs extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  
  componentDidMount() {
    this.props.dispatch(getSong(this.props.token));
  }

  msToTime = (duration) => {
    if (!duration) return null;
  
    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  
    seconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${minutes}:${seconds}`;
  }

  playSongId = (song, index) =>{
     this.props.dispatch(playSong(song.track))
     this.props.dispatch(getSongChoosen(song.track.id, index))
  }

  render() {
    if (!this.props.token) {
      return <Redirect to='/' />
    }
    return (
      <Container>
          <div>
            <div>
              <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt='' />
            </div>
            <div style={{ textAlign: 'center'}}>
              <h1>
                {'Bài hát đã thích: 5'}
              </h1>
              <button>
                {'Phát'}
              </button>
            </div>
          </div> 
          <SongList>
        { (this.props.songs.items !== undefined && this.props.songs.items.length !== 0) ? this.props.songs.items.map((song, index)=>{
          return(
            <div style={{ display: 'inline-flex' , margin: 10}} key={song.track.id}>
              <div style={{flex:1}} onClick={()=> this.playSongId(song, index)}>
                <h1 style={this.props.songChoosenId === song.track.id ? {color: 'red',cursor: 'pointer'} : {color: 'white' ,cursor: 'pointer'}}>
                    {song.track.name}
                </h1>
                <h2 style={this.props.songChoosenId === song.track.id ? {color: 'red'} : {color: 'white'}}>
                  {`${song.track.artists[0].name} - ${song.track.album.name}`}
                </h2>
              </div>
              <div>
                <span style={this.props.songChoosenId === song.track.id ? {color: 'red'} : {color: 'white'}}>
                  {this.msToTime(song.track.duration_ms)}
                </span>
              </div>
            </div>
          )
        }) : ''}
        </SongList>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return{
    songs: state.songs.songs,
    token: state.auth.access_token,
    songChoosenId: state.player.songChoosen
  }
}

export default connect(
  mapStateToProps,
)(Songs);


