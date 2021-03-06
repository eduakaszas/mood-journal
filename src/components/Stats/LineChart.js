import React from 'react';

import { VictoryLine, VictoryChart } from 'victory';

export class LineChart extends React.Component {

    render() {
        const { lineData } = this.props

        return (
            <div>
                <VictoryChart style={{ parent: { width: "700px" } }}>
                    <VictoryLine
                        data={ lineData }
                    />
                </VictoryChart>
            </div>
        )
    }
}