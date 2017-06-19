import React from 'react';
import { Link } from 'react-router';

export default function ImageForm (props) {
  const handleImage = props.handleImage;
  const handleSpeed = props.handleSpeed;

  return (
    <div className="form-group">
      <h3 className="fancy-type">2. Enter at least one image</h3>
      <div className="col-sm-10">
        <input onChange={handleImage} type="img"  className="form-control" id="inputBG" placeholder="image url" />
      </div>
      <div className="col-sm-10">
        <input onChange={handleSpeed} type="text"  className="form-control" id="inputBG" placeholder="scroll speed in %" />
      </div>
    </div>
  );
}
