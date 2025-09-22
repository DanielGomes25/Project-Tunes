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
    return (
      <>
        <div data-testid="page-album" className="page page-album">
          <Header />
        </div>
        <div className="container album">
          <div className="album-header">
            <img className="album-cover-lg" src={ img } alt={ collectionName } />
            <div className="album-meta">
              <h2 data-testid="artist-name" className="album-artist">{artistName}</h2>
              <p data-testid="album-name" className="album-name">{ collectionName }</p>
            </div>
          </div>
          <div className="tracklist">
            <MusicCard musics={ favoriteMusics } />
          </div>
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
