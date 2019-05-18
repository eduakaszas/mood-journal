import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import { Value } from 'slate';
import { Route } from "react-router-dom";
import { Tags, TextEditor, BoldMark, ItalicMark, UnderlineMark, CodeBlock } from './compIndex.js';
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
                            {
                                text: 'Bitch ass paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})
class EntryLogger extends Component {
    // Set initial value when app is first constructed
    state = {
        value: initialValue,
        textEditorNote: null
    }

    onChange = ({ value }) => {
        this.setState({ value });
        this.storeCurrentNote( this.state.value.document.text )
    }

    // stores mood and date of mood item that is clicked on
    storeItems = ( ) => {
        const { chosenMood, pickedDate } = this.props
        const { textEditorNote } = this.state
        
        let moodDatas = this.props.getMoodLog()
        const newMoodItem = { mood: chosenMood, date: pickedDate.toLocaleDateString('en-GB'), notes: textEditorNote, tags: [] }
        
        // if localStorage is empty, create an array
        if ( moodDatas === null ) {
            moodDatas = [ ]
        }
        
        // push new mood item to localStorage
        moodDatas.push( newMoodItem )
        // update MoodLog by setting it
        localStorage.setItem( 'moodLog', JSON.stringify( moodDatas ))
        
        this.props.moodCounter()
    };

    storeCurrentNote = ( note ) => {
        this.setState({
            textEditorNote: note
        })
    }

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
    }

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
        return (
            <Container>
                <Route path="/editor" render={ (props) => <TextEditor 
                        storeItems={ this.storeItems }
                        storeCurrentNote={ this.storeCurrentNote }
                        value={ this.state.value } 
                        onChange={ this.onChange } 
                        onKeyDown={ this.onKeyDown }
                        renderNode={ this.renderNode }
                        renderMark={ this.renderMark }
                        showTags={ this.props.showTags }
                />} />
            </Container>
        )
    }
}

export default EntryLogger;