import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";
import { MoodPicker, MoodDatePicker } from '../../components/compIndex'
import RightArrow from './right_arrow.svg'
import './StartPage.scss'

export class StartPage extends Component {
    showNextButton = () => {
        const { chosenMood } = this.props;

        if ( chosenMood !== null )
            return <img src={ RightArrow } className='nextButton mt-5' alt='arrow'/> 
    }

    render() {
        const { chooseMood, moodList, chosenMood, pickedDate, onChange } = this.props;

        return (
            <Container>
                <div className="moodChooser text-center float-left w-100 mt-5">
                    <h1 className="startPageTitle w-100 mt-5"> How are you feeling? </h1>
                    <MoodDatePicker 
                            pickedDate={ pickedDate }
                            handleChange={ onChange }
                    /> 
                    <MoodPicker 
                            chooseMood={ chooseMood } 
                            moodList={ moodList } 
                            chosenMood={ chosenMood }
                    />
                </div>
                <div className="float-right">
                    <Link to="/editor"> { this.showNextButton() } </Link>
                </div>
            </Container>
        )
    }
}
