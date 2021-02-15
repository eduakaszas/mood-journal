import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import './MoodPicker.scss';

export class MoodPicker extends Component {
    displayMoodList() {
        const { chooseMood, moodList, chosenMood } = this.props;

        const displayedMoods = moodList.map( mood => {
            let src;

            if ( mood.label === chosenMood ) {
                src = mood.activeSrc
            } else {    
                src = mood.src
            }
            
            return (
                <a 
                    key={ `${ mood.label }_${ src }` } 
                    className="mood-link"
                    href="#"
                >
                    <img 
                        src={ src }
                        id={ mood.label } 
                        alt={ mood.label } 
                        onClick={ chooseMood }
                        className="mood-img"
                    />
                </a>
            ) 
        })

        return displayedMoods;
    };

    render() {
        return (
            <Container>
                <div className="mood-container">
                    { this.displayMoodList() }
                </div>
            </Container>
        )
    }
};
