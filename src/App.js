import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { BarChart, TextEditor, StartPage } from './components/compIndex.js';
import { Awesome, Happy, Okay, Sad, Angry, AwesomeActive, HappyActive, OkayActive, SadActive, AngryActive } from './components/compIndex.js';
import './App.scss';
import LineChart from './components/Charts/LineChart.js';

let moodList = [
    { 
        src: Awesome,
        activeSrc: AwesomeActive,
        label: "Awesome",
        count: 0
    },
    { 
        src: Happy,
        activeSrc: HappyActive,
        label: "Happy",
        count: 0
    },
    { 
        src: Okay,
        activeSrc: OkayActive,
        label: "Okay",
        count: 0
    },
    { 
        src: Angry,
        activeSrc: AngryActive,
        label: "Angry",
        count: 0
    },
    { 
        src: Sad,
        activeSrc: SadActive,
        label: "Sad",
        count: 0
    }
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenMood: null,
            moodList: moodList
        };
        
    }

    chooseMood = ( e ) => {
        let clickedMood = e.target.id
        
        this.setState({
            chosenMood: clickedMood
        }, () => { 
            console.log( this.state.chosenMood )
        })
    }

    getMoodLog = () => JSON.parse(localStorage.getItem( 'moodLog' ))

    prepareLineChart = () => {
        const moodLog = this.getMoodLog()

        return moodLog.map( entry => {
            return { x: entry.date, y: entry.mood }
        })
    }

    storeItems = ( ) => {
        const { chosenMood } = this.state

        let moodDatas = this.getMoodLog()
        const newMoodItem = { mood: chosenMood, date: Date.now() }
        
        if ( moodDatas === null ) {
            moodDatas = [ ]
        }

        moodDatas.push( newMoodItem )
        localStorage.setItem('moodLog', JSON.stringify( moodDatas ))

        this.moodCounter()
    }
    
    moodCounter = () => {
        const { chosenMood } = this.state

        const moodLog = this.getMoodLog()

        const moodCount = moodLog.filter( entry => {
            if ( entry.mood === chosenMood ) {
                return true
            } 
        })

        //const moodCount = moodLog.filter( e => e.mood === chosenMood )
        console.log( moodCount.length )
    }

    render() {
        const { moodList, chosenMood } = this.state

        return (
            <Container>
                    <Route exact path="/" render={ (props) => <StartPage 
                                chooseMood={ this.chooseMood } 
                                moodList={ moodList }
                                chosenMood={ chosenMood }
                                storeItems={ this.storeItems }
                    />} />
                    <Route path="/editor" 
                            component={ TextEditor }
                    />
                    <Route path="/barchart" render={ (props) => <BarChart
                            component={ BarChart }
                            storeItems={ this.storeItems }
                            moodCounter={ this.moodCounter }
                    />} />
                    <Route path="/linechart" render={ (props) => <LineChart 
                            component={ LineChart }
                            storeItems={ this.storeItems }
                            data={ this.prepareLineChart() }
                    />} />
            </Container>
        );
    }
}

export default App;
