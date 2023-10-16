import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    favoriteMusics: [],
    artistName: '',
    collectionName: '',
    img: '',

  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const arrayMusics = await getMusics(id);
    this.setState({
      favoriteMusics: arrayMusics,
      artistName: arrayMusics[0].artistName,
      collectionName: arrayMusics[0].collectionName,
      img: arrayMusics[0].artworkUrl100,

    });
  }

  render() {
    const { favoriteMusics, artistName, collectionName, img } = this.state;
    console.log(favoriteMusics);
    return (
      <>
        <div data-testid="page-album">
          <Header />

        </div>
        <div id="album">
          <h2 data-testid="artist-name">{artistName}</h2>
          <img src={ img } alt={ collectionName } />
          <p data-testid="album-name">{ collectionName}</p>
          <MusicCard musics={ favoriteMusics } />

        </div>

      </>

    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
