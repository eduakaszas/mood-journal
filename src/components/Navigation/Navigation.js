import React, { Component } from 'react'

import { Link } from "react-router-dom";
import './Navigation.scss'

export class Navigation extends Component {
    render() {
        return (
            <div>
                <div className="navLinks float-right mt-3 mb-5 position-static">
                    <Link to="/" className="nav d-inline pr-3"> Home </Link>
                    <Link to="/thought-detangler" className="nav d-inline pr-3"> Thoughts </Link>
                    <Link to="/entries" className="nav d-inline pr-3"> Entries </Link>
                    <Link to="/stats" className="nav d-inline"> Stats </Link>
                </div>
            </div>
        )
    }
}
