import React, { Component } from 'react';
import history from '../../history'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    }
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    this.state.isLoading ? this.setState({ isLoading: false }) : this.setState({ isLoading: true })
  }

  render() {
    const { searchResults, handleSearch, loadUser } = this.props;
    return (
      <div className="search-user animated slideInUp">
        <AsyncTypeahead
          options={searchResults}
          isLoading={this.state.isLoading}
          delay={100}
          labelKey={'userName'}
          minLength={3}
          placeholder="Search users..."
          bsSize={'large'}
          submitFormOnEnter={true}
          onChange={
            foundUser => {
            loadUser(foundUser[0].id);
            history.push(`/users/${foundUser[0].id}`);
            window.location.reload();
            }}
          onSearch={
            query => {
              this.toggleLoading();
              handleSearch(query);
              this.toggleLoading();
            }
          }
        />
      </div>
    )
  }
}
export default SearchUser;