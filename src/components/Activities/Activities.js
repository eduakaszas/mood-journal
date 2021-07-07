import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Activities.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons'

library.add( faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook )

export class Activities extends Component {
    displayActivities() {
        const { basicActivities, pickActivities } = this.props

        return basicActivities.map( activity => {
            return  <Col xs={3} md={1}>
                        {/* <ToggleButtonGroup type="checkbox" key={ activity.num }> 
                            <ToggleButton id={ activity.label }
                                        onClick={ pickActivities }
                                        className="activity-icon-background"
                            >
                                <FontAwesomeIcon icon={ activity.faClass } className="activity-icon"/>
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        <div className="activities" key={ activity.num }>
                            <button id={ activity.label }
                                    onClick={ pickActivities }
                                    className="activity-icon-background"
                            >
                                <FontAwesomeIcon icon={ activity.faClass } className="activity-icon"/>
                            </button>
                        </div>
                    </Col>
        })
    }

    render() {
        return (
            <Container className="text-center">
                <Row className="justify-content-center">
                    { this.displayActivities() }
                </Row>
            </Container>
        )
    }
}

