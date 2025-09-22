import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    await this.refreshFavorites();
  }

  refreshFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favorites });
  };

  render() {
    const { loading, favorites } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites" className="page page-favorites">
        <Header />
        <div className="container">
          <h1 className="page-title">Músicas Favoritas</h1>
          {favorites.length === 0 ? (
            <p className="muted">Você ainda não tem músicas favoritas.</p>
          ) : (
            <MusicCard
              musics={ favorites }
              skipFirst={ false }
              onToggle={ this.refreshFavorites }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
