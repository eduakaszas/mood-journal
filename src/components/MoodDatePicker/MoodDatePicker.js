import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MoodDatePicker.scss';

export class MoodDatePicker extends Component {
  render() {
    const { pickedDate, handleChange } = this.props;

    return (
      <div>
        <DatePicker
          selected={pickedDate}
          onChange={handleChange}
          dateFormat='dd/MM/yyyy'
          withPortal
        />
      </div>
    );
  }
}
