import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Label } from 'react-bootstrap';

const CategoryList = (props) => {
  const { categoryList } = props;
  return (
    <div>
      <h2>
        <Label bsStyle="warning">
          Category List
        </Label>
      </h2>
      <ul>
        {
          categoryList.map(categoryName => {
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
  )
}

export default CategoryList;