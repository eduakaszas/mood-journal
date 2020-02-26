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
            <Container className="float-left mt-5">
                <div className="title mb-3"> Thoughts </div>
                <Editor 
                    className="textEditor p-2 m-2"
                    value={ this.props.value } 
                    placeholder="Enter thoughts"
                    onChange={ this.props.onChange } 
                    onKeyDown={ this.props.onKeyDown }
                    renderNode={ this.props.renderNode }
                    renderMark={ this.props.renderMark }
                />
                <Activities 
                    pickActivities={ pickActivities }
                    basicActivities={ basicActivities }
                />
                <div className="text-center">
                    <Link to="/"><button onClick={ storeItems } className="save-button mt-3"> Save </button></Link>                </div>
                <div className="text-center">
                    <Link to="/"><img src={ LeftArrow } alt='leftArrow' className="back-button mt-5" /></Link>
                </div>
            </Container>
        ); 
    }
};