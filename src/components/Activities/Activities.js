import React, { Component } from 'react'

import './Activities.scss'

class Activities extends Component {
    displayActivities() {
        const { basicActivities, pickActivities } = this.props

        return basicActivities.map( ( activity ) => {
            return <div id={ activity.label } 
                        key={ activity.num } 
                        onClick={ pickActivities }
                        className="d-inline"
                    > 
                        <button className="activity p-2 m-2">
                            { activity.label } 
                        </button>
                    </div>
        })
    }

    render() {
        return (
            <div>
                <div className="activityTitle mt-5"> Activities </div>
                <div className="activityContainer m-2 text-center">
                    { this.displayActivities() }
                </div>
            </div>
        )
    }
}

export default Activities;