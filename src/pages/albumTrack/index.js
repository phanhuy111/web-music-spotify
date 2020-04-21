import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from 'react-router-dom'
import { Container, SongList } from "./styles";

class AlbumTrack extends Component {
  constructor(props){
    super(props);
    this.state= {
      
    }
  }
  
  componentDidMount() {

  }

  msToTime = (duration) => {
    if (!duration) return null;
  
    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  
    seconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${minutes}:${seconds}`;
  }

  render() {
    if (!this.props.token) {
      return <Redirect to='/' />
    }
    const number = (this.props.albumTrack !== undefined) ? this.props.albumTrack.items.length : 0;
    return (
      <Container>
         <div>
            <div>
              <img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt='' />
            </div>
            <div style={{ textAlign: 'center'}}>
              <h1>
                {`Bài hát đã thích: ${number}`}
              </h1>
              <button>
                {'Phát'}
              </button>
            </div>
          </div> 
          <SongList>
        { (this.props.albumTrack !== undefined && this.props.albumTrack.items.length !== 0) ? this.props.albumTrack.items.map((song, index)=>{
          return(
            <div style={{ display: 'inline-flex' , margin: 10}} key={index}>
              <div style={{flex:1}} >
                <h1>
                    {song.name}
                </h1>
                <h2>
                  {`${song.artists[0].name}`}
                </h2>
              </div>
              <div>
                <span>
                  {this.msToTime(song.duration_ms)}
                </span>
              </div>
            </div>
          )
        }).slice(2) : ''}
        </SongList>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.albums.albumTrack.tracks)
  return{
    token: state.auth.access_token,
    albumTrack: state.albums.albumTrack.tracks,
  }
}

export default connect(
  mapStateToProps,
)(AlbumTrack);


