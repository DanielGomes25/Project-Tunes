import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    songsOrBands: '',
    loading: false,
    arraySongs: [],
    artist: '',
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searchSongsOrBands = async () => {
    const { songsOrBands } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(songsOrBands);
    if (result) {
      this.setState({
        loading: false,
        arraySongs: result,
        mensage: 'Resultado de álbuns de:',
        artist: songsOrBands,
        songsOrBands: '',

      });
    }
    // console.log(arraySongs);
  };

  render() {
    const { songsOrBands, loading, arraySongs, mensage, artist } = this.state;
    const MIN_VALUE = 2;
    const ableBtn = songsOrBands.length >= MIN_VALUE;
    if (loading) return <Loading />;

    return (
        <div data-testid="page-search" className="page page-search">
          <Header />
          <div className="container">
            <div className="search-bar">
              <input
                className="input"
                placeholder="Pesquise por banda ou artista"
                data-testid="search-artist-input"
                type="text"
                name="songsOrBands"
                id="songsOrBands"
                value={ songsOrBands }
                onChange={ this.inputChange }
              />
              <button
                className="btn primary"
                data-testid="search-artist-button"
                type="button"
                name="btn"
                id="btn"
                disabled={ !ableBtn }
                onClick={ this.searchSongsOrBands }
              >
                Pesquisar
              </button>
            </div>
            <div className="results-header">
              <p>
                {mensage}
                {' '}
                {artist}
              </p>
            </div>
            <div className="album-grid">
              {arraySongs.length === 0 ? (
                <p className="muted">Nenhum álbum foi encontrado</p>
              ) : (
                arraySongs.map((song) => (
                  <div key={ song.collectionId } className="album-card">
                    <img
                      src={ song.artworkUrl100 }
                      alt={ song.collectionName }
                      className="album-cover"
                    />
                    <div className="album-info">
                      <h3 className="album-title">{song.collectionName}</h3>
                      <p className="album-artist">{song.artistName}</p>
                      <Link
                        className="btn outline"
                        data-testid={ `link-to-album-${song.collectionId}` }
                        to={ `/album/${song.collectionId}` }
                      >
                        Ver Álbum
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default Search;
