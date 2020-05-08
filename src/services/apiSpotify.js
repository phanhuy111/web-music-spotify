import axios from "axios";

// const api = axios.create({ baseURL: "https://api.spotify.com/v1" });
const apiCors = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1",
});

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
};

export default {
  checkAccessToken(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get("/me", { headers });
  },
  // playlist
  getPlaylists(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/users/${id}/playlists`, { headers });
  },
  getPlaylistById(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/playlists/${id}`, { headers });
  },
  createPlaylist(accessToken, playlist, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.post(`/users/${id}/playlists`, { ...playlist }, { headers });
  },
  addTrack(accessToken, uri, id) {
    // console.log(accessToken);
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.post(`/playlists/${id}/tracks?uris=${uri}`, {}, { headers });
  },
  // album
  getAlbums(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/me/albums`, { headers });
  },
  getAlbumTrack(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/albums/${id}`, { headers });
  },
  // song
  getSongs(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/me/tracks?offset=0&limit=5`, { headers });
  },
  // artist
  getArtists(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/me/top/artists`, { headers });
  },
  getArtistTrack(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/artists/${id}/top-tracks?country=SE`, { headers });
  },
  // player
  getPlayerCurrent(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return apiCors.get(`/me/player`, { headers });
  },
  getPlayerRecently(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return apiCors.get(`/me/player/recently-played`, { headers });
  },
  // search --> not work
  searchFeature(TextSearch, accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return apiCors.get(
      `/search?query=${TextSearch}&type=artist&offset=0&limit=20`,
      { headers }
    ); // type= artist || album
  },
  // browser
  browseNewReleases(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return apiCors.get(`/browse/new-releases?limit=5&offset=5`, { headers });
  },
  browseCategories(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return apiCors.get(`/browse/categories?limit=5&offset=5`, { headers });
  },
  browseFeature(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return apiCors.get(`/browse/featured-playlists?limit=5&offset=5`, {
      headers,
    });
  },
};
