import React, { Component } from 'react'

export class BalancedThought extends Component {
    render() {
        const { title, onChange, onSubmit } = this.props

        return (
            <div className="balanced-thought-adder mb-4" onSubmit={ onSubmit }>
                <form className='balanced-thought-form'>
                    <label>
                        { title }
                        <input 
                            name='balancedThought'
                            type='text'
                            onChange={ onChange }
                        />
                        <input 
                            type='submit'
                            value='Add'
                        />
                    </label>
                </form>
            </div>
        )
    }
}