import React, { Component } from 'react';

import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { TextEditor, StartPage, BurgerMenu } from './components/compIndex.js';
import { Happy, Okay, Sad, HappyActive, OkayActive, SadActive } from './components/compIndex.js';
import './App.scss';

let moodList = [
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
        src: Sad,
        activeSrc: SadActive,
        label: "Sad"
    },
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
    
    storeItems = ( ) => {
        const { chosenMood } = this.state
        
        let storedMood = { mood: chosenMood, date: Date.now() }
        
        localStorage.setItem( 'storedMood', JSON.stringify( storedMood ));

        var currentItem = localStorage.getItem('storedMood');
        console.log( JSON.parse( currentItem ) )
    }



    render() {
        const { moodList, chosenMood } = this.state

        return (
            <Container>
                    <Route exact path="/" render={ (props) => <StartPage 
                                { ...props }
                                chooseMood={ this.chooseMood } 
                                moodList={ moodList }
                                chosenMood={ chosenMood }
                                storeItems={ this.storeItems }
                    />} />
                    <Route path="/editor" component={ TextEditor } />
            </Container>
        );
    }
}

export default App;
