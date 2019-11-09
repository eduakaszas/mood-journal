import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { InitialThought as ThoughtDetangler, Stats, Navigation, Entries, EntryLogger, StartPage } from './components/compIndex.js';
import { Awesome, Happy, Okay, Sad, Angry, AwesomeActive, HappyActive, OkayActive, SadActive, AngryActive } from './components/compIndex.js';
import './App.scss';

let moodList = [
    { 
        src: Awesome,
        activeSrc: AwesomeActive,
        label: "Awesome"
    },
    { 
        src: Happy,
        activeSrc: HappyActive,
        label: "Happy"
    },
    { 
        src: Okay,
        activeSrc: OkayActive,
        label: "Okay"
    },
    { 
        src: Angry,
        activeSrc: AngryActive,
        label: "Angry"
    },
    { 
        src: Sad,
        activeSrc: SadActive,
        label: "Sad"
    }
];

let basicActivities = [
    { 
        label: "Work",
        num: "1"
    },
    { 
        label: "Sport",
        num: "2"
    },
    { 
        label: "Friends",
        num: "3"
    },
    { 
        label: "Good meal",
        num: "4"
    },
    { 
        label: "Shopping",
        num: "5"
    },
    { 
        label: "Relax",
        num: "6"
    },
    { 
        label: "Reading",
        num: "7"
    }
]

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenMood: null,
            moodList: moodList,
            pickedDate: Date.now(),
            chosenActivities: [], 
            initialThought: "",
            prosOfThought: "",
            consOfThought: "", 
            balancedThought: ""
        };
        
    };
    
    chooseMood = ( e ) => {
        let clickedMood = e.target.id
        
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
        const { chosenMood } = this.state
        
        const moodLog = this.getMoodLog()
        
        // if mood item in localStorage is the same as the item I clicked on,
        // ( aka the state ), return it 
        const moodCount = moodLog.filter( e => e.mood === chosenMood )
        console.log( moodCount.length ) 
    };

    pickActivities = ( e ) => {
        const { chosenActivities } = this.state 
        
        
        let clickedActivity = e.target.id
        
        // Cannot prevent default because event needs to bubble up for bootstrap, instead return
        //e.preventDefault()
        if ( clickedActivity === "" ) return

        if ( chosenActivities.includes( clickedActivity ) ) {
            let uniqueActivities = chosenActivities.filter( ( activity ) => {
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
    } 

    resetValues = () => {
        this.setState({
            chosenMood: null,
            chosenActivities: []
        })
    }
    
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

    handleChange = ( date ) => {
        this.setState({
            pickedDate: Date.parse( date )
        }, () => {
            console.log( this.state.pickedDate )
        })
    }

    onChange = ( e ) => {
        this.setState({
            initialThought: e.target.value
        })
    } 

    render() {
        const { moodList, chosenMood, pickedDate, chosenActivities, initialThought, isThoughtSubmitted } = this.state
        console.log( this.state.initialThought )
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
                            onChange={ this.handleChange }
                        />
                    } 
                />
                <Route 
                    exact 
                    path="/thought-detangler" 
                    render={ (props) => 
                        <ThoughtDetangler
                            initialThought={ initialThought }
                            isThoughtSubmitted={ isThoughtSubmitted }
                            onChange={ this.onChange }
                            onSubmit={ this.onSubmit }
                        />
                    } 
                />
                <Route 
                    exact 
                    path="/entries" 
                    render={ (props) => 
                        <Entries 
                            getMoodLog={ this.getMoodLog }
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            pickedDate={ pickedDate }
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
                />
            </Container>
        );
    }
}

export default App;
