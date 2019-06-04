import React from 'react';
import Container from 'react-bootstrap/Container';
import { Editor } from 'slate-react';
import { Link } from "react-router-dom";
import './TextEditor.scss';
import { Activities } from '../../components/compIndex'
import LeftArrow from '../img/left_arrow.svg'
class TextEditor extends React.Component {
    render() {
        const { storeItems, basicActivities, pickActivities } = this.props
        
        return (
            <Container>
                <div>
                    <div className="title ml-5 mb-2"> Thoughts </div>
                    <Editor 
                        className="textEditor p-4 ml-5"
                        value={ this.props.value } 
                        placeholder="Enter your goddamn thoughts"
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
                <div className="text-center mt-5">
                    <Link to="/"><button onClick={ storeItems }> Save </button><br /></Link>
                    <Link to="/"><img src={ LeftArrow } alt='leftArrow' className='goBack' /></Link>
                </div>
            </Container>
        );
    }
};

export default TextEditor;