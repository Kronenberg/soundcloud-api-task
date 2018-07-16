import React from 'react';
import PropTypes from 'prop-types';

// @CSS
import './bottom-bar.css';

class BottomBar extends React.Component {
  static propTypes = {
      loadMore: PropTypes.func
 };

  render() {
      const { show } = this.props;
    return (
      <div className={show ? "hide-bottom-bar" : "bottom-bar"}>
        <button 
            onClick={this.props.loadMore}
            className="load-more">NEXT PAGE</button>
      </div>
    );
  }
}

export default BottomBar;