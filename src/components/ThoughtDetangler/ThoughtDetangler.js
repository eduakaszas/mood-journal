import React, { Component } from 'react'

import { ThoughtAdder } from './ThoughtAdder'
import { ProsCons } from './ProsCons'

export class ThoughtDetangler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialThought: "",
            pros: [],
            cons: [], 
            balancedThought: ""
        };
    };

    addThought = ( ) => {
        const { initialThought, pros, cons, balancedThought } = this.state
        
        localStorage.setItem( 
            'thoughts', 
            JSON.stringify( { 
                initialThought,
                pros, 
                cons, 
                balancedThought                
            }) 
        )
    } 

    handleChange = ( date ) => {
        this.setState({
            pickedDate: Date.parse( date )
        }, () => {
            console.log( this.state.pickedDate )
        })
    }

    onChange = ( e ) => {
        this.setState({
            initialThought: e.target.value
        })
    } 

    addProsCons = ( e ) => {
        e.preventDefault()

        if ( e.target.id == 'pro-adder' ) {
            this.setState({
                pros: this.state.pros.concat( e.target.value ) 
            }, () => { 
                console.log( this.state.pros )
            }) 
        } 
    }

    render() {
        const { pros, cons } = this.state

        return (
            <div>
                <form className="text-center float-left mt-5 pt-5 w-100" onSubmit={ this.onSubmit }>
                
{/*                     <ThoughtAdder
                        title="What is the thought that you are dwelling on?"
                        onSubmit={ initialThought => this.setState({initialThought})}
                    />

                    <ThoughtAdder
                        title="What would be a more balanced thought?"
                        onSubmit={ balancedThought => this.setState({balancedThought})}
                    /> */}

                    <ProsCons
                        title="What is in favour of this thought?"
                        category="pros"
                        pros={ pros }
                        cons={ cons }
                        addProsCons= { this.addProsCons }
                    />

{/*                     <ProsCons
                        title="What is against this thought?"
                        category="cons"
                    /> */}

                    <input className="initial-thought-input" type="text" onChange={ this.onChange }></input>
                    <button type="button"> Next </button>
                </form>
            </div>
        )
    }
}


