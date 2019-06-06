import React, { Component } from 'react'

import { Link } from "react-router-dom";
import { MoodPicker, MoodDatePicker, RightArrow } from '../../components/compIndex'
import './StartPage.scss'

class StartPage extends Component {
    showNextButton = () => {
        const { chosenMood } = this.props;

        if ( chosenMood !== null )
            return <img src={ RightArrow } className='nextButton mt-5' alt='arrow'/> 
    }

    render() {
        const { chooseMood, moodList, chosenMood, pickedDate, onChange } = this.props;

        return (
            <React.Fragment>
                <div className="moodChooser text-center position-absolute">
                    <h1> How are you feeling? </h1>
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
            </React.Fragment>
        )
    }
}

export default StartPage;
