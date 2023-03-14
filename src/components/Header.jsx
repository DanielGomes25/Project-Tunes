import React, { Component } from 'react';
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
    this.setState({ loading: false, user: `${user.name}` });
  };

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ user }</p>
      </header>
    );
  }
}

export default Header;
