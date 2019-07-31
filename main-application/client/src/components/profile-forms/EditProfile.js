import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../../actions/profile';
import { setPage } from '../../actions/event';
import Spinner from '../layout/Spinner';

import './forms.css';

const CreateProfile = ({
  getCurrentProfile,
  createProfile,
  history,
  setPage,
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    degree: '',
    school: '',
    fieldofstudy: '',
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [displayEducationInputs, toggleEducationInputs] = useState(false);

  const {
    location,
    bio,
    degree,
    school,
    fieldofstudy,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = formData;

  useEffect(() => {
    setPage('dashboard');
    getCurrentProfile();
    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      degree: loading || !profile.education ? '' : profile.education.degree,
      school: loading || !profile.education ? '' : profile.education.school,
      fieldofstudy:
        loading || !profile.education ? '' : profile.education.fieldofstudy,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin
    });
  }, [getCurrentProfile, setPage, loading]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  if (loading && profile === null) return <Spinner />;
  return (
    <div className='content container'>
      <div className='row'>
        <div className='col-md-1' />
        <div className='col-md-10 my-2'>
          <h1 className='large' style={{ fontFamily: 'helvetica-bold' }}>
            Edit Your Profile
          </h1>
          <p className='lead'>
            <i className='fa fa-user' /> Let's get some information to make your
            profile stand out
          </p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className='form-group'>
              <textarea
                placeholder='A short bio of yourself'
                name='bio'
                value={bio}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Tell us a little about yourself
              </small>
            </div>
            <div className='my-2'>
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type='button'
                className='btn btn-light'
              >
                Edit Social Network Links
              </button>
              <span>Optional</span>
            </div>
            {displaySocialInputs && (
              <Fragment>
                <div className='form-group social-input'>
                  <i className='fa fa-twitter fa-2x' />
                  <input
                    type='text'
                    placeholder='Twitter URL'
                    name='twitter'
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fa fa-facebook fa-2x' />
                  <input
                    type='text'
                    placeholder='Facebook URL'
                    name='facebook'
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fa fa-youtube fa-2x' />
                  <input
                    type='text'
                    placeholder='YouTube URL'
                    name='youtube'
                    value={youtube}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fa fa-linkedin fa-2x' />
                  <input
                    type='text'
                    placeholder='Linkedin URL'
                    name='linkedin'
                    value={linkedin}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fa fa-instagram fa-2x' />
                  <input
                    type='text'
                    placeholder='Instagram URL'
                    name='instagram'
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </div>
              </Fragment>
            )}
            <div className='my-2'>
              <button
                onClick={() => toggleEducationInputs(!displayEducationInputs)}
                type='button'
                className='btn btn-light'
              >
                Edit Education
              </button>
              <span>Optional</span>
            </div>
            {displayEducationInputs && (
              <Fragment>
                <p className='lead'>
                  <i className='fa fa-code-fork fa-2x' /> Add any school or
                  bootcamp that you have attended
                </p>
                <small>* = required field</small>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='* School or Bootcamp'
                    name='school'
                    value={school}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='* Degree or Certificate'
                    name='degree'
                    value={degree}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='* Field of Study'
                    name='fieldofstudy'
                    value={fieldofstudy}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </Fragment>
            )}
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
        <div className='col-md-1' />
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

// withRouter allows us to pass in the history object from the action
export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile, setPage }
)(withRouter(CreateProfile));
