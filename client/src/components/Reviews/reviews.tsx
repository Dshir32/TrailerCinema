import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ReviewModel } from "../../models/review-model";
import Card from 'react-bootstrap/Card';
import "./reviews.css";
import { Config } from "../../config";

interface ReviewsState {
    reviews : ReviewModel[];
    movieName:string;
}

export class Reviews extends Component<any,ReviewsState>{

    public constructor(props){
        super(props);
        this.state = {
            reviews: [],
            movieName:"",
        }
    }

    public async componentDidMount(){
        try{
            const movieId = this.props.match.params.movieId;
            const response = await axios.get<ReviewModel[]>(Config.serverUrl + "/review/" + movieId);
            const reviews = response.data;
            const movieName = reviews[0].movie_name.toString();
            this.setState({reviews, movieName});            
        }
        catch(err){
            alert(err.message);
        }
    }

    public render(){
        return(
            <React.Fragment>
            <h2>{this.state.movieName} Reviews:</h2> 
                
            <div className="detail-container"> 
                <NavLink to="/" className="hp"> Back to Homepage</NavLink>
                <br></br>
                {this.state.reviews.reverse().map(r => 
                <div key={r.reviewId}>
                    <Card>
                        <Card.Header>
                            <img src={r.profile_pic ? r.profile_pic : "/assets/images/userImage.jpg"} alt=""></img>
                            {/* <img src="/assets/images/userImage.jpg" alt=""></img> */}
                            <div className="persona">{r.user_name ?r.user_name : "anonymous"}</div>
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                {r.content} 
                            </blockquote>
                            <footer className="blockquote-footer">
                            <cite title="Source Title">{r.dateAdded}</cite>
                            </footer>
                        </Card.Body>
                    </Card>
                    <p></p>
                </div>
                )}          
            </div>
            </React.Fragment> 
        );
    }
}