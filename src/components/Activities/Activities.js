import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Activities.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons'

library.add( faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook )

export class Activities extends Component {
    displayActivities() {
        const { basicActivities, pickActivities } = this.props

        return basicActivities.map( activity => {
            return  <div className="activities" key={ activity.num }>
                        <input id={ activity.label }
                                className="activity-item"
                                type="checkbox"
                                onClick={ pickActivities }
                        />
                        <label htmlFor={ activity.label }>
                            { activity.label }
                            {/* <FontAwesomeIcon icon={ activity.faClass } className="activity-icon"/> */}
                        </label>
                    </div>
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

