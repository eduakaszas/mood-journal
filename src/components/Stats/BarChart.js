import React from 'react';

import { VictoryBar, VictoryChart, VictoryGroup } from 'victory';

export class BarChart extends React.Component {
    render() {
        const { barData } = this.props
        
        return (
            <div>
                <VictoryChart domainPadding={ 30 } 
                            domain={{ y: [0, 10] }}
                            style={{ parent: { width: "45em" } }}
                            
                >
                    <VictoryGroup colorScale={["tomato", "orange", "gold"]}>
                        <VictoryBar data={ barData }/>
                    </VictoryGroup>
                </VictoryChart>
            </div>
        )
    }
}

