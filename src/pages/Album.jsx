import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      cover: { artistName: '', collectionName: '' },
      songs: [],
    };
    this.renderSongs = this.renderSongs.bind(this);
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
  }

  renderSongs() {
    const { songs } = this.state;
    return (
      <div>
        {songs.map((song) => (<MusicCard key={ song.trackId } song={ song } />))}
      </div>
    );
  }

  render() {
    const { cover, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ cover.artistName }</h2>
        <h3 data-testid="album-name">{ cover.collectionName }</h3>
        { songs.length > 0 ? this.renderSongs() : null }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Album;
