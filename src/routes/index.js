import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home from "../pages/home";
import Playlist from "../pages/playlist";
import Albums from '../pages/albums'
import Songs from '../pages/songs'
import Artists from '../pages/artists'
import Profile from '../pages/profile'
import artistTrack from '../pages/artistTrack'
import albumTrack from '../pages/albumTrack'
import Search from '../pages/search'

const Routes = (props) => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/albums" component={Albums} />
      <Route path="/artists" component={Artists} />
      <Route path="/songs" component={Songs} />
      <Route path="/search" component={Search} />
      <Route path="/playlist/:id" component={Playlist} />
      <Route path="/artist/:id" component={artistTrack} />
      <Route path="/album/:id" component={albumTrack} />
    </Switch>
  )
};

const mapStateToProps = state => {
  return {
    token: state.auth.access_token,
  }
};

export default connect(
  mapStateToProps
)(Routes);
