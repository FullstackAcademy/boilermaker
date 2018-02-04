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
    const { searchResults, handleSearch } = this.props;
    return (
      <div>
        <AsyncTypeahead
          options={searchResults}
          isLoading={this.state.isLoading}
          delay={350}
          labelKey={'userName'}
          minLength={3}
          placeholder="Search..."
          bsSize={'large'}
          submitFormOnEnter={true}
          onChange={(foundChannel) => history.push(`/users/${foundChannel[0].id}`)}
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