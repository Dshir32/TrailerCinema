import React, { Component } from "react";
import "./layout.css";
import { Movies } from "../movies/movies";
import { Switch } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { Reviews } from "../Reviews/reviews";
import { Header } from "../Header/Header";
import { Insert } from '../Insert/insert';
import { Footer } from "../Footer/footer";
import { PageNotFound } from "../page-not-found/page-not-found";

export class Layout extends Component {

    public render(){
        return(
            <div className="layout">
                <Header />
                <BrowserRouter>
                    <hr/>
                    <main>
                        <Switch>
                            
                            <Route path="/" component={Movies} exact></Route>
                            <Route path="/review/add-review" component={Insert} exact></Route>
                            <Route path="/review/:movieId" component={Reviews} exact></Route>
                            {/* <Route path ="/*" component={PageNotFound}></Route> */}
                        
                            {/* <Route path="**" component={Movies} exact></Route> */}
                        </Switch>
                    </main>
                </BrowserRouter>  
                <Footer />              
            </div>
        );
    }
}