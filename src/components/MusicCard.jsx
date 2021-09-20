import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song, handleClick, checked } = this.props;
    return (
      <div>
        <h4>{ song.trackName }</h4>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${song.trackId}` }
          htmlFor={ song.trackId }
        >
          Favorita
          <input
            onChange={ handleClick }
            id={ song.trackId }
            type="checkbox"
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
export default MusicCard;
