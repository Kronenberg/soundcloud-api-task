import React from 'react';
//import classNames from 'classnames';
import PropTypes from 'prop-types';

// @CSS
import './history-container.css';

class HistoryContainer extends React.Component {
  static propTypes = {
    historyTracks: PropTypes.array.isRequired
 };

 constructor() {
     super();

     this.state = {
         sliceIndex : 5,
         showHistory: false
     }
 }

 showFullHistory = () => {
    const  { historyTracks }  = this.props;
    this.setState({ 
        sliceIndex: historyTracks.length,
        showHistory: true
    });
 }

  render() {
      const  { historyTracks }  = this.props;
      const { sliceIndex, showHistory } = this.state;
      const tracks = historyTracks.length > 0 ? historyTracks
      .slice(0, sliceIndex)
      .map((track, index) => (
        <div key={index}>{track.title}</div>
    ) 
) : "No history available";
    return (
      <div className="history-container">
      <button 
         style={{ display: showHistory ? "none" :  "" }}
         onClick={this.showFullHistory}>
      SHOW FULL HISTORY
      </button>
            {tracks}
      </div>
    );
  }
}

export default HistoryContainer;