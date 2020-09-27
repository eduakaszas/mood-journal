import React, { Component } from 'react'

import "./ThoughtDetangler.scss"

export class SituationForm extends Component {
    render() {
        const { title, onClick, onChange, name } = this.props

        return (
            <div className="situation-adder mb-4" >
                <form className='situation-form text-center'>
                    <label>
                        <h4 className="title mb-3"> { title } </h4>
                        <input 
                            className="input-field p-1 mt-3 mb-3"
                            type='text'
                            id='submit-input'
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

