import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Actions
import { setPage } from '../../actions/event';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({
  setAlert,
  setPage,
  register,
  isAuthenticated,
  isAdmin
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('register');
  }, [setPage]);

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
      [e.target.name]: e.target.value
    });

  const onClick = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  // Redirect if registered
  if (isAuthenticated && isAdmin) {
    return <Redirect to='/admin-catalogue' />;
  }

  if (isAuthenticated) {
    return <Redirect to='/catalogue' />;
  }

  return (
    <div className=' container content my-2' style={{ maxWidth: '500px' }}>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Create a NETCAT Account</h3>
        <h6 className='signUpDetails'>
          <span role='img' aria-label='check'>
            ✔️
          </span>{' '}
          Weekly updates for the best events on campus
        </h6>
        <h6 className='signUpDetails'>
          <span role='img' aria-label='check'>
            ✔️
          </span>{' '}
          Push your favorite events to your calendar
        </h6>
        <h6 className='signUpDetails'>
          <span role='img' aria-label='check'>
            ✔️
          </span>{' '}
          Send invitations to your friends to go together
        </h6>
        <br />
        <div className='card'>
          <div className='card-body'>
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
                <label>Re-Enter Password</label>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Re-Enter Password'
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
            <br />
            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(
  mapStateToProps,
  { setAlert, setPage, register }
)(Register);
