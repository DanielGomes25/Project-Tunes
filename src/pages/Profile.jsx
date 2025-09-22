import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: false,
    user: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, user });
  }

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-profile" className="page page-profile">
        <Header />
        <div className="container profile">
          <div className="profile-header">
            <img
              className="profile-avatar"
              src={ user.image || 'https://via.placeholder.com/150?text=User' }
              alt={ user.name }
            />
            <div>
              <h1 className="page-title">{user.name || 'Usuário'}</h1>
              <p className="muted">{user.email || 'email@exemplo.com'}</p>
            </div>
          </div>
          <div className="profile-bio">
            <h2>Sobre</h2>
            <p>{user.description || 'Sem descrição.'}</p>
          </div>
          <div className="actions">
            <Link to="/profile/edit" className="btn primary">Editar Perfil</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
