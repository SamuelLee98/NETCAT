import React from 'react';

const Footer = () => (
  <footer className='myFooter'>
    <div className='container'>
      <div className='row'>
        <div
          className='col-lg-3 col-md-3 col-sm-12 col-xs-12'
          style={{ textAlign: 'center' }}
        >
          <br />
          <br />
          <h4 style={{ fontFamily: 'vogue' }}>NETCAT</h4>
          <h6>Marshall</h6>
          <h6>Viterbi</h6>
          <h6>Annenberg</h6>
          <h6>Dornsife</h6>
          <h6>Register/Login</h6>
          <h6>About</h6>
          <br />
        </div>
        <div className='col-lg-1 col-md-1  d-none d-md-block verticalLine fluid-center' />
        <div className='col-lg-8 col-md-8 d-none d-md-block'>
          <br />
          <h6 style={{ textAlign: 'center' }}>
            Advertise Your Own Events on NETCAT
          </h6>
          <hr />
          <form className='contactForm'>
            <div className='form-group'>
              <label>Email to Contact You</label>
              <input
                type='contact'
                className='form-control'
                style={{ fontSize: '13px' }}
              />
            </div>
            <div className='form-group'>
              <label>Summary of Your Event</label>
              <textarea
                type='password'
                className='form-control'
                style={{ fontSize: '13px' }}
                placeholder=''
              >
                {' '}
              </textarea>
            </div>
            <div className='center'>
              <button
                type='submit'
                className='btn btn-danger'
                style={{ fontSize: '13px' }}
              >
                Submit
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
