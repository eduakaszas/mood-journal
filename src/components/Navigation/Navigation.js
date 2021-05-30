import React, { Component } from 'react'

import { Link } from "react-router-dom";
import './Navigation.scss'

export class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        }
    }

    toggleHamburgerMenu = () => {
        this.setState({
            ...this.state,
            isMenuOpen : !this.state.isMenuOpen
        })
    }

    getHeaderClasses = () => `header ${ this.state.isMenuOpen ? "menu-opened" : "" }`
    getMenuItemClasses = () => `menu-item ${ this.state.isMenuOpen ? "menu-opened" : "" }`

    render() {
        return (
            <div className={ this.getHeaderClasses() }>
                <div className="burger-container" onClick={ this.toggleHamburgerMenu }>
                    <div id="burger">
                        <div className="bar top-bar"></div>
                        <div className="bar bottom-bar"></div>
                    </div>
                </div>
                <ul className="menu">
                    <li className={ this.getMenuItemClasses() } onClick={ this.toggleHamburgerMenu }>
                        <Link to="/" className="nav-link"> 
                            Home 
                        </Link>
                    </li>
                    <li className={ this.getMenuItemClasses() } onClick={ this.toggleHamburgerMenu }>
                        <Link to="/entries" className="nav-link"> 
                            Entries 
                        </Link>
                    </li>
                    <li className={ this.getMenuItemClasses() } onClick={ this.toggleHamburgerMenu }>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}
