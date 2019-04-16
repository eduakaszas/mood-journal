import React, { Component } from 'react'

import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { MoodPicker, RightArrow } from '../../components/compIndex'
import './StartPage.scss'

class StartPage extends Component {
    showRightArrow = () => {
        const { chosenMood  } = this.props;

        if ( chosenMood !== null )
            return <img src={ RightArrow } onClick={ this.props.storeItems } className='toEditor mt-2' alt='arrow'/> 
    }

    render() {
        const { chooseMood, moodList, chosenMood  } = this.props;

        return (
            <Container>
                <div className="moodChooser text-center mt-5 pt-5">
                    <h1 className="mb-5"> How are you feeling? </h1>
                    <MoodPicker chooseMood={ chooseMood } 
                                moodList={ moodList } 
                                chosenMood={ chosenMood }
                    />
                </div>
                <div className="text-center">
                    <Link to="/editor"> { this.showRightArrow() } </Link>
                </div>
            </Container>
        )
    }
}

export default StartPage;
