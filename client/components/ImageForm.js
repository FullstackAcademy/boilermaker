import React from 'react';
import { Link } from 'react-router';

export default function ImageForm (props) {
  const handleImage = props.handleImage;
  const handleSpeed = props.handleSpeed;

  return (
    <div className="form-group">
      <h3 className="fancy-type">2. Enter at least one image</h3>
      <label className="col-sm-3 control-label">Image URL:</label>
      <div className="col-sm-9">
        <input onChange={handleImage} type="img"  className="form-control" id="img-input" placeholder="image" />
      </div>
      <label className="col-sm-3 control-label">Scroll Speed:</label>
      <div className="col-sm-9">
        <input onChange={handleSpeed} type="text"  className="form-control" id="speed-input" placeholder="%" />
      </div>
    </div>
  );
}
