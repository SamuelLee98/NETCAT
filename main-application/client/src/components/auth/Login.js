import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Actions
import { setPage } from '../../actions/event';
import { login } from '../../actions/auth';

const Login = ({
  setPage,
  login,
  auth: { isAuthenticated, isAdmin, user }
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('login');
  }, [setPage]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onClick = async e => {
    e.preventDefault();
    login(email, password);
  };

  /**
   * Redirect only after user gets authenticated (in login action) and user gets
   * loaded (in loadUser action).
   *
   * loadUser updates the x-auth-token header to the most current one. If
   * redirected to dashboard without loadUser being finished, then getCurrentProfile
   * could get the profile based on previous token
   */
  if (isAuthenticated && isAdmin && user) {
    return <Redirect to='/admin-dashboard' />;
  }

  if (isAuthenticated && user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className=' container content my-2' style={{ maxWidth: '500px' }}>
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
                <button
                  type='submit'
                  className='btn btn-danger'
                  onClick={e => onClick(e)}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setPage, login }
)(Login);
