import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Link to="/profile">Profile</Link>
        <Header />
        <p>Profile</p>
      </div>
    );
  }
}

export default Profile;
