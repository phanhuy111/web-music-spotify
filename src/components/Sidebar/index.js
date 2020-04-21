import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { Container, NewPlayList, Nav, Modal } from './styles';
import Popup from "reactjs-popup";

import Loading from '../Loading';
import AddPlaylistIcon from '../../assets/images/add_playlist.svg';

import { getPlaylist, getPlaylistTrack, createPlaylist } from '../../store/action/playlists'

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      onOpen:false,
      name: '',
      description: '',
      onPublic: false
    }
  }

  componentDidUpdate(prevProps){
    // console.log('before',prevProps)
    // console.log('after', this.props)
    if (prevProps.token === this.props.token) {
      if(prevProps.id !== this.props.id){
          this.props.dispatch(getPlaylist(this.props.token, this.props.id));
        }
      }
  }

  getTrackTop =(id) => {
    const { history } = this.props;
    this.props.dispatch(getPlaylistTrack(this.props.token, id))
    history.push(`/playlist/${id}`);
  }


  modalInput = () =>{
    return(
      <Modal>
        <h1> {'Create Playlist'} </h1>
        <input 
          name="name"
          placeholder='Name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input 
          name="description"
          placeholder='Description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button onClick={()=> this.createPlaylist()}>
          {'Create'}
        </button>
      </Modal>
    )
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  createPlaylist = ()=> {
    const {name, description, onPublic} = this.state
    this.props.dispatch(createPlaylist(
      this.props.token,
      {name, description, public: onPublic},
      this.props.id
    ))
    this.props.dispatch(getPlaylist(this.props.token, this.props.id));
  }

  render() {
    return (
      <Container>
        <div>
          <Nav>
            <img
              style={{width: 100}} 
              src='https://1.bp.blogspot.com/-xtFG2HxsdKc/XHkuICL5ePI/AAAAAAAAIPs/-FBy2Apa3qUxBF1WNOzB_dF4_KUuLJrygCK4BGAYYCw/s1600/spotify%2Bicon%2B.png'
              alt=''
            />
          </Nav>
          <Nav>         
            <li>
            <span>{'MAIN'}</span>
            </li>
            <li>
              <Link to="/">{'Home'}</Link>
            </li>
            <li>
              <Link to="/profile">{'Profile'}</Link>
            </li>
            <li>
              <Link to="/search">{'Search'}</Link>
            </li>
          </Nav>
          <Nav>
         
         <li>
         <span>{'YOUR MUSIC'}</span>
         </li>
         <li>
           <Link to="/songs">{'Songs'}</Link>
         </li>
         <li>
           <Link to="/albums">{'Albums'}</Link>
         </li>
         <li>
           <Link to="/artists">{'Artists'}</Link>
         </li>
       </Nav>
          <Nav>
            <li>
              <span>{'PLAYLISTS'}</span>
              { !this.props.playlists.items ? <Loading /> : null }
            </li>
              {(this.props.playlists.items !== undefined && this.props.playlists.items.length !== 0 && this.props.token) ? this.props.playlists.items.map(playlist => (
                <li key={playlist.id}>
                  <span onClick={()=> this.getTrackTop(playlist.id)}>{playlist.name}</span>
                </li>
              )) : ''}
          </Nav>
        </div>

        <Popup modal trigger={
          <NewPlayList>
            <img src={AddPlaylistIcon} alt="Adicionar Playlist" />
            Add playlist
          </NewPlayList>
        }>
            {this.modalInput()}
        </Popup>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.playlists.playlist,
    id: state.auth.id,
    token: state.auth.access_token,
    isSearching: state.search.isSearch
  }
}

export default withRouter(connect(
  mapStateToProps
)(Sidebar))
