import React from 'react';

import { VictoryBar, VictoryChart } from 'victory';

class BarChart extends React.Component {
    render() {
        const { data } = this.props
        
        return (
            <div>
                <VictoryChart domainPadding={ 25 } domain={{ y: [0, 10] }}>
                    <VictoryBar
                        data={ data }/>
                </VictoryChart>
            </div>
        )
    }
}

export default BarChart;
