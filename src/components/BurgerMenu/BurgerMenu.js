import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'

import './BurgerMenu.scss'

class BurgerMenu extends Component {
    render() {
        return (
                <Menu noOverlay pageWrapId={"page-wrap"} outerContainerId={ "outer-container" }>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/">About</a>
                    <a id="contact" className="menu-item" href="/">Contact</a>
                    <a className="menu-item--small" href="/">Settings</a>
                </Menu>
        )
    }
}

export default BurgerMenu;
