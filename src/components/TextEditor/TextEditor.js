import React from 'react';
import Container from 'react-bootstrap/Container';
import { Editor } from 'slate-react';
import { Link } from "react-router-dom";
import './TextEditor.scss'
import { Activities } from '../../components/compIndex'
import LeftArrow from '../img/left_arrow.svg'

export class TextEditor extends React.Component {
    render() {
        const { storeItems, basicActivities, pickActivities } = this.props
        
        return (
            <Container>
                <div className="float-left">
                    <Link to="/"><img src={ LeftArrow } alt='leftArrow' className='goBack' /></Link>
                </div>
                <div className="editorContainer ml-5 position-absolute">
                    <div>
                        <div className="title mb-2"> Thoughts </div>
                        <Editor 
                            className="textEditor p-4"
                            value={ this.props.value } 
                            placeholder="Enter thoughts"
                            onChange={ this.props.onChange } 
                            onKeyDown={ this.props.onKeyDown }
                            renderNode={ this.props.renderNode }
                            renderMark={ this.props.renderMark }
                        />
                    </div>
                    <Activities 
                            pickActivities={ pickActivities }
                            basicActivities={ basicActivities }
                    />
                    <div className="text-center mt-5 ml-5">
                        <Link to="/"><button onClick={ storeItems } className="save"> Save </button></Link>
                    </div>
                </div>
            </Container>
        );
    }
};