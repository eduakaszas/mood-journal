import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import { MoodPicker, MoodDatePicker } from '../../components/compIndex';
import { Link } from 'react-router-dom';
import './StartPage.scss';

export class StartPage extends Component {
    render() {
        const { chooseMood, moodList, chosenMood, chosenActivities, pickedDate, onChange } = this.props;

        return (
            <Container fluid>
                <h1 className='page-title'> How are you feeling today? </h1>
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
                <div className="button-container">
                    <Link to='/editor' >
                        <button className="continue-button arrow">
                            Continue
                        </button>
                    </Link>
                </div>
            </Container>
        ) 
    }
};

