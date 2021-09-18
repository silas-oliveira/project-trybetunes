import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const minArtistCaracteres = 1;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      artist: event.target.value,
    });
  }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Link to="/">Voltar à Home</Link>
        <Header />
        <p>Album</p>
        <form action="">
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.handleChange }
            value={ artist }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length <= minArtistCaracteres }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
