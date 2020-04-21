import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import { Container, SongList, InputSearch } from "./styles";
import { isSearching } from "../../store/action/search";

const artists = [
  {
    followers: {
      total: 34317023,
    },
    genres: ["pop"],
    href: "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
    id: "1uNFoZAHBGtllmzznpCI3s",
    name: "Justin Bieber1",
    popularity: 95,
    type: "artist",
    uri: "spotify:artist:1uNFoZAHBGtllmzznpCI3s",
  },
  {
    followers: {
      total: 34317023,
    },
    genres: ["pop"],
    href: "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
    id: "1uNFoZAHBGtllmzznpCI3s",
    name: "Justin Bieber2",
    popularity: 95,
    type: "artist",
    uri: "spotify:artist:1uNFoZAHBGtllmzznpCI3s",
  },
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  onChange = (e) => {
    //window.location.pathname
    this.setState({
      searchText: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.dispatch(isSearching(this.state.searchText, this.props.token));
      this.setState({
        searchText: "",
      });
    }
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <InputSearch
          placeholder="Search"
          name="search"
          value={this.state.searchText}
          onChange={(e) => this.onChange(e)}
          onKeyDown={this.onSubmit}
        />
        <SongList>
          {artists.map((a, i) => {
            return (
              <div key={i} style={{ display: "flex", margin: 10 }}>
                <h1 style={{ paddingRight: 200 }}>{a.name}</h1>
                <h2>{`${a.followers.total} follower`}</h2>
              </div>
            );
          })}
        </SongList>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
    songs: state.search.songResult,
  };
};

export default connect(mapStateToProps)(Search);
