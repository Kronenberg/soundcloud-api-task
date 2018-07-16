import React from 'react';
import PropTypes from 'prop-types';

// @CSS
import './image-container.css';

class ImageContainer extends React.Component {
  static propTypes = {
    embedData: PropTypes.object
 };

 constructor() {
     super();

     this.state = {
         playMode: false
     }
 }

createEmbed = (embed) => {
    return {
         __html: embed 
    };
};

play = () => this.setState({ playMode: true });

  render() {
      const { embedData } = this.props;
      const { playMode } = this.state;
    return (
      <div className="image-container" >
            {embedData.success ? <div>
                <h1>To play the track click on image below</h1>
                <p>{embedData.response.author_name}</p>
                <p>{embedData.response.title}</p>
                <img 
                    width="100%"
                    height="400px"
                    alt={embedData.response.title}
                    src={embedData.response.thumbnail_url} 
                    onClick={this.play}
                    style={{ display: playMode ? "none" : "block" }}
                /> 
               <div dangerouslySetInnerHTML={ playMode ? 
                this.createEmbed(embedData.response.html) : 
                this.createEmbed("") }/>                
            </div> : ""}
            <h1>{ embedData.rejected ? "HTTP Error: 404! We cant find this embed data... OOOOOOOPS" : "" }</h1>
      </div>
    );
  }
}


export default ImageContainer;