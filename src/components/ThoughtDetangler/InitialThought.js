import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class InitialThought extends Component {
    render() {
        const { initialThought, onSubmit, onChange, isThoughtSubmitted  } = this.props

        return (
            <div>
                <form className="text-center float-left mt-5 pt-5 w-100" onSubmit={ onSubmit }>
                    <div className="itial-thought-title mb-4"> 
                        What is the thought that you are dwelling on? 
                    </div>
                    <input className="initial-thought-input" type="text" onChange={ onChange }></input>
                    <Link to="/prosCons"> Next </Link>
                </form>
            </div>
        )
    }
}
