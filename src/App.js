import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { BurgerMenu, BarChart, TextEditor, StartPage, LineChart } from './components/compIndex.js';
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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenMood: null,
            moodList: moodList
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
    
    // stores mood and date of mood item that is clicked on
    storeItems = ( ) => {
        const { chosenMood } = this.state
        
        let moodDatas = this.getMoodLog()
        const newMoodItem = { mood: chosenMood, date: Date.now() }
        
        // is localStorage is empty, create an array
        if ( moodDatas === null ) {
            moodDatas = [ ]
        }
        
        // push new mood item to localStorage
        moodDatas.push( newMoodItem )
        // update MoodLog by setting it
        localStorage.setItem( 'moodLog', JSON.stringify( moodDatas ))
        
        this.moodCounter()
    };
    
    // count how many times a mood item is clicked on
    moodCounter = () => {
        const { chosenMood } = this.state
        
        const moodLog = this.getMoodLog()
        
        // if mood item in localStorage is the same as the item I clicked on,
        // (aka the state ), return it 
        const moodCount = moodLog.filter( entry => {
            if ( entry.mood === chosenMood ) {
                return true
            } 
        })
        
        //const moodCount = moodLog.filter( e => e.mood === chosenMood )
        console.log( moodCount.length ) 
    };
    
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
            let fullDate = Date( entry.date ).split(" ")
            console.log( fullDate )
            return { x: (fullDate[2]), y: entry.mood }
        })
    };

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
                            data={ this.prepareBarChart() }
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
