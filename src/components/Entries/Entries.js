import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';

import '../../scss/main.scss'

class Entries extends Component {
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
                                className="entryMoodImg float-left mr-4"
                                alt={ item.label } 
                            />
                        </div>
                    )
                }) 

                return (
                    <li key={ entry.notes } className="entry mt-4 ml-5 p-3">
                        <h1 className="imgEntry" > { displayedImage } </h1>
                        <h1 className="dateEntry" > { new Date( entry.date ).toLocaleDateString('en-GB') } </h1>
                        <h1 className="moodEntry mt-4"> { entry.mood } </h1><br />
                        <h1 className="noteEntry mb-4 ml-1"> { entry.notes } </h1><br />
                        <div className="activityEntry ml-5 pl-5"> { entry.activities.join("\xa0\xa0\xa0\xa0") } </div>
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