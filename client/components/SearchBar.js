import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';

const SearchBar = (props) => {
  const { options } = props;
  console.log(options);
  return (
    <div>
      <Typeahead
        options={options}
        minLength={0}
        placeholder="Search..."
        // onSearch={handleSearch}
      />
    </div>
  )
}
export default SearchBar;