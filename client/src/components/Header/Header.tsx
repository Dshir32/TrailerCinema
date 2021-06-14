import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './header.css';



export class Header extends Component {

    public render(){
        return(
            <div>
                <Navbar sticky="top" bg="light" variant="light">
                    <Container>
                        <h1 className="main-header">
                            <a href="/">Trailer Cinema</a></h1>
                        <input placeholder="  Search . . ."/>
                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="outline-dark">Login</Button>
                            <Button variant="outline-dark">Logout</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}