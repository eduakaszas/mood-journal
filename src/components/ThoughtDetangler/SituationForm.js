import React, { Component } from 'react'

export class SituationForm extends Component {
    render() {
        const { title, onSubmit, onClick, onChange, name } = this.props

        return (
            <div className="situation-adder mb-4" >
                <form className='situation-form'>
                    <label>
                        { title }
                        <input 
                            type='text'
                            id='submit-input'
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

