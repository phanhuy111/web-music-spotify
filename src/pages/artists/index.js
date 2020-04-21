import React, { Component } from "react";
import { getArtist, getArtistTrack } from '../../store/action/artists'
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom'

import { Container } from "./styles";

class Artists extends Component {
  constructor(props){
    super(props);
    this.state={
      artists: [],
    }
  }
  
  componentDidMount() {
    this.props.dispatch(getArtist(this.props.token));
  }

  getTrackTop =(id) =>{
    const { history } = this.props;
    this.props.dispatch(getArtistTrack(this.props.token, id))
    history.push(`/artist/${id}`);
  }

  render() {
    if (!this.props.token) {
      return <Redirect to='/' />
    }
    const { artists } = this.props
    return (
      <Container>
        { (artists.items !== undefined && artists.items.length !== 0) ? artists.items.map(artist=>{
            return(
              <div style={{textAlign: 'center', margin: 10}} key={artist.id}>
                <img src={artist.images[0].url} alt={artists.name}/>
                <div onClick={()=>this.getTrackTop(artist.id)}>
                  <h1>{artist.name}</h1>
                  <span>{` ${artist.followers.total} follower `}</span>
                </div>
              </div>
            )
        }).slice(2) : '' }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return{
    artists: state.artists.artists,
    token: state.auth.access_token,
  }
}

export default withRouter(connect(mapStateToProps)(Artists))


