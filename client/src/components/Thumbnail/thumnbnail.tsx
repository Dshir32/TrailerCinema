import React, { Component } from "react";
import "./thumbnail.css";

import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
      <iframe 
        // width="853"
        // height="480"
        src={`https://www.youtube.com/embed/${embedId}?&autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
  YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
  };

interface ThumbnailProps {
    imageSource:string;
    // imageWidth:number;
    // imageHeight:number;
    userEntersMe?(imageSource:string):void;
    userLeftMe?(): void;
    videoSource:string;
}

export class Thumbnail extends Component<ThumbnailProps>{

    public constructor(props){
        super(props);
    }

    private mouseEnter = () => {
        if(this.props.userEntersMe) {
            this.props.userEntersMe(this.props.videoSource)
        }
    }

    private mouseLeave = () => {
        if(this.props.userLeftMe){
            this.props.userLeftMe();
        }
    }

    public render(){
        return(
            <div className="thumbnail" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <img 
                src={this.props.imageSource} 
                // height={this.props.imageHeight} 
                // width={this.props.imageWidth}
                alt={this.props.videoSource}/>
            </div>
        );
    }
}


export default YoutubeEmbed;
