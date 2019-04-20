import React from 'react';

import { VictoryBar, VictoryChart } from 'victory';

class BarChart extends React.Component {
    render() {
        const { moodList } = this.props
        
        return (
            <div>
                <VictoryChart domainPadding={ 25 } domain={{ y: [0, 10] }}>
                    <VictoryBar
                        data={[
                            {
                                x: 'Happy', y: 1
                            },
                            {
                                x: 'Okay', y: 2
                            },
                            {
                                x: 'Sad', y: 3
                            }
                        ] 
                    }/>
                </VictoryChart>
            </div>
        )
    }
}

export default BarChart;
