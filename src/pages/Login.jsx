import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const minCaracterLogin = 2;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputLogin: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputLogin: event.target.value,
    });
  }

  async handleClick() {
    const { inputLogin } = this.state;
    const { history } = this.props;
    const user = {
      name: inputLogin,
    };
    this.setState({
      loading: true,
    });
    await createUser(user);
    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  renderForm() {
    const { inputLogin } = this.state;
    return (
      <form action="form">
        <label htmlFor="nameId">
          <input
            name="inputLogin"
            id="nameId"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            value={ inputLogin }
          />
        </label>
        <button
          name="disableButton"
          data-testid="login-submit-button"
          form="form"
          type="submit"
          disabled={ inputLogin.length <= minCaracterLogin }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : this.renderForm() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
