import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Link to="/favorites">Favorites</Link>
        <Header />
        <p>Favorites</p>
      </div>
    );
  }
}

export default Favorites;
