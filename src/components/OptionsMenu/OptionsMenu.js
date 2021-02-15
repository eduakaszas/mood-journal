import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { LinkContainer } from 'react-router-bootstrap';
import './OptionsMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

library.add( faEllipsisV )

export class OptionsMenu extends Component {
    render() {
        const { deleteEntry, editEntry } = this.props;

        return (
            <div className="float-right">
                <Dropdown alignRight>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FontAwesomeIcon icon={ faEllipsisV } className="options-icon"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <LinkContainer to="/">
                            <Dropdown.Item onClick={ editEntry }> Edit </Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Item onClick={ deleteEntry }> Delete </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

