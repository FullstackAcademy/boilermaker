import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Label, PageHeader, Image, Panel } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CategoryList = (props) => {
  const { categories } = props;
  return (
    <div>
      <h1 className="home-category-list animated fadeIn">
        <Panel className="center-block" id="home-category-list-title">
          <Panel.Heading componentClass="home-category-list-title">
            Featured Categories
          </Panel.Heading>
        </Panel>
      </h1>
      <div className="home-category-list animated slideInLeft">
        {
          categories.slice(0, 4).map(category => {
            return (
              <NavLink to={`/categories/${category.name}/channels`} key={category.id}>
                <div className="home-category-list-item">
                  <Panel>
                    <Panel.Heading componentClass="home-category-list-item-header">
                      {category.name}
                    </Panel.Heading>
                  </Panel>
                  <Image src={`${category.imagePath}`} className={"home-category-list-item-image"} rounded />
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