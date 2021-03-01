import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import { ActivityLogo, OptionsMenu } from '../../components/compIndex.js';
import './Entries.scss'

export class Entries extends Component {
    displayEntryItems() {
        const { moodList, basicActivities, deleteEntry, editEntry } = this.props

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
                        return null;
                    }

                    return(
                        <img src={ src } 
                            className="entry-mood-img"
                            alt={ item.label } 
                            key={ `${item.label}_${src}` }
                        />
                    )
                }).filter( x => x );

                return (
                    <li key={ `${entry.date}_${entry.mood}` } className="entry">
                        <div className="entry-img"> { displayedImage } </div>
                        <div className="entry-text-content">
                            <div className="entry-date mb-2"> 
                                { new Date( entry.date ).toLocaleDateString('en-GB') } 
                            </div>
                            <h4 className="entry-mood"> 
                                { entry.mood } 
                            </h4>
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
                                ?  <div className="entry-note" value={ entry.notes }> { entry.notes } </div>
                                : null
                            }
                        </div>
                        <div className="options">
                            <OptionsMenu 
                                deleteEntry={ () => deleteEntry(`${entry.date}_${entry.mood}`) } 
                                editEntry={ () => editEntry(`${entry.date}_${entry.mood}`) } 
                            />
                        </div>
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
