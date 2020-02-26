import React, { Component } from 'react'
import "./ThoughtDetangler.scss"

export class InitialThought extends Component {
    render() {
        const { title, onSubmit, onClick, onChange, name } = this.props

        return (
            <div className="initial-thought-adder mb-4">
                <form className='initial-thought-form'>
                    <label>
                        <h4 className="title mb-3"> { title } </h4>
                        <input 
                            className="input-field p-1 mt-3 mb-3"
                            id='submit-input'
                            type='text'
                            onChange={ onChange }
                        />
                        <input 
                            className="submit-button m-5"
                            type='button'
                            name={ name }
                            id='submitButton'
                            value='Add'
                            onClick={ onClick }
                        />
                    </label>
                </form>
            </div>
        )
    }
}