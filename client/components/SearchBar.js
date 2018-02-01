import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      userList: {},
      channelList: {}
    };
  }
  render() {
    return (
      <div>
        <Typeahead
        options={[]}
        minLength={3}
        placeholder="Search..."
        />
      </div>
    )
  }
}
export default SearchBar