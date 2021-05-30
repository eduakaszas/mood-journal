import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import { Value } from 'slate';
import { Route } from "react-router-dom";
// import { setEntries } from '../../store/modules/entries/actions';
import { setEntries, addEntry, editEntry } from './../store/modules/entries/actions';
import { connect } from 'react-redux';
import { TextEditor, BoldMark, ItalicMark, UnderlineMark, CodeBlock } from './compIndex.js';
import './TextEditor/TextEditor.scss';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
/*                             {
                                text: 'Bitch ass paragraph.',
                            },  */
                        ],
                    },
                ],
            },
        ],
    },
});

class EntryLogger extends Component {
    // Set initial value when app is first constructed
    state = {
        value: initialValue,
        textEditorNote: null
    };

    onChange = ({ value }) => {
        this.setState({ value });
        this.storeCurrentNote( this.state.value.document.text );
    };

    // stores mood and date of mood item that is clicked on
    storeItems = () => {
        const { chosenMood, pickedDate, chosenActivities, entryId, resetValues } = this.props;
        const { textEditorNote } = this.state;
        
        let moodDatas = this.props.getMoodLog();
        console.log( moodDatas )

        const newMoodItem = { 
            mood: chosenMood, 
            date: Date.now(), 
            notes: textEditorNote, 
            activities: chosenActivities
        };
        
        // if localStorage is empty, create an array
        if ( moodDatas === null ) {
            moodDatas = [ ]
        };

        let index;
        console.log(entryId)
        console.log(newMoodItem)
        
        if ( entryId ) {
            // index = moodDatas.findIndex( entry => entryId === entry.id);
            // console.log( index );

            // if ( index !== -1 ) {
            //     moodDatas[index] = newMoodItem;
            // }
            fetch('http://localhost:8080/entry', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id : entryId, ...newMoodItem})
            }).then(response => {
                console.log(response)
                return response.text();
            }).then( data => {
                console.log(data)
                this.props.dispatch(editEntry({...newMoodItem, _id : entryId}))
            }).then(() => {
                // resetting state
                resetValues();
                this.resetEditor();
            })
        };

        

        if ( !entryId || index === -1 ) {
            console.log( 'pickedDate' );
            console.log( pickedDate );
            // push new mood item to localStorage
            // moodDatas.push( newMoodItem );
            console.log(newMoodItem);
            fetch('http://localhost:8080/entry', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newMoodItem)
            }).then(response => {
                console.log(response)
                return response.json();
            }).then( data => {
                console.log(data)
                this.setState({
                    entryId: data._id
                })
                this.props.dispatch(addEntry(data))
            }).then(() => {
                // resetting state
                resetValues();
                this.resetEditor();
            })
        };
        
    };

    storeCurrentNote = note => {
        this.setState({
            textEditorNote: note
        })
    };
    
    resetEditor = () => {
        this.setState({
            value: initialValue
        })
    };

    // Define a new handler which prints the key that was pressed.
    onKeyDown = ( event, editor, next ) => {
        //console.log( event.key )
        if ( !event.ctrlKey ) return next();

        //Decide what to do based on the key code
        switch ( event.key ) 
        {
            case 'b':
                event.preventDefault()
                editor.toggleMark('bold')
            break

            case 'i':
                event.preventDefault()
                editor.toggleMark('italic')
            break

            case 'u':
                event.preventDefault()
                editor.toggleMark('underline')
            break

            case 'c':
                const isCode = editor.value.blocks.some(block => block.type === 'code')
                event.preventDefault()
                editor.setBlocks( isCode ? 'paragraph' : 'code' )
                break

            default:
                return next()
        }
    };

    // Method to render marks
    renderMark = ( props, editor, next ) => {
        switch ( props.mark.type ) 
        {
            case 'bold':
                return <BoldMark { ...props } />

            case 'italic':
                return <ItalicMark { ...props } />

            case 'underline':
                return <UnderlineMark { ...props } />

            default:
                return next()
        }
    }

    // Method to render nodes for code blocks.
    renderNode = ( props, editor, next ) => {
        switch ( props.node.type ) {
            case 'code':
                return <CodeBlock { ...props } />
        
            default:
                return next()
        }
    }

    render() {
        const { basicActivities, pickActivities, chosenActivities, entryId } = this.props;
        
        return (
            <Container>
                <Route path="/editor" render={ props => 
                    <TextEditor 
                        storeItems={ this.storeItems }
                        storeCurrentNote={ this.storeCurrentNote }
                        value={ this.state.value } 
                        onChange={ this.onChange } 
                        onKeyDown={ this.onKeyDown }
                        renderNode={ this.renderNode }
                        renderMark={ this.renderMark }
                        basicActivities={ basicActivities }
                        pickActivities={ pickActivities }
                        chosenActivities={ chosenActivities }
                        entryId={ entryId }
                        storeOrEditEntry={ this.storeOrEditEntry }
                    />
                }/>
            </Container>
        )
    }
};

const mapStateToProps = state => {
    // console.log(state)
    return {
        entries: state.entries.entries
    };
};

export default connect(mapStateToProps)(EntryLogger);
