import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import Autosuggest from 'react-bootstrap-autosuggest';

const SearchBar = (props) => {
  const { channels, users, getFilteredUsers, fetchFilteredChannels, handleSubmit } = props
  return (
    <div>
      <form onSubmit={evt => handleSubmit(evt, users.filteredUserList, channels.filteredChannelList)}>
        <FormGroup>
          <Autosuggest
            datalist={users.filteredUserList}
            name="search"
            type="text"
            placeholder="Search..."
            itemValuePropName="userName"
            onSearch={getFilteredUsers}
            closeOnCompletion={false}
            showToggle={false}
            bsSize={'large'}
          />
        </FormGroup>
      </form>
    </div>
  )
}

export default SearchBar