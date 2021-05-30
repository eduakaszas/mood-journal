import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../store/modules/user/actions';
import { connect } from 'react-redux';
import './LoginPage.scss';

const initialState = {
    username: '',
    password: '',
    loginSubmitted: false
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = initialState;
    }

    componentDidUpdate(prevProps) {
        const { isLoggedIn } = this.props;

        if ( isLoggedIn && !prevProps.isLoggedIn ) {
            this.props.history.push("/entries");
        } 
    }

    login = e => {
        e.preventDefault();

        const { username, password } = this.state;

        this.setState({
            loginSubmitted: true
        });

        if( !(username && password)) {
            return;
        }
        console.log( username, password )

        fetch('http://localhost:8080/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, password: password })
        }).then(response => {
            console.log(response.status)

            if ( response.status === 401 ) {
                this.props.dispatch(loginFailure())
            } else if ( response.status === 200 ){
                console.log("logged in!")
                this.props.dispatch(loginSuccess(username));
                this.setState(initialState)
            }
            return response.text();
        }).then( data => {
            console.log(data)
        })
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    };

    render() {
        const { username, password, submitted } = this.state;
        const { isLoggedIn, error } = this.props;
        
        return (
            <Container fluid>
                {
                    error 
                        ? <div className="login-error"> { error } </div> 
                        // : <Redirect to="/entries" />
                        : null
                }
            <form action="" method="get" className="login-form" onSubmit={ this.login }>
                <div className="form-field">
                    <label> Username: </label>
                    <input type="text" name="username" id="username-input" value={ username } onChange={ this.handleChange } required/>
                </div>
                <div className="form-field">
                    <label> Password: </label>
                    <input type="password" name="password" id="password-input" value={ password} onChange={ this.handleChange } required/>
                </div>
                <div className="form-field">
                    <input type="submit" value="Log in" />
                </div>
            </form>
        </Container>
        )
    }
}

const mapStateToProps = ({user}) => {
    // console.log(state)
    return {
        username: user.username,
        isLoggedIn: user.isLoggedIn,
        error: user.error
    };
};

export default connect(mapStateToProps)(withRouter(LoginPage));