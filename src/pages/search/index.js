import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { Redirect } from "react-router-dom";
import { Container, SongList, InputSearch } from "./styles";
import { isSearching } from "~/store/action/search";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.textInput = React.createRef();
  }

  onChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };
  // let str = e.target.value;
  // _.debounce(() => this.props.relay.setVariables({ query: str }), 500);
  // onChange = _.debounce((e) => {
  //   let value = e.target.value;
  //   this.setState({ searchText: value });
  // }, 1000);

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
          ref={this.textInput}
          placeholder="Search"
          name="search"
          value={this.state.searchText}
          onChange={(e) => this.onChange(e)}
          onKeyDown={this.onSubmit}
        />
        <SongList>
          {this.props.songs !== undefined &&
          Object.keys(this.props.songs).length !== 0
            ? this.props.songs.artists.items.map((a, i) => {
                return (
                  <div key={i} style={{ display: "flex", margin: 10 }}>
                    <h1 style={{ paddingRight: 200 }}>{a.name}</h1>
                    <h2>{`${a.followers.total} follower`}</h2>
                  </div>
                );
              })
            : "Nhap de tim kiem"}
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
