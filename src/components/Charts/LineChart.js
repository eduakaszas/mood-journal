import React from 'react';

import { VictoryLine, VictoryChart } from 'victory';

class LineChart extends React.Component {

    render() {
        const { data } = this.props

        return (
            <div>
                <VictoryChart>
                    <VictoryLine
                        data={ data }
                    />
                </VictoryChart>
            </div>
        )
    }
}

export default LineChart;