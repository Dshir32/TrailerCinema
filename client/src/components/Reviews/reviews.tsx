import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ReviewModel } from "../../models/review-model";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./reviews.css";

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
            const response = await axios.get<ReviewModel[]>("http://localhost:3000/review/" + movieId);
            const reviews = response.data;
            const movieName = reviews[0].name.toString();
            this.setState({reviews, movieName});            
        }
        catch(err){
            alert(err.message);
        }
    }

    public render(){
        return(
            <div className="detail-container">
                <h2>{this.state.movieName} Reviews:</h2>  
                {this.state.reviews.map(r => 
                <div key={r.reviewId}>
                <Card>
                    <Card.Header>{r.firstName} {r.lastName}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p></p>
                        <footer className="blockquote-footer">
                        {r.content} <cite title="Source Title">
                            <p></p>{r.dateAdded}</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            <p></p>
            </div>
            )}          
            <NavLink to="/" className="hp"> Back to Homepage</NavLink>
            <Button href="/review/add-review" variant="light">Submit review</Button>
            </div>
        );
    }
}