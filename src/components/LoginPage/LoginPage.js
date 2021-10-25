import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../store/modules/user/actions';
import { connect } from 'react-redux';
import './LoginPage.scss';

const initialState = {
  username: '',
  password: '',
  loginSubmitted: false,
  userId: '',
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;

    if (isLoggedIn && !prevProps.isLoggedIn) {
      this.props.history.push('/entries');
    }
  }

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({
      loginSubmitted: true,
    });

    if (!(username && password)) {
      return;
    }

    fetch('http://localhost:8080/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);

        if (response.status !== 200) {
          throw response.status;
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.props.dispatch(
          loginSuccess({ username: username, userId: data.userId })
        );
        this.setState(initialState);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem(
          'refresh-token',
          JSON.stringify(data.refreshToken)
        );
        // this will fail bc userId is not yet fully stored adter dispatching above, when I call for entries
        this.props.refreshEntries();
      })
      .catch((error) => {
        console.log('error:' + error);
        this.props.dispatch(loginFailure());
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, password } = this.state;
    const { error } = this.props;

    return (
      <Container fluid>
        <div className='form-container'>
          <div className='form-background'>
            {error
              ? <div className='login-error'> {error} </div>
              : null
            }
            <form
              action=''
              method='get'
              className='login-form'
              onSubmit={this.login}
            >
              <div className='form-field' id='username'>
                <input
                  type='text'
                  name='username'
                  id='username-input'
                  value={username}
                  onChange={this.handleChange}
                  required
                />
                <label for='username-input'>Username</label>
              </div>
              <div className='form-field' id='password'>
                <input
                  type='password'
                  name='password'
                  id='password-input'
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <label for='password-input'>Password</label>
              </div>
              <div className='form-field' id='login-button-container'>
                <input type='submit' value='Log in' id='login-button' />
              </div>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    username: user.username,
    isLoggedIn: user.isLoggedIn,
    error: user.error,
  };
};

export default connect(mapStateToProps)(withRouter(LoginPage));
