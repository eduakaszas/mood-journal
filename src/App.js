import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Stats, Navigation, Entries, EntryLogger, StartPage } from './components/compIndex.js';
import { Awesome, Happy, Okay, Sad, Angry, AwesomeActive, HappyActive, OkayActive, SadActive, AngryActive } from './components/compIndex.js';
import './App.scss';

let moodList = [
    { 
        src: AwesomeActive,
        activeSrc: AwesomeActive,
        label: "Awesome",
        color: "#A2C084"
    },
    { 
        src: HappyActive,
        activeSrc: HappyActive,
        label: "Happy",
        color: "#F6EC65"
    },
    { 
        src: OkayActive,
        activeSrc: OkayActive,
        label: "Okay",
        color: "#FFBB5B"
    },
    { 
        src: AngryActive,
        activeSrc: AngryActive,
        label: "Angry",
        color: "#E36371"
    },
    { 
        src: SadActive,
        activeSrc: SadActive,
        label: "Sad",
        color: "#92AEC7"
    }
];

let basicActivities = [
    { 
        label: "Work",
        num: "1",
        faClass: "briefcase"
    },
    { 
        label: "Sport",
        num: "2",
        faClass: "volleyball-ball"
    },
    { 
        label: "Friends",
        num: "3", 
        faClass: "users"
    },
    { 
        label: "Good meal",
        num: "4", 
        faClass: "utensils"
    },
    { 
        label: "Shopping",
        num: "5", 
        faClass: "shopping-cart"
    },
    { 
        label: "Date",
        num: "6",
        faClass: "heart"
    },
    { 
        label: "Reading",
        num: "7", 
        faClass: "book"
    }
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moodList: moodList,
            chosenMood: null,
            pickedDate: Date.now(),
            chosenActivities: [],
            entryNote: null,
            entries: null,
            entryId: null
        };
        
    };
    
    chooseMood = e => {
        const { chosenMood } = this.state;
        let clickedMood = e.target.id;
        
        if ( chosenMood == clickedMood ) {
            clickedMood = null
        }
        
        this.setState({
            chosenMood: clickedMood
        }, () => { 
            console.log( this.state.chosenMood )
        })
    };

    //function for getting moodLog from the localStorage
    getMoodLog = () => JSON.parse(localStorage.getItem( 'moodLog' ));
    
    // count how many times a mood item is clicked on
    moodCounter = () => {
        const { chosenMood } = this.state;
        
        const moodLog = this.getMoodLog();
        
        // if mood item in localStorage is the same as the item that is clicked,
        // ( aka the state ), return it 
        const moodCount = moodLog.filter( e => e.mood === chosenMood )
        console.log( moodCount.length ) 
    };

    pickActivities = e => {
        const { chosenActivities } = this.state;
        
        let clickedActivity = e.target.id;
        
        // Cannot prevent default because event needs to bubble up for bootstrap, instead return
        // e.preventDefault()
        if ( clickedActivity === "" ) return;

        if ( chosenActivities.includes( clickedActivity ) ) {
            let uniqueActivities = chosenActivities.filter( activity => {
                return activity !== clickedActivity
            })

            this.setState({
                chosenActivities: uniqueActivities
            })
            
        } else {
            let updatedActivities = chosenActivities.concat( clickedActivity )

            this.setState({
                chosenActivities: updatedActivities
            }, () => {
                console.log( this.state.chosenActivities )
            })  
        }
    }; 

    getColorOfMood = mood => {
        const { moodList, chosenMood } = this.state;

        const moodContainer = moodList.find( el => el.label === mood )

        if ( !moodContainer ) {
            return 
        } else {
            return moodContainer.color
        }
    }

    deleteEntry = key => {
        const moodLog = this.getMoodLog();

        const remainingEntries = moodLog.filter( entry => key !== `${entry.date}_${entry.mood}` )

        const updatedEntries = localStorage.setItem( 'moodLog', JSON.stringify( remainingEntries ))

        this.setState({
            entries: updatedEntries
        })
    }

    editEntry = id => {
        const { entryId } = this.state;
        const moodLog = this.getMoodLog();

        return moodLog.find( entry => id == `${entry.date}_${entry.mood}`?
                                                    this.setState({
                                                        entryId: id,
                                                        chosenMood: entry.mood,
                                                        chosenActivities: entry.activities,
                                                        entryNote: entry.notes
                                                    }, () => {
                                                        console.log( `The mood is ${this.state.chosenMood}, activities are ${this.state.chosenActivities} and the added note is ${this.state.entryNote}` )
                                                    })  
                                                : null 
                                        )
    }

    resetValues = () => {
        this.setState({
            chosenMood: null,
            chosenActivities: []
        })
    };

    handleDateChange = date => {
        this.setState({
            pickedDate: date
        })
    };
    
    prepareBarChart = () => {
        const { moodList } = this.state
        
        const moodLog = this.getMoodLog()
        
        if ( moodLog === null ) {
            return moodList.map( entry => {
                return { x: entry.label, y: 0 }
            })

            /*
                if in oneliner you want to return an object, wrap it in '()',
                otherwise the {} of the object will clash with the {} of the function
                
                return moodList.map( entry => ( { x: entry.label, y : 0 } ) )
            */
        }

        return moodList.map( entry => {
            const moods = moodLog.filter( item => {
                if ( entry.label === item.mood ) {
                    return true
                }
            })
            
            return { x: entry.label, y: moods.length }
        })
    };

    render() {
        const { moodList, chosenMood, pickedDate, chosenActivities, entries, entryId, entryNote } = this.state

        return (
            <Container>
                <Navigation />
                <Route 
                    exact 
                    path="/" 
                    render={ (props) => 
                        <StartPage 
                        chooseMood={ this.chooseMood } 
                        moodList={ moodList }
                        chosenMood={ chosenMood }
                        pickedDate={ pickedDate }
                        onChange={ this.handleDateChange }
                        />
                    } 
                    />
                {/* <Route 
                    exact 
                    path="/thought-detangler" 
                    render={ (props) => 
                        <ThoughtDetangler />
                    } 
                /> */}
                <Route 
                    exact 
                    path="/entries" 
                    render={ (props) => 
                        <Entries 
                            getMoodLog={ this.getMoodLog }
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            chosenActivities={ chosenActivities }
                            basicActivities={ basicActivities }
                            pickedDate={ pickedDate }
                            getColorOfMood={ this.getColorOfMood }
                            deleteEntry={ this.deleteEntry }
                            editEntry={ this.editEntry }
                        />
                    } 
                />
                <Route 
                    path="/stats" 
                    render={ (props) => 
                        <Stats
                            moodCounter={ this.moodCounter }
                            moodLog={ this.getMoodLog() }
                            barData={ this.prepareBarChart() }
                        />
                    } 
                />

                <EntryLogger 
                    moodList={ moodList }
                    chosenMood={ chosenMood }
                    pickedDate={ pickedDate }
                    moodCounter={ this.moodCounter }
                    getMoodLog={ this.getMoodLog }
                    basicActivities={ basicActivities }
                    chosenActivities={ chosenActivities }
                    pickActivities={ this.pickActivities }
                    resetValues={ this.resetValues }
                    entries= { entries }
                    entryId={ entryId }
                    entryNote={ entryNote }
                    editEntry={ this.editEntry }
                />
                {/* { this.getColorOfMood() } */}
            </Container>
        );
    }
}

export default App;
