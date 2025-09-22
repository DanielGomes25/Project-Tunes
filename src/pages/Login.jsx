import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    nameInput: '',
    isLoading: false,
    redirect: false,
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitBtn = async () => {
    const { nameInput } = this.state;
    this.setState({ isLoading: true });
    const result = await createUser({ name: nameInput });
    // console.log(result);
    if (result === 'OK') {
      this.setState({
        isLoading: false,
        redirect: true,
      });
    }
  };

  render() {
    const { nameInput, isLoading, redirect } = this.state;
    const MAX_VALUE = 3;
    const ableBtn = nameInput.length >= MAX_VALUE;
    if (isLoading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="page page-login">
        <div className="container form-card">
          <h1 className="page-title">Bem-vindo ao Trybe Tunes</h1>
          <div className="form-group">
            <label htmlFor="nameInput">Seu nome</label>
            <input
              className="input"
              placeholder="Digite seu nome"
              name="nameInput"
              type="text"
              data-testid="login-name-input"
              id="nameInput"
              value={ nameInput }
              onChange={ this.inputChange }
            />
          </div>
          <div className="actions">
            <button
              className="btn primary"
              type="button"
              data-testid="login-submit-button"
              onClick={ this.submitBtn }
              disabled={ !ableBtn }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
