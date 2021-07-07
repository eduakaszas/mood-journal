import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import { MoodPicker } from '../../components/compIndex';
import { Link } from 'react-router-dom';
import './StartPage.scss';

export class StartPage extends Component {
    render() {
        const { chooseMood, moodList, chosenMood } = this.props;

        return (
            <Container fluid>
                <h1 className='page-title'> How are you feeling today? </h1>
                <MoodPicker 
                    chooseMood={ chooseMood } 
                    moodList={ moodList } 
                    chosenMood={ chosenMood }
                />
                {
                    chosenMood !== null ?
                        <div className="button-container">
                            <Link to='/editor' >
                                <button className="continue-button arrow">
                                    Continue
                                </button>
                            </Link>
                        </div> 
                        : null
                }
            </Container>
        ) 
    }
};

