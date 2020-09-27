import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import { ActivityLogo, OptionsMenu } from '../../components/compIndex.js';
import './Entries.scss'

export class Entries extends Component {
    displayEntryItems() {
        const { moodList, basicActivities, getColorOfMood, deleteEntry, editEntry } = this.props

        let moodData = this.props.getMoodLog()
        console.log( moodData )

        if ( moodData === null ) {
            return <h1> No entries </h1>
        } else {
            let displayedEntries = moodData
            .sort(( a, b ) => {
                if ( a.date > b.date ) {
                    return -1
                } else if ( a.date < b.date ) {
                    return 1
                } else {
                    return 0
                }
            })
            .map( entry => {
                let displayedImage = moodList.map( item => {
                    let src;

                    if ( entry.mood === item.label ) {
                        src = item.activeSrc
                    } else {
                        return;
                    }

                    return(
                        <img src={ src } 
                            className="entry-mood-img"
                            alt={ item.label } 
                            key={ `${item.label}_${src}` }
                        />
                    )
                })

                return (
                    <li key={ `${entry.date}_${entry.mood}` } className="entry mb-3 p-3">
                        <OptionsMenu 
                            deleteEntry={ () => deleteEntry(`${entry.date}_${entry.mood}`) } 
                            editEntry={ () => editEntry(`${entry.date}_${entry.mood}`) } 
                        />
                        <div className="entry-img d-inline-block align-top"> { displayedImage } </div>
                        <div className="entry-text-content d-inline-block w-75 ml-3">
                            <div className="entry-date mb-2"> 
                                { new Date( entry.date ).toLocaleDateString('en-GB') } 
                            </div>
                            <div className="entry-mood mb-2" style={{ color: getColorOfMood(entry.mood) }}> { entry.mood } </div>
                            <div className="activity-entry"> 
                                { entry.activities.map(x => <ActivityLogo
                                                                key={`${entry.date}_${x}`}
                                                                activity={x} 
                                                                basicActivities={ basicActivities }
                                                                />
                                                                )}
                                {/* { entry.activities.join("\xa0\xa0\xa0\xa0") }  */}
                            </div>
                            { entry.notes 
                                ?  <div className="entry-note mt-3" value={ entry.notes }> { entry.notes } </div>
                                : null
                            }
                        </div>
                        {/* <button className="delete-button inline float-right align-top"
                                type="button"
                                onClick={ () => deleteEntry(`${entry.date}_${entry.mood}`) }
                        > 
                            x 
                        </button> */}
                    </li>
                )
            })

            return displayedEntries
        }
}

    render() {
        return (
            <Container fluid>
                <ul className="entries">
                    { this.displayEntryItems() }
                </ul>
            </Container>
        )
    } 
}