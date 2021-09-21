import React, { Component } from 'react';
import Modal from '../../../node_modules/react-bootstrap/Modal';
import { withRouter } from 'react-router-dom';
import { signoutSuccess } from '../../store/modules/user/actions';
import Button from '../../../node_modules/react-bootstrap/Button';
import { connect } from 'react-redux';
import './SignOutModal.scss';

class SignOutModal extends Component {
    signOut = () => {
        console.log( "Successfully signed out!" );
        this.props.dispatch(signoutSuccess());
        this.props.closeModal();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Modal show= { this.props.isModalOpen }>
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        Are you sure you'd like to sign out?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={ this.props.closeModal }
                            className="back-button"
                        >
                            Dismiss
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={ this.signOut }
                            className="cta-button"
                        >
                            Sign out
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
        username: user.username,
        isLoggedIn: user.isLoggedIn,
        error: user.error
    };
};

export default connect(mapStateToProps)(withRouter(SignOutModal));
