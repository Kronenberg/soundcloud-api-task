import React from 'react';
import PropTypes from 'prop-types';

// @CSS
import './track-list.css';

//@ COMPONENTS
import Track from './track';
import BottomBar from '../bottom-bar/bottom-bar';

class TrackList extends React.Component {
    
    static propTypes = {
        tracksData: PropTypes.object.isRequired
     };

  render() {
    const infoMessage = `Sorry we didn't find any results .Check the spelling, or try a different search.`;
    const { tracksData, loadMore, show } = this.props;
    const searchIsEmpty = tracksData.success && tracksData.tracks.length === 0;
    const trackList = tracksData && tracksData.success ? tracksData.tracks
    .map(track => (
      <Track 
        key={track.id}
        title={track.title}
        genre={track.genre}
        artwork_url={track.artwork_url}
        likes_count={track.likes_count}
        duration={track.duration}
        onTrackClickHandler={() => this.props.onTrackClickHandler(track)}
      />
    )
) : '';
    return (
      <div className="track-list" >
        {trackList}
        <BottomBar 
          loadMore={loadMore}
          show={show || searchIsEmpty}
        />
        <h1 className="info-message">{ searchIsEmpty ? infoMessage : ""}</h1>
      </div>
    );
  }
}

export default TrackList;