import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    songsOrBands: '',
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { songsOrBands } = this.state;
    const MIN_VALUE = 2;
    const ableBtn = songsOrBands.length >= MIN_VALUE;
    return (
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
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
