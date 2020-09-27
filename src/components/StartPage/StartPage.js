import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MoodPicker, MoodDatePicker } from '../../components/compIndex';
import './StartPage.scss';

export class StartPage extends Component {
    render() {
        const { chooseMood, moodList, chosenMood, chosenActivities, pickedDate, onChange } = this.props;

        return (
            <Container fluid>
                <div className='page-title mb-4'> How are you feeling today? </div>
                {/* <div className='date m-5'>
                    <div> Date: </div>
                    <MoodDatePicker 
                        pickedDate={ pickedDate }
                        handleChange={ onChange }
                    /> 
                </div> */}
                <MoodPicker 
                    chooseMood={ chooseMood } 
                    moodList={ moodList } 
                    chosenMood={ chosenMood }
                />
            </Container>
        ) 
    }
};

