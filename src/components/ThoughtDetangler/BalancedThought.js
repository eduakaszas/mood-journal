import React, { Component } from 'react'
import "./ThoughtDetangler.scss"

export class BalancedThought extends Component {
    render() {
        const { title, onChange, onSubmit } = this.props

        return (
            <div className="balanced-thought-adder mb-4" onSubmit={ onSubmit }>
                <form className='balanced-thought-form'>
                    <label>
                        <h4 className="title mb-3"> { title } </h4>
                        <input 
                            className="input-field p-1 mt-3 mb-3"
                            name='balancedThought'
                            type='text'
                            onChange={ onChange }
                        />
                        <input 
                            className="submit-button m-5"
                            type='submit'
                            value='Add'
                        />
                    </label>
                </form>
            </div>
        )
    }
}