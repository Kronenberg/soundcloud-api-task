import React, { Component } from 'react';
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SearchBar from './components/search-bar/search-bar';
import TrackList from './components/track-list/track-list';
import ImageContainer from './components/image-container/image-container';
import HistoryContainer from  './components/history-container/history-container';
import './App.css';

const loader = "https://media.giphy.com/media/azrUC2S0ndgSA/giphy.gif";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tabIndex: 0
    }
  }

  componentWillMount() {
    this.props.getQueryAsync();
  }

  loadMore = () => {
    this.props.loadMoreAsync();
  }
  
  onTrackClickHandler = (value) => {
    this.setState({ tabIndex: 1 });
    this.props.dowloadEmbedAsync(value.uri);
  }

  render() {
    const { pending } = this.props.tracksData;
    const { embedData } = this.props;  
    return (
      <div className="App">
      <div className="tab-header">
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
                  <Tab>Search Window</Tab>
                  <Tab>Image View</Tab>
                  <Tab>History</Tab>
                </TabList>
            <TabPanel>
            <SearchBar 
              getQueryAsync={this.props.getQueryAsync}
            />
            { pending ? <div className="content-loader">
            <img 
            src={loader} alt="search-loader" /></div> :
              <TrackList 
                tracksData={this.props.tracksData}
                onTrackClickHandler={this.onTrackClickHandler}
                loadMore={this.loadMore}
                show={pending}
              /> }        
            <div className="ps-container">
              <h4>P.S. Check my own tracks on SoundCloud!</h4>
              <h4>
                <strong>Michael Kronenberg</strong> - <em>There is nothing at the end</em>
                </h4>
            </div>     
            </TabPanel>
            <TabPanel>
              <ImageContainer 
                embedData={embedData}
              />
            </TabPanel>
            <TabPanel>
              <HistoryContainer 
                historyTracks={this.props.tracksData.history}
              />
            </TabPanel>
        </Tabs>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracksData: state.searchTrackReducer,
    embedData: state.embedTrackReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQueryAsync: (query) => dispatch({ type: "GET_QUERY_ASYNC", payload: query }),
    loadMoreAsync: () => dispatch({ type: "LOAD_MORE_ASYNC" }),
    dowloadEmbedAsync: (url) => dispatch({ type: "DOWLOAD_EMBED_ASYNC", payload: url })
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
