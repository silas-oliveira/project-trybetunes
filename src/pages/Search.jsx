import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const minArtistCaracteres = 1;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      loading: false,
      albums: [],
      apiDone: false,
    };
    this.nameArtist = '';
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAlbuns = this.renderAlbuns.bind(this);
  }

  handleChange(event) {
    this.setState({
      artist: event.target.value,
    });
  }

  async handleClick() {
    const { artist } = this.state;
    this.setState({
      loading: true,
      apiDone: false,
    });
    const albumsColection = await searchAlbumsAPI(artist);
    this.artistName = artist;
    this.setState({
      albums: albumsColection,
      loading: false,
      artist: '',
      apiDone: true,
    });
  }

  formFunc() {
    const { artist } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="search-artist-input">
            <input
              id="search-artist-input"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
              value={ artist }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length <= minArtistCaracteres }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }

  renderAlbuns() {
    const { albums, apiDone } = this.state;
    if (albums.length > 0) {
      return (
        <div>
          <p>{`Resultado de álbuns de: ${this.artistName}`}</p>
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <h2>{album.collectionName}</h2>
                <h3>{album.artistName}</h3>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    if (apiDone === true) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Link to="/">Voltar à Home</Link>
        <Header />
        {loading ? <Loading /> : this.formFunc()}
        {this.renderAlbuns()}
      </div>
    );
  }
}

export default Search;
