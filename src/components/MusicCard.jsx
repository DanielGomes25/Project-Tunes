import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { onToggle } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const alreadyFav = favoriteSongs.some((s) => s.trackId === music.trackId);
    if (alreadyFav) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    const updated = await getFavoriteSongs();
    this.setState({
      loading: false,
      isChecked: updated,
    });
    if (onToggle) onToggle();
  };

  render() {
    const { musics, skipFirst } = this.props;
    const { loading, isChecked } = this.state;
    if (loading) return <Loading />;
    const list = (skipFirst ? musics.slice(1) : musics) || [];
    return (
      <>
        {list.map((music) => (
          <div key={ music.trackId || music.trackNumber } className="track-card">
            <h2 className="track-title">{music.trackName}</h2>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label className="favorite-toggle">
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
      </>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  skipFirst: PropTypes.bool,
  onToggle: PropTypes.func,
};

MusicCard.defaultProps = {
  skipFirst: true,
  onToggle: undefined,
};

export default MusicCard;
