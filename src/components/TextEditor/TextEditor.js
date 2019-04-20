import React from 'react';
import Container from 'react-bootstrap/Container';

import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Link } from "react-router-dom";

import './TextEditor.scss';
import LeftArrow from '../img/left_arrow.svg'
import { BoldMark, ItalicMark, UnderlineMark, CodeBlock } from '../compIndex.js';


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

class TextEditor extends React.Component {
    // Set initial value when app is first constructed
    state = {
        value: initialValue,
    }

    onChange = ({ value }) => {
        this.setState({ value });
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
                <div>
                    <div className="whatHappened ml-5 mb-2"> Bitch ass text </div>
                    <Editor 
                        className="textEditor p-4 ml-5"
                        value={ this.state.value } 
                        onChange={ this.onChange } 
                        onKeyDown={ this.onKeyDown }
                        renderNode={ this.renderNode }
                        renderMark={ this.renderMark }
                    />
                </div>
                <div className="text-center mt-5">
                    <Link to="/"><img src={ LeftArrow } alt='leftArrow' className='goBack' /></Link>
                </div>
            </Container>
        );
    }
};

export default TextEditor;