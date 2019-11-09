import React, { Component } from 'react'

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import './Activities.scss'

export class Activities extends Component {
    displayActivities() {
        const { basicActivities, pickActivities } = this.props

        return basicActivities.map( ( activity ) => {
            return <div key={ activity.num } 
                        className="d-inline"
                    >
                        <ToggleButtonGroup type="checkbox"> 
                            <ToggleButton id={ activity.label }
                                        onClick={ pickActivities }
                                        className="activity m-2"
                            >
                                { activity.label } 
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
        })
    }

    render() {
        return (
            <>
                <div className="activityTitle mt-5"> Activities </div>
                <div className="activityContainer text-center">
                    { this.displayActivities() }
                </div>
            </>
        )
    }
}