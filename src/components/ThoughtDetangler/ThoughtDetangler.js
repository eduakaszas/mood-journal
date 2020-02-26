import React, { Component } from 'react'

import { SituationForm, InitialThought, Pros, Cons, BalancedThought } from '../../components/compIndex.js'

const initialState = {
    situation: '',
    initialThought: '',
    pros: '',
    cons: '', 
    balancedThought: ''
}

export class ThoughtDetangler extends Component {
    constructor(props) {
        super(props);

        this.state = initialState
    };

    addThought = ( ) => {
        const { situation, initialThought, pros, cons, balancedThought } = this.state
        
        localStorage.setItem( 
            'thoughts', 
            JSON.stringify( { 
                situation,
                initialThought,
                pros, 
                cons, 
                balancedThought                
            }) 
        )
    } 

    onChange = e => {
        let contentOfInput = e.target.value
        let nameOfInput = e.target.name

        console.log( contentOfInput )
        //console.log( nameOfInput )
    }  

    onClick = e => {
        e.preventDefault()

        let submitInput = document.getElementById('submit-input')
        let contentOfInput = submitInput.value
        let nameOfInput = e.target.name

        console.log( contentOfInput )
        console.log( nameOfInput )

        this.setState({
            [nameOfInput]: contentOfInput
        }, () => { 
            this.addThought()
        })
    }

    displayComponent = () => {
        const { situation, initialThought, pros, cons, balancedThought } = this.state

        if ( situation == '' ) {
            return <SituationForm 
                        title='Identify the situation (where? when? who?)'
                        name='situation'
                        onChange={ this.onChange }
                        onSubmit={ this.onSubmit }
                        onClick={ this.onClick }
                    />
        } else if ( situation !== '' && initialThought == '' ) {
            return <InitialThought 
                        title='What thought went through your head initially?'
                        name='initialThought'
                        onChange={ this.onChange }
                        onSubmit={ this.onSubmit }
                        onClick={ this.onClick }
                    />
        } else if ( initialThought !== '' && pros == '' ) {
            return <Pros 
                        title="What is in favour of this thought?"
                        name='pros'
                        onChange={ this.onChange }
                        onSubmit={ this.onSubmit }
                        onClick={ this.onClick }
                    /> 
        } else if ( pros !== '' && cons == '' ) {
            return <Cons
                        title="What is against this thought?"
                        name='cons'
                        onChange={ this.onChange }
                        onSubmit={ this.onSubmit }
                        onClick={ this.onClick }
                    />
        } else if ( cons !== '' && balancedThought == '' ) {
            return <BalancedThought />
        }
    }

    render() {
        return (
            <div className='text-center float-left mt-5 pt-5 w-100'>
                { this.displayComponent() }
            </div>
        )
    }
}


