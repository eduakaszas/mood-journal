import React, { Component } from 'react'

export class Cons extends Component {
    render() {
        const { title, onClick, onChange, name  } = this.props

        return (
            <div className="con-adder mb-4">
                <form className='con-form'>
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

