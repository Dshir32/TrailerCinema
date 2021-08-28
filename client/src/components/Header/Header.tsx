import React, { Component } from "react";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { UserModel } from "../../models/user-model";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/action-type";
import './header.css';
import { Config } from "../../config";

interface HeaderState {
    user: UserModel[];
    userName : string;
}

export class Header extends Component<any,HeaderState> {

    private unsubscribeStore: Unsubscribe;

    public constructor(props:any){
        super(props);
        this.state = {
            user: store.getState().user,
            userName:"",
        }
    }

    public async componentDidMount() {
        this.unsubscribeStore = store.subscribe(() => {
            const user = store.getState().user;
            this.setState({ user });
        })
        try {  
            const response = await axios.get<UserModel>(Config.serverUrl + "/auth/current_user", {withCredentials: true});
            if(response) {
                const user = response.data;
                const userName = user.name;
                this.setState({userName});
                const action = { type: ActionType.getUser, payload: user};
                store.dispatch(action);
            } 
        }
        catch (err){
            // alert("Error : " + err.message);
            console.log("User is not logged in");
        }
    }

    public componentWillUnmount():void {
        this.unsubscribeStore();
    }

    public render(){
        return(
            <div>
                <Navbar sticky="top" bg="light" variant="light">
                    <Container>
                        <h1 className="main-header">
                            <a href="/">Trailer Cinema</a></h1>
                        <Navbar.Collapse className="justify-content-end">
                            {this.state.user ? <p style={{margin: `10px`}}>Hey {this.state.userName}</p> : null}
                            {!this.state.userName ? <Button href= "http://localhost:3000/auth/google/"  variant="outline-dark">Login with google</Button> : null}
                            {this.state.userName ? <Button href="http://localhost:3000/auth/logout" variant="outline-dark">Logout</Button> : null}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}