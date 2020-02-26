import React, { Component } from 'react'
import "./ThoughtDetangler.scss"

export class Cons extends Component {
    render() {
        const { title, onClick, onChange, name  } = this.props

        return (
            <div className="con-adder mb-4">
                <form className='con-form'>
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

