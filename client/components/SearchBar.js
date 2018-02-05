import React, { Component } from 'react';
import history from '../history'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class SearchBar extends Component {
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
      <div className="search-bar-container">
        <AsyncTypeahead
          options={searchResults}
          isLoading={this.state.isLoading}
          delay={350}
          labelKey={'name'}
          minLength={2}
          placeholder="Search categories..."
          bsSize={'large'}
          submitFormOnEnter={true}
          onChange={(foundChannel) => history.push(`/channels/${foundChannel[0].name}`)}
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
export default SearchBar;