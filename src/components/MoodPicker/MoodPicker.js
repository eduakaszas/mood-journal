import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import './MoodPicker.scss';

export class MoodPicker extends Component {
    displayMoodList() {
        const { chooseMood, moodList, chosenMood, chosenActivities } = this.props;

        const displayedMoods = moodList.map( mood => {
            let src;

            if ( mood.label === chosenMood ) {
                src = mood.activeSrc
            } else {    
                src = mood.src
            }
            
            return (
                <Col xs={4} md={2} key={ `${ mood.label }_${ src }` }> 
                    <Link to='/editor'>
                        <img src={ src }
                            id={ mood.label } 
                            alt={ mood.label } 
                            onClick={ chooseMood }
                            className="mood-img mt-2"
                        />
                    </Link>
                </Col>
            ) 
        })

        return displayedMoods;
    };

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center mt-3">
                    { this.displayMoodList() }
                </Row>
            </Container>
        )
    }
};
