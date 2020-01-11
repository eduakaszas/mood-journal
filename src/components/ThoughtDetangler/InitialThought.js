import React, { Component } from 'react'

export class InitialThought extends Component {
    render() {
        const { title, onSubmit, onClick, onChange, name } = this.props

        return (
            <div className="initial-thought-adder mb-4">
                <form className='initial-thought-form'>
                    <label>
                        { title }
                        <input 
                            id='submit-input'
                            type='text'
                            onChange={ onChange }
                        />
                        <input 
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