import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import './MoodPicker.scss'

class MainMoods extends Component {
    displayMoodList() {
        const { chooseMood, moodList, chosenMood } = this.props

        let displayedMoods = moodList.map( ( mood ) => {
            let src;
            if ( mood.label === chosenMood )
                src = mood.activeSrc
            else    
                src = mood.src

            return (
                <li key={ mood.label } className="mood p-3">
                    <img src={ src } 
                        id={ mood.label } 
                        alt={ mood.label } 
                        onClick={ chooseMood }
                    />
                </li>
            )
        })

        return displayedMoods
    }

    render() {
        return (
            <Container>
                <ul className="moodList mt-4">
                    { this.displayMoodList() }
                </ul>
            </Container>
        )
    }
}

export default MainMoods;