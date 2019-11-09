import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';

import './Entries.scss'

export class Entries extends Component {
    displayEntryItems() {
        const { moodList } = this.props

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
            .map( ( entry ) => {
                let displayedImage = moodList.map( ( item ) => {
                    let src;

                    if ( entry.mood === item.label ) {
                        src = item.activeSrc
                    } else {
                        
                        return;
                    }

                    return(
                        <div key={ item.srcActive }>
                            <img src={ src } 
                                className="entry-mood-img float-left mr-4"
                                alt={ item.label } 
                            />
                        </div>
                    )
                })

                return (
                    <li key={ entry.notes } className="entry mt-4 p-2">
                        <h1 className="img-entry" > { displayedImage } </h1>
                        <h1 className="date-entry" > { new Date( entry.date ).toLocaleDateString('en-GB') } </h1>
                        <h1 className="mood-entry mt-4"> { entry.mood } </h1><br />
                        <h1 className="note-entry mb-4 ml-1"> { entry.notes } </h1><br />
                        <div className="activity-entry ml-5 pl-5"> { entry.activities.join("\xa0\xa0\xa0\xa0") } </div>
                    </li>
                )
            })

            return displayedEntries
        }
}

    render() {
        return (
            <Container>
                <div className="entries d-flex flex-column pt-5 w-100 m-4">
                    { this.displayEntryItems() }
                </div>
            </Container>
        )
    }
}