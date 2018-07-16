import React from 'react';
import PropTypes from 'prop-types';

// @CSS
import './search-bar.css';

class SearchBar extends React.Component {
  static propTypes = {
    getQueryAsync: PropTypes.func.isRequired
 };

startSearchQuery = (e) => {
    const { value } = e.target;
    this.props.getQueryAsync(value);
}

  render() {
    return (
      <div className="search-bar" role="search">
      <h4>Search for an Artist, Song, Album or Playlist</h4>
          <input
            autoComplete="off"
            className="search-form__input"
            maxLength="60"
            placeholder="Search Tracks"
            tabIndex="0"
            type="text"
            onChange={this.startSearchQuery}
          />
      </div>
    );
  }
}


export default SearchBar;