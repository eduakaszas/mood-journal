import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';

import { AwesomeActive, HappyActive, OkayActive, SadActive, AngryActive } from '../compIndex.js';
import './Entries.scss'

class Entries extends Component {
    displayEntryItems() {
        const { chooseMood, moodList, chosenMood } = this.props

        let moodData = this.props.getMoodLog()

        let displayedEntries = moodData.map( ( entry ) => {
            let displayedImage = moodList.map( ( item ) => {
                let src;
                if ( entry.mood === item.label ) {
                    src = item.activeSrc
                } else {
                    return;
                }

                return(
                    <div key={ item.label }>
                        <img src={ src } 
                            id="entryMoodImg"
                            className="mt-2"
                            alt={ item.label } 
                        />
                    </div>
                )
            })

                return (
                    <li key={ entry.mood } className="entry mt-5 ml-5 p-3">
                        <div className="imgBox"> { displayedImage } </div>
                        <h1 className="dateEntry" > { entry.date } </h1>
                        <h1 className="moodEntry"> { entry.mood } </h1>
                        <h1 className="noteEntry"> { entry.notes } </h1>
                    </li>
                )
        })

        return displayedEntries.reverse()
    }

    render() {
        return (
            <Container>
                <ul className="entries">
                    { this.displayEntryItems() }
                </ul>
            </Container>
        )
    }
}

export default Entries;