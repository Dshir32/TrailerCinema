import React, { Component } from "react";
import "./thumbnail.css";

interface ThumbnailProps {
    imageSource:string;
    imageWidth:number;
    imageHeight:number;
    userEntersMe?(imageSource:string):void;
    userLeftMe?(): void;
}

export class Thumbnail extends Component<ThumbnailProps>{

    public constructor(props){
        super(props);
    }

    private mouseEnter = () => {
        if(this.props.userEntersMe) {
            this.props.userEntersMe(this.props.imageSource)
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
                <img src={this.props.imageSource} height={this.props.imageHeight} width={this.props.imageWidth} alt=""/>
            </div>
        );
    }
}