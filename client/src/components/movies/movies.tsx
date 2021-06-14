import React, { Component } from "react";
import { MovieModel } from "../../models/movie-model";
import axios from "axios";
import "./movies.css";
import { Thumbnail } from "../Thumbnail/thumnbnail";
import { NavLink } from "react-router-dom";

interface MoviesState {
    movies:  MovieModel[];
    previewImage:string;
    // videoSource:string;
}

export class Movies extends Component<any,MoviesState> {

    public constructor(props){
        super(props);
        this.state = {
            movies: [],
            previewImage:"",
            
            // videoSource:""
        };
    }

    public async componentDidMount(){
        setTimeout(async () => {
            try{
                const response = await axios.get<MovieModel[]>("http://localhost:3000/api/movies");
                const movies = response.data;
                this.setState({movies})
            }
            catch(err){
                alert(err.message);
            }
        }, 2000);
    }

    private showPreview = (previewImage:string) => {
        this.setState({previewImage:previewImage})
    }

    private removePreview = () => {
        this.setState({previewImage:""});
    }
    public render(){
        return (
            <div className="movies">
                <h2>Movies List : </h2>

            {this.state.movies.length === 0 && <img src="/assets/images/loading.gif" width="200" alt="Loading..."/> }
            
            {this.state.movies.length > 0 &&  
                <React.Fragment>
                    {/* {this.state.movies.map(m => <div className="movie" onMouseEnter={this.mouseEnter} > */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Reviews</th>
                                    <th>Description</th>
                                    <th>Release Date</th>
                                    <th>Hover to View</th>
                                </tr>
                            </thead>
                            
                            {this.state.movies.map(m => 
                                <tbody key={m.movieId}>
                                    <tr>
                                        <td>
                                            {m.name}
                                        </td>
                                        <td>
                                            <NavLink to={"/review/"+ m.movieId}>
                                                <p style={{"textAlign":"center"}}><span> - {m.reviewsCount} - </span></p>
                                            </NavLink>
                                        </td>
                                        <td>{m.description}</td>
                                        <td>{new Date(m.date).toLocaleDateString()}</td>
                                        <td>
                                            <Thumbnail
                                                imageWidth={130}
                                                imageHeight={55}
                                                imageSource={"http://localhost:3000/uploads/" + m.imageFileName}
                                                userEntersMe={this.showPreview}
                                                userLeftMe={this.removePreview} />
                                        </td>
                                    </tr>
                                </tbody>                       
                            )}    
                        </table>
                    </React.Fragment>
                    }
                    <img className="preview" src={this.state.previewImage} alt="preview" 
                        style={{display: this.state.previewImage ? "block" : "none"}} />
                </div>
            );
        }
    }
