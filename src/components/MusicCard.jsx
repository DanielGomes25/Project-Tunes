import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: [],

  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isChecked: favoriteSongs,
    });
  }

  handleFavorit = async (music) => {
    this.setState({ loading: true });
    await addSong(music);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      isChecked: favoriteSongs,
    });
  };

  render() {
    const { musics } = this.props;
    const { loading, isChecked } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        (
        {musics.slice(1).map((music) => (
          <div key={ music.trackNumber }>
            <h2>{music.trackName}</h2>
            <audio data-testid="audio-component" src="{previewUrl}" controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                value={ music.trackId }
                checked={ isChecked.some((checked) => checked.trackId === music.trackId) }
                onChange={ () => this.handleFavorit(music) }
              />

            </label>
          </div>

        ))}
        )
      </>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default MusicCard;
