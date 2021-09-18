import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.capUser();
  }

  async capUser() {
    const user = await getUser();
    this.setState({
      loading: true,
    });
    this.setState({
      userName: user.name,
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <div data-testid="header-component">
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        {loading
          ? <Loading />
          : <h1 data-testid="header-user-name">{userName}</h1>}
      </div>
    );
  }
}

export default Header;
