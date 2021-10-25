import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import { BarChart } from '../../components/compIndex';

export class Stats extends Component {
  render() {
    const { barData, moodLog } = this.props;

    return (
      <Container>
        <div>
          {!moodLog ? (
            <h1>No data</h1>
          ) : (
            <>
              <BarChart barData={barData} />
            </>
          )}
        </div>
      </Container>
    );
  }
}
