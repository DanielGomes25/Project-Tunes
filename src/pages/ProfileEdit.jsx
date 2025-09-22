import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: false,
    redirect: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name || '',
      email: user.email || '',
      image: user.image || '',
      description: user.description || '',
    });
  }

  isValid = () => {
    const { name, email, image, description } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    return (
      name.trim().length > 0
      && emailRegex.test(email)
      && image.trim().length > 0
      && description.trim().length > 0
    );
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSave = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, image, description });
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const { loading, redirect, name, email, image, description } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit" className="page page-profile-edit">
        <Header />
        <div className="container form-card">
          <h1 className="page-title">Editar Perfil</h1>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">URL da Imagem</label>
            <input
              id="image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </div>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={ this.handleSave }
              disabled={ !this.isValid() }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
