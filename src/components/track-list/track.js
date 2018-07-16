import React from 'react';
import PropTypes from 'prop-types';

// @CSS
import './track.css';

// @HELPERS
import parseMilliseconds from '../../helpers/parseMilliseconds';

class Track extends React.Component {
  static propTypes = {
    onTrackClickHandler: PropTypes.func.isRequired,
    artwork_url: PropTypes.string,
    genre: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number
 };

  render() {
    const { onTrackClickHandler } = this.props;
    return (
      <div onClick={onTrackClickHandler} className="track">
        <div className="track-image">
          <img src={this.props.artwork_url ? this.props.artwork_url : "https://media.giphy.com/media/26u6bnal23NhnIoZG/giphy.gif"} alt="artwork_url" /> 
        </div>  
        <div className="track-info">
          <span>{this.props.genre ? this.props.genre : "..."}</span>
          <span>{this.props.title ? this.props.title : "..."}</span>
        </div> 
        <div className="track-duration">
          <span>{parseMilliseconds(this.props.duration)}</span>
        </div>  
      </div>
    );
  }
}


export default Track;