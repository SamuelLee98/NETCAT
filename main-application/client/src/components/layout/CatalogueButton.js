import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addToCatalogue,
  deleteFromCatalogueIds
} from '../../actions/catalogue';

const CatalogueButton = ({
  addToCatalogue,
  deleteFromCatalogueIds,
  isCatalogued,
  eventId
}) => {
  return (
    <div className='float-right'>
      {isCatalogued ? (
        <i
          className='fa fa-close fa-2x'
          style={{
            color: 'red',
            textShadow: '1px 1px 0px black',
            cursor: 'pointer'
          }}
          onClick={() => deleteFromCatalogueIds(eventId)}
        />
      ) : (
        <i
          className='fa fa-plus fa-2x'
          style={{
            color: 'green',
            textShadow: '1px 1px 0px black',
            cursor: 'pointer'
          }}
          onClick={() => addToCatalogue(eventId)}
        />
      )}
    </div>
  );
};

CatalogueButton.propTypes = {
  addToCatalogue: PropTypes.func.isRequired,
  deleteFromCatalogueIds: PropTypes.func.isRequired
};

export default connect(
  null,
  { addToCatalogue, deleteFromCatalogueIds }
)(CatalogueButton);
