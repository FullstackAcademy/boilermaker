import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Label } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CategoryList = (props) => {
  const { channels } = props;
  return (
    <ReactCSSTransitionGroup
      transitionName="transition"
      transitionAppear={true}
      transitionAppearTimeout={750}
      transitionEnter={false}
      transitionLeave={false}>
      <h2>
        <Label bsStyle="warning">
          Category List
        </Label>
      </h2>
      <ul>
        {
          channels.categoryList.map(categoryName => {
            return (
              <li key={categoryName}>
                <NavLink to={`/categories/${categoryName}/channels`} >
                  <h3>
                    {categoryName}
                  </h3>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </ReactCSSTransitionGroup>
  )
}

export default CategoryList;