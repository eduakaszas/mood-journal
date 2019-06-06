import React, { Component } from 'react'

import { BarChart, LineChart } from '../../components/compIndex'

class Stats extends Component {
    render() {
        const { barData, lineData } = this.props
        
        return (
            <div>
                <BarChart barData={ barData } />
                <LineChart lineData={ lineData } />
            </div>
        )
    }
}

export default Stats;