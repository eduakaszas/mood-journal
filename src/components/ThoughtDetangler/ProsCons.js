import React, { Component } from 'react'

export class ProsCons extends Component {
    render() {
        const { title, addProsCons, pros, cons  } = this.props

        return (
            <div>
                <div className="proscons-title mb-4"> 
                    { title }
                    <div className="pros-form">
                        <input />
                        <button id='pro-adder' onClick= { addProsCons } > Add </button>

                        <ul> { pros } </ul>

                    </div>

{/*                     <form className="cons-form">
                        <input id="con-adder"></input>
                        <button onClick= { addProsCons } > Add </button>

                        <ul></ul>

                        <button> Next </button>
                    </form> */}
                
                </div> 
            </div>
        )
    }
}

