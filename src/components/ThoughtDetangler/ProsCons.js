import React, { Component } from 'react'

class InitialThought extends Component {
    render() {
        const { initialThought, onSubmit, onChange, isThoughtSubmitted  } = this.props

        return (
            <div>
                <form className="text-center float-left mt-5 pt-5 w-100" onSubmit={ onSubmit }>
                    <div className="itial-thought-title mb-4"> 
                        What is the thought that you are dwelling on? 
                    </div>
                    <input className="initial-thought-input" type="text" onChange={ onChange }></input>
                    <button type="submit"> Enter </button>
                </form>
            </div>
        )
    }
}

export default InitialThought;