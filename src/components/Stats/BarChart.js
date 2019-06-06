import React from 'react';

import { VictoryBar, VictoryChart } from 'victory';

class BarChart extends React.Component {
    render() {
        const { barData } = this.props
        
        return (
            <div>
                <VictoryChart domainPadding={ 25 } domain={{ y: [0, 10] }}>
                    <VictoryBar
                        data={ barData }/>
                </VictoryChart>
            </div>
        )
    }
}

export default BarChart;
