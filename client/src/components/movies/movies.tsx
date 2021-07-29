import React, { Component } from "react";
import { MovieModel } from "../../models/movie-model";
import axios from "axios";
import "./movies.css";
import YoutubeEmbed, { Thumbnail } from "../Thumbnail/thumnbnail";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Config } from "../../config";


interface MoviesState {
    movies:  MovieModel[];
    previewImage:string;
    embedId:string;
    searchField:string;
}

export class Movies extends Component<any,MoviesState> {

    public constructor(props){
        super(props);
        this.state = {
            movies: [],
            previewImage:"",
            embedId: "",
            searchField: ""
        };
    }

    public async componentDidMount(){
            try{
                const response = await axios.get<MovieModel[]>(Config.serverUrl + "/api/movies");
                const movies = response.data;
                this.setState({ movies })
            }
            catch(err){
                alert(err.message);
            }
    }

    private showPreview = (embedId:string) => {
        this.setState({embedId:embedId})
    }

    private removePreview = () => {
        this.setState({embedId:""});
    }

    public renderMovieSearch(){
        return this.state.movies.filter(movie => movie.name.toLowerCase().indexOf((this.state.searchField).toLowerCase()) > -1).map(m => {
            return(
                    <tr key={m.movieId}>
                            <td>
                                <p className="movie-name">{m.name}</p>
                            </td>
                            {/* Show review count */}
                            <td>
                                {m.reviewsCount > 0 ? 
                                <NavLink to={"/review/"+ m.movieId}>
                                    <p className="movie-review one"><span> - {m.reviewsCount} - </span></p>
                                </NavLink> : 
                                <p className="movie-review one"><span>  No reviews  </span></p>}
                            </td>
                            <td className="movie-description">{m.description}</td>
                            <td className="movie-date">{new Date(m.date).toLocaleDateString()}</td>
                            <td className="movie-image">
                                <Thumbnail
                                    // imageWidth={105}
                                    // imageHeight={55}
                                    imageSource={Config.serverUrl + "/uploads/" + m.imageFileName}
                                    userEntersMe={this.showPreview}
                                    userLeftMe={this.removePreview} 
                                    videoSource={m.embedId}
                                />
                            </td>
                        </tr>
            )
        })
    }


    public renderAllMovies(){
            return this.state.movies.map(m => 
                        <tr key={m.movieId}>
                            <td>
                            <p className="movie-name one">{m.name}</p>
                            </td>
                            {/* Show review count */}
                            <td>
                                {m.reviewsCount > 0 ? 
                                <NavLink to={"/review/"+ m.movieId}>
                                    <p className="movie-review one"><span> - {m.reviewsCount} - </span></p>
                                </NavLink> : 
                                <p className="movie-review one"><span>  No reviews  </span></p>}
                            </td>

                            <td className="movie-description">{m.description}</td>
                            <td className="movie-date one" >{new Date(m.date).toLocaleDateString()}</td>
                            <td className="movie-image">
                                <Thumbnail
                                    // imageWidth={105}
                                    // imageHeight={55}
                                    imageSource={Config.serverUrl + "/uploads/" + m.imageFileName}
                                    userEntersMe={this.showPreview}
                                    userLeftMe={this.removePreview} 
                                    videoSource={m.embedId}
                                />
                            </td>
                        </tr>
                )}  
    
    
    public render(){
        return (
            <React.Fragment>
            <div className="movies">
                <div className="float-container">
                    <div className="search-container">
                        <h2 className="float-child">Movies List : </h2>
                        <input className="float-child" placeholder="  Search . . ." onChange={(e) => this.setState({ searchField: e.target.value }) }/>
                    </div>
                    <div className="reviewButton-container">
                        <Button href="/review/add-review" type="submit" variant="light">Add review here</Button>
                    </div>
                    
                </div>
                
    
                {/* {this.state.movies.length === 0 && <img src="/assets/images/loading.gif" width="200" alt="Loading..."/> } */}
                <table>
                    <thead>
                        <tr>
                            <th>Movie name</th>
                            <th>Reviews</th>
                            <th>Description</th>
                            <th>Release Date</th>
                            <th className="blinking">Hover to View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.searchField !== "" ? this.renderMovieSearch() : this.renderAllMovies()}
                    </tbody>
                    
                </table>     

                <div className="preview" style={{display: this.state.embedId ? "block" : "none"}}>
                    <YoutubeEmbed embedId={this.state.embedId} ></YoutubeEmbed>
                </div>        
            </div>
            </React.Fragment>
            );
        }
    }
