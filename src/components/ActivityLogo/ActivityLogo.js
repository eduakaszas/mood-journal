import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons'

library.add( faBriefcase, faVolleyballBall, faUsers, faUtensils, faShoppingCart, faHeart, faBook )

export class ActivityLogo extends Component {
    displayActivityLogo = () => {
        const { basicActivities, activity, icon } = this.props;
        const makeIcon = x => <FontAwesomeIcon icon={ x } className="activity-icon mr-3"/>;

        if ( icon ) return makeIcon(icon);

        // console.log(basicActivities);
        // console.log(activity);

        const activityImage = basicActivities.find( el => {

            return el.label.toLowerCase() === activity.toLowerCase()
        })
        if(!activityImage) {
            return
        } 

        return makeIcon(activityImage.faClass)
    }

    render() {
        return (
            <div className="icon-list d-inline">
                { this.displayActivityLogo() }
            </div>
        )
    }
}


