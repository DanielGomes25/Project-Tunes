import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ musics }) {
  const favoritSongs = musics.slice(1).map((music) => (
    <li key={ music.trackId }>
      {music.trackName}
      <audio data-testid="audio-component" src="{previewUrl}" controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </li>));
  return (
    <ol>
      {favoritSongs}
    </ol>
  );
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      track: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,

};

export default MusicCard;
