import React, { ChangeEvent, Component } from "react";
import { ReviewModel } from "../../models/review-model";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./insert.css";
import { MovieModel } from "../../models/movie-model";
import axios from "axios";

interface insertState {
    review: ReviewModel,
    movies:  MovieModel[],
    errors: {nameError: String}
}

export class Insert extends Component<any, insertState> {

    public constructor(props: any){
        super(props);
        this.state = {
            review : new ReviewModel(),
            movies:[],
            errors: {nameError: ""}
        };
    }

    public async componentDidMount(){
        try {
            const response = await axios.get<MovieModel[]>("http://localhost:3000/api/movies");
            const movies = response.data;
            this.setState({movies})
        } catch(err){
            alert("Error:" + err.message);
        }
    }

    private setReview = async(args: any) => {
        const reviewContent = args.target.value;
        const review = {...this.state.review};
        review.content = reviewContent;
        this.setState({review});       
    }

    private setMovieId = async(args: ChangeEvent<HTMLSelectElement>) => {
        const movieId = +args.target.value;
        const review = {...this.state.review};
        review.movieId = movieId;
        review.userId = 2;
        review.dateAdded = new Date().toLocaleString().split(",")[0];
        this.setState({review});
    }

    private addReview = async()=>{
        if(!this.state.review.movieId) {
            const errors = {...this.state.errors };
            errors.nameError = "Selecting a movie is required!";
            this.setState({errors});
            return
        } else if (!this.state.review.content || this.state.review.content.split(" ").length < 3){
            const errors = {...this.state.errors };
            errors.nameError = "Review must contain at-least 3 words!";
            this.setState({errors});
            return
        }
        try {
            const response = await axios.post<ReviewModel>("http://localhost:3000/review/add-review", this.state.review);
            const addedReview = response.data;
            this.props.history.push("/review/" + addedReview.movieId);
        } catch(err) {
            alert("Error:" + err.message);
        }
    }

    public render(){
        return(
            <div className="review-form">
                <h1>Tell us what you think</h1>
                <select onChange={this.setMovieId} value={this.state.review.movieId} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Select movie...</option>
                    {
                        this.state.movies.map(m =>
                            <option key={m.movieId} value={m.movieId}>{m.name}</option>
                        )
                    }
                </select>
                <span>{this.state.errors.nameError}</span>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label></Form.Label>
                        <Form.Control 
                        as="textarea" 
                        rows={7} 
                        placeholder="Type your review here . . . " 
                        type="text" 
                        onChange={this.setReview}
                        value={this.state.review.content || ""}
                        />
                    </Form.Group>
                    <Button variant="light" onClick={this.addReview}>Submit your review</Button>
                </Form>
            </div>
        )
    }
}