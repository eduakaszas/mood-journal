import React from 'react';
import Container from 'react-bootstrap/Container';
import { Editor } from 'slate-react';
import { Link } from "react-router-dom";
import './TextEditor.scss';
import { Tags } from '../../components/compIndex'
import LeftArrow from '../img/left_arrow.svg'
class TextEditor extends React.Component {
    render() {
        const { storeItems } = this.props
        
        return (
            <Container>
                <div>
                    <div className="whatHappened ml-5 mb-2"> Bitch ass text </div>
                    <Editor 
                        className="textEditor p-4 ml-5"
                        value={ this.props.value } 
                        onChange={ this.props.onChange } 
                        onKeyDown={ this.props.onKeyDown }
                        renderNode={ this.props.renderNode }
                        renderMark={ this.props.renderMark }
                    />
                </div>
                <Tags showTags={ this.props.showTags } />
                <div className="text-center mt-5">
                    <button onClick={ storeItems }> Save </button><br />
                    <Link to="/"><img src={ LeftArrow } alt='leftArrow' className='goBack' /></Link>
                </div>
            </Container>
        );
    }
};

export default TextEditor;