import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CategoryList = (props) => {
  const { categories } = props;
  return (
    <ReactCSSTransitionGroup
      transitionName="transition"
      transitionAppear={true}
      transitionAppearTimeout={750}
      transitionEnter={false}
      transitionLeave={false}>
      <ListGroup>
        <div className="home-category-list animated slideInLeft">
          {
            categories.map(category => {
              return (
                <NavLink to={`/categories/${category.name}/channels`} key={category.id}>
                  <div className="home-category-list-item">
                    <h1>
                      {category.name}
                    </h1>
                    <img src={`${category.imagePath}`} className="home-category-list-item-image" />
                  </div>
                </NavLink>
              )
            })
          }
        </div>
      </ListGroup>
    </ReactCSSTransitionGroup>
  )
}

export default CategoryList;