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
                                className="entry-mood-img"
                                alt={ item.label } 
                            />
                        </div>
                    )
                })

                return (
                    <li key={ entry.notes } className="entry mt-5 p-3">
                        <div className="date-entry float-left" > 
                            { new Date( entry.date ).toLocaleDateString('en-GB') } 
                            
                        </div>
                        <div className="text w-50">
                            <div className="note-entry"> { entry.notes } </div><br />
                            <div className="activity-entry"> { entry.activities.join("\xa0\xa0\xa0\xa0") } </div><br />
                        </div>
                        <div className="img-entry float-right" > { displayedImage } </div>
                        {/*<h1 className="mood-entry mt-4"> { entry.mood } </h1><br /> */}
                    </li>
                )
            })

            return displayedEntries
        }
}

    render() {
        return (
            <Container>
                <div className="entries float-left">
                    { this.displayEntryItems() }
                </div>
            </Container>
        )
    }
}