import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    loading: false,
    user: '',
  };

  componentDidMount() {
    this.serachApi();
  }

  serachApi = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, user: user?.name || '' });
  };

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="app-header">
        <nav className="nav">
          <ol className="nav-list">
            <li className="nav-item">
              <Link to="/search" data-testid="link-to-search">Search Music</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ol>
        </nav>
        <p data-testid="header-user-name" className="user-name">{ user }</p>
      </header>
    );
  }
}

export default Header;
