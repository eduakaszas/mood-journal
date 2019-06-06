import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
//import { AwesomeActive, HappyActive, OkayActive, SadActive, AngryActive } from '../compIndex.js';
import './Entries.scss'

class Entries extends Component {
    displayEntryItems() {
        const { moodList } = this.props

        let moodData = this.props.getMoodLog()

        if ( moodData === null ) {
            return <h1> There's nothing to see here, get out! </h1>
        } else {
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
                                className="entryMoodImg float-left mr-4"
                                alt={ item.label } 
                            />
                        </div>
                    )
                }) 
                    return (
                        <li key={ entry.notes } className="entry mt-4 ml-5 p-3">
                            <h1 className="imgEntry" > { displayedImage } </h1>
                            <h1 className="dateEntry" > { entry.date } </h1>
                            <h1 className="moodEntry mt-4"> { entry.mood } </h1><br />
                            <h1 className="noteEntry mb-4 ml-1"> { entry.notes } </h1><br />
                            <div className="activityEntry ml-5 pl-5"> { entry.activities.join(", ") } </div>
                        </li>
                    )
            })

            return displayedEntries
        }
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