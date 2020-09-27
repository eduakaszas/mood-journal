import React from 'react';
import Container from 'react-bootstrap/Container';
import { Editor } from 'slate-react';
import { Link } from "react-router-dom";
import './TextEditor.scss'
import { Activities } from '../../components/compIndex'

export class TextEditor extends React.Component {
    render() {
        const { storeItems, basicActivities, pickActivities, chosenActivities, storeOrEditEntry } = this.props
        
        return (
            <Container fluid>
                <div className="page-title mb-4"> What have you been up to? </div>
                <Activities 
                    pickActivities={ pickActivities }
                    basicActivities={ basicActivities }
                    chosenActivities={ chosenActivities }
                />
                <Editor 
                    className="text-editor mt-4 mb-4"
                    value={ this.props.value } 
                    placeholder="Enter thoughts"
                    onChange={ this.props.onChange } 
                    onKeyDown={ this.props.onKeyDown }
                    renderNode={ this.props.renderNode }
                    renderMark={ this.props.renderMark }
                />
                <div className="text-center">
                    <Link to="/"><button onClick={ storeItems } className="save-button"> Save </button></Link>                
                    <Link to="/"><button className="back-button"> Back </button></Link>
                </div>
            </Container>
        ); 
    }
}; 