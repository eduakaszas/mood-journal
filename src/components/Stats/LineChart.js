import React from 'react';

import { VictoryLine, VictoryChart } from 'victory';

class LineChart extends React.Component {

    render() {
        const { lineData } = this.props

        return (
            <div>
                <VictoryChart>
                    <VictoryLine
                        data={ lineData }
                    />
                </VictoryChart>
            </div>
        )
    }
}

export default LineChart;