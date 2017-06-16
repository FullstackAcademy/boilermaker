import React from 'react';
import { Link } from 'react-router';
import ImageForm from './ImageForm';

export default function Home (props) {
  const handleBG = props.handleBG;
  const handleSubmit = props.handleSubmit;
  const handleImage = props.handleImage;
  const handleSpeed = props.handleSpeed;
  const addImage = props.addImage;

  return (
      <div>
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <form className="form-horizontal" id="ready-form" onSubmit={handleSubmit}>
            <h1 className="fancy-type caps" id="complete">You complete me.</h1>
            <hr />
            <div className="form-group">
              <h3 className="fancy-type">Pick a background image</h3>
              <h4 className="fancy-type"><span className="bold caps">Important note:</span> your background image should be <span className="italic"> seamless </span> as it will be repeated</h4>
              <label className="col-sm-3 control-label">Background Image URL:</label>
              <div className="col-sm-9">
                <input type="bg" onChange={handleBG} className="form-control" id="inputeBG" placeholder="background image" />
              </div>
              <div id="radios">
                <h4 id="background-check">My background image is seamless:</h4>
                <label className="radio-inline">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> Yes.
                </label>
                <label className="radio-inline">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> No, I acknowledge my own bad judgement.
                </label>
              </div>

            </div>
            <ImageForm handleImage={handleImage} handleSpeed={handleSpeed} />
            <button type="button" onClick={addImage} className="btn btn-default caps" id="add">+</button>
            <button type="submit" className="btn btn-default caps" id="submit">Hit me with it</button>
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
  );
}
