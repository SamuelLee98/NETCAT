import React, { Fragment } from 'react';

const ProfileDisplay = ({ profile: { location, education, bio, social } }) => {
  return (
    <Fragment>
      {bio && (
        <p>
          <i className='fas fa-info-circle' /> {bio}
        </p>
      )}

      {location && (
        <p>
          <i className='fas fa-map-marked-alt' /> {location}
        </p>
      )}

      {education && (
        <Fragment>
          {education && (
            <p>
              <i className='fas fa-graduation-cap' /> {education.degree} degree
              in {education.fieldofstudy} at {education.school}
            </p>
          )}
        </Fragment>
      )}
      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook-f fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin-in fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-instagram fa-2x' />
          </a>
        )}
      </div>
    </Fragment>
  );
};

export default ProfileDisplay;
