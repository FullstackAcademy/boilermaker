import React from 'react';
import { Link } from 'react-router';

export default function Home (props) {
  const handleBG = props.handleBG;
  const handleSubmit = props.handleSubmit;

  return (
      <div>
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <form className="form-horizontal" id="ready-form">
            <h1 className="fancy-type caps" id="complete">You complete me.</h1>
            <hr />
            <div className="form-group">
              <h3 className="fancy-type">Pick a background image</h3>
              <h4 className="fancy-type"><span className="bold caps">Important note:</span> your background image should be <span className="italic"> seamless </span> as it will be repeated</h4>
              <label for="inputBG" className="col-sm-3 control-label">Background Image:</label>
              <div className="col-sm-9">
                <input type="bg" className="form-control" id="inputeBG" placeholder="background image" />
              </div>
              <div id="radios">
                <label className="radio-inline">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> Yes
                </label>
                <label className="radio-inline">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> No, I acknowledge my own bad design judgment
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
  );
}
