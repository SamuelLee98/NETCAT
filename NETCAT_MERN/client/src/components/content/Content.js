import React from 'react';

// Images, delete later
import facebook from './images/facebook.png';
import amazon from './images/amazon.png';
import NBC from './images/NBC.png';
import vayner from './images/vayner.png';

const Content = () => {
  return (
    <div className='content'>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Featured Events</h3>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2'>
            <div className='card'>
              <img
                src={facebook}
                id='featured-thumbnail1'
                className='img-responsive card-img-top'
                alt='Responsive Thumbnail'
              />
              <div className='card-body'>
                <h4 className='card-title'>Facebook Resume Workshop</h4>
                <p className='card-text'>
                  Domestic confined any but son bachelor advanced remember.liar
                  pleasant but appetite differed she. Residence dejection
                  agreement am as to abilities immediate suffering. Ye am
                  depending propriety sweetness distrusts belonging collected.
                  Smiling mention he in thought equally musical. Wisdom new and
                  valley answer. Contented it so is discourse recommend. Man its
                  upon him call mile. An pasture he himself believe ferrars
                  besides cottage.
                </p>
                <a href='details.html' className='btn btn-danger'>
                  Check it out!
                </a>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2'>
            <div className='card'>
              <img
                src={vayner}
                id='featured-thumbnail1'
                className='img-responsive card-img-top'
                alt='Responsive Thumbnail'
              />
              <div className='card-body'>
                <h4 className='card-title'>Gary Vee Content Seminar</h4>
                <p className='card-text'>
                  Domestic confined any but son bachelor advanced remember. How
                  proceed offered her offence shy forming. Returned peculiar
                  pleasant but appetite differed she. Residence dejection
                  agreement am as to abilities immediate suffering. Ye am
                  depending propriety sweetness distrusts belonging collected.
                  Smiling mention he in thought equally musical. Wisdom new and
                  valley answer. Contented it so is discourse recommend. Man its
                  upon him call mile. An pasture he himself believe ferrars
                  besides cottage.
                </p>
                <a href='details.html' className='btn btn-danger'>
                  Check it out!
                </a>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2'>
            <div className='card'>
              <img
                src={NBC}
                id='featured-thumbnail1'
                className='img-responsive card-img-top'
                alt='Responsive Thumbnail'
              />
              <div className='card-body'>
                <h4 className='card-title'>NBC: Late Night Shows BTS</h4>
                <p className='card-text'>
                  Domestic confined any but son bachelor advanced remember. How
                  proceed offered her offence shy forming. agreement am as to
                  abilities immediate suffering. Ye am depending propriety
                  sweetness distrusts belonging collected. Smiling mention he in
                  thought equally musical. Wisdom new and valley answer.
                  Contented it so is discourse recommend. Man its upon him call
                  mile. An pasture he himself believe ferrars besides cottage.
                </p>
                <a href='details.html' className='btn btn-danger'>
                  Check it out!
                </a>
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2'>
            <div className='card'>
              <img
                src={amazon}
                id='featured-thumbnail1'
                className='img-responsive card-img-top'
                alt='Responsive Thumbnail'
              />
              <div className='card-body'>
                <h4 className='card-title'>Amazon Web Services</h4>
                <p className='card-text'>
                  Domestic confined any but son bachelor advanced remember.
                  pleasant but appetite differed she. Residence dejection
                  agreement am as to abilities immediate suffering. Ye am
                  depending propriety sweetness distrusts belonging collected.
                  Smiling mention he in thought equally musical. Wisdom new and
                  valley answer. Contented it so is discourse recommend. Man its
                  upon him call mile. An pasture he himself believe ferrars
                  besides cottage.
                </p>
                <a href='details.html' className='btn btn-danger'>
                  Check it out!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
