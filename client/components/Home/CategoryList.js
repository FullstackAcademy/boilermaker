import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Label, PageHeader } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CategoryList = (props) => {
  const { categories } = props;
  return (
    <div>
      <h1 className="home-category-list animated fadeIn">
        <Label bsStyle="warning">
          Category List
    </Label>
      </h1>
      <div className="home-category-list animated slideInLeft">
        {
          categories.map(category => {
            return (
              <NavLink to={`/categories/${category.name}/channels`} >
                <div key={category.id} className="home-category-list-item">
                  <h1>
                    {category.name}
                  </h1>
                  <img src={`${category.imagePath}`} className="home-category-list-images" />
                </div>
              </NavLink>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryList;