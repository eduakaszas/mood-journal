import React, { Component } from 'react'

import { Link } from "react-router-dom";
import { MoodPicker, MoodDatePicker, RightArrow } from '../../components/compIndex'
import './StartPage.scss'

class StartPage extends Component {
    showRightArrow = () => {
        const { chosenMood } = this.props;

        if ( chosenMood !== null )
            return <img src={ RightArrow } className='toEditor mt-2' alt='arrow'/> 
    }

    render() {
        const { chooseMood, moodList, chosenMood, pickedDate, onChange } = this.props;

        return (
            <React.Fragment>
                <div className="moodChooser text-center mt-5 pt-5">
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

                <div className="text-center">
                    <Link to="/editor"> { this.showRightArrow() } </Link>
                </div>

                <Link to="/entries"> Entries </Link><br/>
                <Link to="/barchart"> BarChart </Link><br/>
                <Link to="/linechart"> LineChart </Link>
            </React.Fragment>
        )
    }
}

export default StartPage;
