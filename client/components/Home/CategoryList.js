import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Label } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CategoryList = (props) => {
  const { channels } = props;
  return (
    <div>
    <h2 className="home-category-list animated fadeIn">
      <Label bsStyle="warning">
        Category List
    </Label>
    </h2>
    <div className="home-category-list animated slideInLeft">
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
    </div>
    </div>
  )
}

export default CategoryList;