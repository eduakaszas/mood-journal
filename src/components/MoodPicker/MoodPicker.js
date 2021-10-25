import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import './MoodPicker.scss';

export class MoodPicker extends Component {
  displayMoodList() {
    const { chooseMood, moodList, chosenMood } = this.props;

    const displayedMoods = moodList.map((mood) => {
      let src;

      if (mood.label === chosenMood) {
        src = mood.activeSrc;
      } else {
        src = mood.src;
      }

      return (
        <div className='mood-item' key={mood.label} onClick={chooseMood}>
          <input type='radio' id={mood.label} name='mood-input' />
          <label htmlFor={mood.label}>
            <img
              src={src}
              alt={mood.label}
              onClick={chooseMood}
              className='mood-img'
            />
          </label>
        </div>
      );
    });

    return displayedMoods;
  }

  render() {
    return (
      <Container>
        <div className='mood-container'>{this.displayMoodList()}</div>
      </Container>
    );
  }
}
