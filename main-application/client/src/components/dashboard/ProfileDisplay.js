import React, { Fragment } from 'react';

const ProfileDisplay = ({ profile: { location, education, bio, social } }) => {
  return (
    <Fragment>
      {bio && (
        <p className='lead'>
          <i className='fa fa-info' /> {bio}
        </p>
      )}

      {location && (
        <p className='lead'>
          <i className='fa fa-map-marker' /> {location}
        </p>
      )}

      {education && (
        <Fragment>
          {education && (
            <p className='lead'>
              <i className='fa fa-book' /> {education.degree} degree in{' '}
              {education.fieldofstudy} at {education.school}
            </p>
          )}
        </Fragment>
      )}

      {social && social.twitter && (
        <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
          <i className='fa fa-twitter fa' />
        </a>
      )}
      {social && social.facebook && (
        <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
          <i className='fa fa-facebook fa' />
        </a>
      )}
      {social && social.linkedin && (
        <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
          <i className='fa fa-linkedin fa' />
        </a>
      )}
      {social && social.youtube && (
        <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
          <i className='fa fa-youtube fa' />
        </a>
      )}
      {social && social.instagram && (
        <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
          <i className='fa fa-instagram fa' />
        </a>
      )}
    </Fragment>
  );
};

export default ProfileDisplay;
