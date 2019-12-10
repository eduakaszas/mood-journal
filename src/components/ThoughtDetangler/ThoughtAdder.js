import React, { Component } from 'react'

export class ThoughtAdder extends Component {
    render() {
        const { title  } = this.props

        return (
            <div>
                <div className="initial-thought-title mb-4"> 
                    {title}
                </div> 
            </div>
        )
    }
}
