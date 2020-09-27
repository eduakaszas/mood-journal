import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navigation.scss'

export class Navigation extends Component {
    render() {
        return (
            <Container fluid className="w-100 mb-5 pb-3">
                <Navbar expand="md">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Link to="/" className="nav d-inline mr-2"> Home </Link>
                                {/* <Link to="/thought-detangler" className="nav d-inline"> Thoughts </Link> */}
                                <Link to="/entries" className="nav d-inline mr-2"> Entries </Link>
                                <Link to="/stats" className="nav d-inline mr-2"> Stats </Link>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}
