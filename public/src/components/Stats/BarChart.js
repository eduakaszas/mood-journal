import React from 'react';

import { VictoryBar, VictoryChart } from 'victory';

class BarChart extends React.Component {
    render() {
        const { barData } = this.props
        
        return (
            <div>
                <VictoryChart domainPadding={ 30 } 
                            domain={{ y: [0, 10] }}
                            style={{ parent: { width: "55em", paddingTop: "8em" } }}
                >
                    <VictoryBar data={ barData }/>
                </VictoryChart>
            </div>
        )
    }
}

export default BarChart;
