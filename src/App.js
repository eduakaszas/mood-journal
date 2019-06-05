import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Entries, EntryLogger, BarChart, StartPage, LineChart } from './components/compIndex.js';
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
        label: "Fucking shit up",
        num: "id1"
    },
    { 
        label: "Eating",
        num: "id2"
    },
    { 
        label: "Sleeping",
        num: "id3"
    },
    { 
        label: "Watching porn",
        num: "id4"
    },
    { 
        label: "Spending hours on Youtube",
        num: "id5"
    },
]

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenMood: null,
            moodList: moodList,
            pickedDate: new Date(),
            chosenActivities: null
        };
        
    };
    
    // update state by clicking on a mood item
    chooseMood = ( e ) => {
        let clickedMood = e.target.id
        
        this.setState({
            chosenMood: clickedMood
        }, () => { 
            console.log( this.state.chosenMood )
        })
    };

    //separate funxtion just for getting moodLog from the localStorage
    getMoodLog = () => JSON.parse(localStorage.getItem( 'moodLog' ));
    
    // count how many times a mood item is clicked on
    moodCounter = () => {
        const { chosenMood } = this.state
        
        const moodLog = this.getMoodLog()
        
        // if mood item in localStorage is the same as the item I clicked on,
        // ( aka the state ), return it 
        const moodCount = moodLog.filter( entry => {
            if ( entry.mood === chosenMood ) {
                return true
            } 
        })
        
        //const moodCount = moodLog.filter( e => e.mood === chosenMood )
        console.log( moodCount.length ) 
    };

    pickActivities = ( e ) => {
        let clickedActivity = e.target.id

        this.setState({
            chosenActivities: clickedActivity 
        }, () => {
            console.log( this.state.chosenActivities )
        })  
    } 
    
    prepareBarChart = () => {
        const { moodList } = this.state
        
        const moodLog = this.getMoodLog()
        
        return moodList.map( entry => {
            const moods = moodLog.filter( item => {
                if ( entry.label === item.mood ) {
                    return true
                }
            })
            
            return { x: entry.label, y: moods.length }
        })
    };
    
    prepareLineChart = () => {
        const moodLog = this.getMoodLog()
        console.log( this.getMoodLog() )

        return moodLog.map( entry => {
            let fullDate = entry.date.split("/")
            console.log( fullDate )
            return { x: ( fullDate[0] ), y: entry.mood }
        })
    };

    handleChange = ( date ) => {
        this.setState({
            pickedDate: date
        }, () => {
            console.log( this.state.pickedDate )
        })
    }

    render() {
        const { moodList, chosenMood, pickedDate, chosenActivities } = this.state
        
        return (
            <Container>
                    <Route exact path="/" render={ (props) => <StartPage 
                            chooseMood={ this.chooseMood } 
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            pickedDate={ pickedDate }
                            onChange={ this.handleChange }
                    />} />
                    <Route exact path="/entries" render={ (props) => <Entries 
                            component={ Entries } 
                            getMoodLog={ this.getMoodLog }
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            pickedDate={ pickedDate }
                    />} />
                    <Route path="/barchart" render={ (props) => <BarChart
                            component={ BarChart }
                            moodCounter={ this.moodCounter }
                            data={ this.prepareBarChart() }
                    />} />
                    <Route path="/linechart" render={ (props) => <LineChart 
                            component={ LineChart }
                            data={ this.prepareLineChart() }
                    />} />
                    <EntryLogger 
                            moodList={ moodList }
                            chosenMood={ chosenMood }
                            pickedDate={ pickedDate }
                            moodCounter={ this.moodCounter }
                            getMoodLog={ this.getMoodLog }
                            basicActivities={ basicActivities }
                            chosenActivities={ chosenActivities }
                            pickActivities={ this.pickActivities }
                    />
            </Container>
        );
    }
}

export default App;
