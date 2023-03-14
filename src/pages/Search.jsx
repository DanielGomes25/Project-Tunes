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
      <>
        <div data-testid="page-search">
          <Header />
          <input
            placeholder="pesquise por banda ou artista"
            data-testid="search-artist-input"
            type="text"
            name="songsOrBands"
            id="songsOrBands"
            value={ songsOrBands }
            onChange={ this.inputChange }
          />
          <button
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
        <form>
          <p>

            {mensage}
            {' '}

            {artist}

          </p>
          {arraySongs.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
            arraySongs.map((song) => (
              <div key={ song.collectionId }>
                <img src={ song.artworkUrl100 } alt={ song.collectionName } />
                <Link
                  data-testid={ `link-to-album-${song.collectionId}` }
                  to={ `/album/${song.collectionId}` }
                >
                  {song.collectionName}
                </Link>

              </div>
            ))
          )}
        </form>
      </>
    );
  }
}

export default Search;
