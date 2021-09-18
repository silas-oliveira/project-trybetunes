import React from 'react';
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
        <h1
          data-testid="header-user-name"
        >
          { loading ? <Loading /> : userName}
        </h1>
      </div>
    );
  }
}

export default Header;
