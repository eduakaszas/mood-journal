import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import { MoodPicker, MoodDatePicker } from '../../components/compIndex'
import RightArrow from './right_arrow.svg'
import './StartPage.scss'

export class StartPage extends Component {
    showNextButton = () => {
        const { chosenMood } = this.props;

        if ( chosenMood !== null ) {
            return <img src={ RightArrow } className='next-button mt-5' alt='next-arrow-button'/> 
        }
    }

    render() {
        const { chooseMood, moodList, chosenMood, pickedDate, onChange } = this.props;

        return (
            <Container className='container w-100 mt-5 float-left text-center'>
                <div className='title mt-4'> How are you feeling today? </div>
                <div className='date m-5'>
                    <div> Date: </div>
                    <MoodDatePicker 
                        pickedDate={ pickedDate }
                        handleChange={ onChange }
                    /> 
                </div>
                <MoodPicker 
                    chooseMood={ chooseMood } 
                    moodList={ moodList } 
                    chosenMood={ chosenMood }
                />
                <Link to='/editor'> { this.showNextButton() } </Link>
            </Container>
        ) 
    }
}
