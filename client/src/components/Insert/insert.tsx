import React, { ChangeEvent, Component } from "react";
import axios from "axios";
import { ReviewModel } from "../../models/review-model";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/action-type";
import { MovieModel } from "../../models/movie-model";
import { UserModel } from "../../models/user-model";
import "./insert.css";

interface insertState {
    review: ReviewModel,
    movies:  MovieModel[],
    errors: {nameError: String},
    user: UserModel[],
    userId : number
}

export class Insert extends Component<any, insertState> {

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any){
        super(props);
        this.state = {
            review : new ReviewModel(),
            movies:[],
            errors: {nameError: ""},
            user: store.getState().user,
            userId: null,
        };
    }

    public async componentDidMount(){
        this.unsubscribeStore = store.subscribe(() => {
            const user = store.getState().user;
            this.setState({ user });
        });

        try {
            //Getting all movies
            const moviesResponse = await axios.get<MovieModel[]>("http://localhost:3000/api/movies", {withCredentials: true});
            const movies = moviesResponse.data;
            this.setState({ movies });
            //Getting user
            const userResponse = await axios.get<UserModel>("http://localhost:3000/auth/current_user", {withCredentials: true})
            const user = userResponse.data;
            const userId = user.user_id;
            this.setState({userId});
            // Updating Redux
            const action = { type: ActionType.getUser, payload: user};
            store.dispatch(action);

        } catch(err){
            console.log("User is not logged in");
            // alert("Error:" + err.message);
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
        review.dateAdded = new Date().toLocaleString().split(",")[0];;
        // 
        this.setState({review});
    }

    private addReview = async() => {
        
        const userId = this.state.userId;
        const review = {...this.state.review};
        review.userId = userId;
        this.setState({ review });

        if(!this.state.userId){
            const errors = {...this.state.errors };
            errors.nameError = "Only authorized users can submit a review, Pls Log in..";
            this.setState({errors});
        }
        if(!this.state.review.movieId) {
            const errors = {...this.state.errors };
            errors.nameError = "Selecting a movie is required!";
            this.setState({errors});
            return
        } else if (!this.state.review.content || this.state.review.content.split(" ").length < 1){
            const errors = {...this.state.errors };
            errors.nameError = "Review must contain at-least 1 word!";
            this.setState({errors});
            return
        }
        try {
            console.log("reached this far , Here is why " + JSON.stringify(review));
            const response = await axios.post<ReviewModel[]>("http://localhost:3000/review/add-review", review);
            // const addedReview = response.data;
            // console.log("added review :" , addedReview)
            this.props.history.push("/review/" + review.movieId);
        } catch(err) {
            console.log("Error: " + err.message);
        }
    }

    public componentWillUnmount():void {
        this.unsubscribeStore();
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
