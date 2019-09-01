import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-dropdown-select';

const options = [
  {
    school: 'annenberg',
    tag: 'JOURNALISM DIRECTOR’S FORUM'
  },
  {
    school: 'annenberg',
    tag: 'EVENTS'
  },
  {
    school: 'annenberg',
    tag: 'CAREER DEVELOPMENT'
  }
];

const DropDown = ({ searchField, setSearchField, handleSearchClick }) => {
  const customOptionRenderer = ({ item, methods }) => (
    <span
      key={item.tag}
      className='badge badge-pill badge-danger
                 mb-1 mr-1'
      style={{ maxWidth: '100px', overflow: 'hidden' }}
    >
      <span
        onClick={() => methods.removeItem(null, item)}
        title='Remove tag'
        style={{ cursor: 'pointer' }}
      >
        &times;{' '}
      </span>
      {item.tag}
    </span>
  );

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div style={{ maxHeight: '300px', padding: '10px' }}>
        <div className='d-flex justify-content-between'>
          <span className='text-dark' style={{ padding: '4px 8px' }}>
            <span style={{ fontSize: '16px' }}>Select Tags: </span>
          </span>
          {state.values.length === props.options.length ? (
            <Button
              variant='outline-danger'
              size='sm'
              onClick={methods.clearAll}
            >
              Clear All
            </Button>
          ) : (
            <Button
              variant='outline-secondary'
              size='sm'
              onClick={methods.selectAll}
            >
              Select All
            </Button>
          )}
        </div>
        <hr />
        <div style={{ msOverflowY: 'auto' }}>
          {props.options
            .filter(item => regexp.test(item[props.searchBy] || item.tag))
            .map(option => (
              <span
                key={option.tag}
                className={`badge badge-pill badge-${
                  methods.isSelected(option) ? 'danger' : 'secondary'
                } mx-1`}
                style={{ cursor: 'pointer' }}
                onClick={() => methods.addItem(option)}
              >
                {option.tag}
              </span>
            ))}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <ButtonToolbar>
        <Dropdown className='mb-1 mr-1'>
          <Dropdown.Toggle
            variant='link'
            id='dropdown-basic'
            className='text-danger text-capitalize'
          >
            School:{' '}
            {searchField.school !== '' ? searchField.school : 'Any School'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey=''
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  school: eventKey
                })
              }
            >
              Any
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='annenberg'
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  school: eventKey
                })
              }
            >
              Annenberg
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='marshall'
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  school: eventKey
                })
              }
            >
              Marshall
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='viterbi'
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  school: eventKey
                })
              }
            >
              Viterbi
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='mb-1 mr-1'>
          <Dropdown.Toggle
            variant='link'
            id='dropdown-basic'
            className='text-danger text-capitalize'
          >
            {searchField.featured === ''
              ? 'Any events'
              : searchField.featured === 'true'
              ? 'Featured Only'
              : 'Non-Featured Only'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey=''
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  featured: eventKey
                })
              }
            >
              Any events
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='true'
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  featured: eventKey
                })
              }
            >
              Featured Only
            </Dropdown.Item>
            <Dropdown.Item
              eventKey='false'
              onSelect={eventKey =>
                setSearchField({
                  ...searchField,
                  featured: eventKey
                })
              }
            >
              Non-Featured Only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className='d-none d-md-block mb-2 mr-2' style={{ width: '250px' }}>
          <Select
            multi
            loading
            clearable
            options={options}
            values={[]}
            labelField='tag'
            valueField='tag'
            searchBy='tag'
            sortBy='tag'
            placeholder='Search for tags...'
            color='red'
            dropdownRenderer={customDropdownRenderer}
            optionRenderer={customOptionRenderer}
            onChange={values =>
              setSearchField({
                ...searchField,
                tags: values.map(value => value.tag).join(',')
              })
            }
          />
        </div>
        <div
          className='d-sm-block d-md-none mb-2 mr-2'
          style={{ display: 'flex' }}
        >
          <Select
            multi
            loading
            clearable
            options={options}
            values={[]}
            labelField='tag'
            valueField='tag'
            searchBy='tag'
            sortBy='tag'
            placeholder='Search for tags...'
            color='red'
            dropdownRenderer={customDropdownRenderer}
            optionRenderer={customOptionRenderer}
            onChange={values =>
              setSearchField({
                ...searchField,
                tags: values.map(value => value.tag).join(',')
              })
            }
          />
        </div>
        <Button
          variant='outline-success'
          className='mb-1'
          style={{ maxHeight: '38px' }}
          onClick={() => handleSearchClick()}
        >
          Search <i className='fas fa-search' />
        </Button>
      </ButtonToolbar>
    </Fragment>
  );
};

DropDown.propTypes = {
  searchField: PropTypes.object.isRequired,
  setSearchField: PropTypes.func.isRequired
};

export default DropDown;
