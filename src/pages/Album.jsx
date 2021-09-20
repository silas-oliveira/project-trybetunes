import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      cover: { artistName: '', collectionName: '' },
      songs: [],
      loading: false,
      favoriteSongs: [],
    };
    this.renderSongs = this.renderSongs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getMusics(id).then((response) => {
      const cover = response[0];
      const songs = response.slice(1);
      this.setState({
        cover,
        songs,
      });
    });
    getFavoriteSongs().then((response) => {
      this.setState({
        favoriteSongs: response,
      });
    });
  }

  handleClick(event) {
    const { songs, favoriteSongs } = this.state;
    const { target } = event;
    const { id } = target;
    const currentTrackId = Number(id);
    const capMusic = songs.find((song) => song.trackId === currentTrackId);
    this.setState({
      loading: true,
    });
    if (favoriteSongs.some((element) => element.trackId === currentTrackId)) {
      removeSong(capMusic).then(() => {
        getFavoriteSongs().then((response) => {
          this.setState({
            favoriteSongs: response,
            loading: false,
          });
        });
      });
    } else {
      addSong(capMusic).then(() => {
        getFavoriteSongs().then((response) => {
          this.setState({
            loading: false,
            favoriteSongs: response,
          });
        });
      });
    }
  }

  renderSongs() {
    const { songs, favoriteSongs } = this.state;
    return (
      <div>
        {songs.map((song) => (
          <MusicCard
            checked={ favoriteSongs.some((songFavorite) => (
              songFavorite.trackId === song.trackId
            )) }
            handleClick={ this.handleClick }
            key={ song.trackId }
            song={ song }
          />))}
      </div>
    );
  }

  render() {
    const { cover, songs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{cover.artistName}</h2>
        <h3 data-testid="album-name">{cover.collectionName}</h3>
        {loading ? <Loading /> : null}
        {songs.length > 0 ? this.renderSongs() : null}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Album;
