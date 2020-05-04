import axios from "axios";

const api = axios.create({ baseURL: "https://api.spotify.com/v1" });

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
};

export default {
  checkAccessToken(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get("/me", { headers });
  },
  // playlist
  getPlaylists(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/users/${id}/playlists`, { headers });
  },
  getPlaylistById(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/playlists/${id}`, { headers });
  },
  createPlaylist(accessToken, playlist, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.post(`/users/${id}/playlists`, { ...playlist }, { headers });
  },
  addTrack(accessToken, uri, id) {
    console.log(accessToken);
    headers.Authorization = `Bearer ${accessToken}`;
    return api.post(`/playlists/${id}/tracks?uris=${uri}`, { headers });
  },
  // album
  getAlbums(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/me/albums`, { headers });
  },
  getAlbumTrack(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/albums/${id}`, { headers });
  },
  // song
  getSongs(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/me/tracks?offset=0&limit=5`, { headers });
  },
  // artist
  getArtists(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/me/top/artists`, { headers });
  },
  getArtistTrack(accessToken, id) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/artists/${id}/top-tracks?country=SE`, { headers });
  },
  // player
  getPlayerCurrent(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    return api.get(`/me/player`, { headers });
  },
  getPlayerRecently(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return api.get(`/me/player/recently-played`, { headers });
  },
  // search --> not work
  searchFeature(TextSearch, accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return api.get(
      `/search?query=${TextSearch}&type=artist&offset=0&limit=20`,
      { headers }
    ); // type= artist || album
  },
  // browser
  browseNewReleases(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return api.get(`/browse/new-releases?limit=5&offset=5`, { headers });
  },
  browseCategories(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return api.get(`/browse/categories?limit=5&offset=5`, { headers });
  },
  browseFeature(accessToken) {
    headers.Authorition = `Bearer ${accessToken}`;
    return api.get(`/browse/featured-playlists?limit=5&offset=5`, { headers });
  },
};
