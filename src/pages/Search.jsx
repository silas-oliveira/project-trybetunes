import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Link to="/">Voltar à Home</Link>
        <Header />
        <p>Album</p>
      </div>
    );
  }
}

export default Search;
