import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
// import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
  // forData is our state object, and setFormData is the setState function
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      // Use e.target.name to grab the specific name field that is calling the
      // onChange function; ex. if name="email" and onChange is called, then
      // e.target.name becomes email
      [e.target.name]: e.target.value
    });

  const onClick = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      // register({ username, email, password });
    }
  };

  // Redirect if registered
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <div className=' container content' style={{ maxWidth: '500px' }}>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Sign In</h3>
        <div className='card'>
          <div className='card-body'>
            <br />
            <div className='center'>
              <button
                className='btn btn-danger'
                style={{ textAlign: 'center' }}
              >
                Sign In With Your USC Email
              </button>
            </div>
            <br />
            <hr />
            <br />
            <form>
              <div className='form-group'>
                <label>Email address</label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <br />
              <div className='center'>
                <button type='submit' className='btn btn-danger'>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Create a NETCAT Account</h3>
        <h6 className='signUpDetails'>
          ✔️ Weekly updates for the best events on campus
        </h6>
        <h6 className='signUpDetails'>
          ✔️ Push your favorite events to your calendar
        </h6>
        <h6 className='signUpDetails'>
          ✔️ Send invitations to your friends to go together
        </h6>
        <br />
        <div className='card'>
          <div className='card-body'>
            <br />
            <div className='center'>
              <button
                className='btn btn-danger'
                style={{ textAlign: 'center' }}
              >
                Register With Your Email
              </button>
            </div>
            <br />
            <hr />
            <br />
            <form>
              <div className='form-group'>
                <label>Username</label>
                <input
                  className='form-control'
                  type='username'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>Email address</label>
                <input
                  className='form-control'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label>Re-enter Password</label>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Re-enter Password'
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
              <br />
              <div className='center'>
                <button
                  type='submit'
                  className='btn btn-danger'
                  onClick={e => onClick(e)}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
  // register: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Register);
