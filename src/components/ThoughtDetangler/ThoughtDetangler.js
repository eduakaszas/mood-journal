import React, { Component } from 'react'

import { initialThought, InitialThought } from './InitialThought.js'

export class ThoughtDetangler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialThought: "",
            prosOfThought: "",
            consOfThought: "", 
            balancedThought: ""
        };
    };

    handleChange = ( date ) => {
        this.setState({
            pickedDate: Date.parse( date )
        }, () => {
            console.log( this.state.pickedDate )
        })
    }

    onChange = ( e ) => {
        this.setState({
            initialThought: e.target.value
        })
    } 

    render() {
        return (
            <div>
                <InitialThought />
            </div>
        )
    }
}


