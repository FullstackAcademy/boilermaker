import React from 'react';
import { Link } from 'react-router';
import ImageForm from './ImageForm';

export default function Home (props) {
  const handleBG = props.handleBG;
  const handleSubmit = props.handleSubmit;
  const handleImage = props.handleImage;
  const handleSpeed = props.handleSpeed;
  const addImage = props.addImage;
  const flash = props.flash;
  const toggleFlash = props.toggleFlash;
  const message = "Got it. To add more just reuse the boxes!";

  return (
      <div>
        <div className="col-lg-2"></div>
        <div className="col-lg-8 row">
          <form className="form-horizontal" id="ready-form" onSubmit={handleSubmit}>
            <h1 className="fancy-type caps" id="complete">You complete me.</h1>
            <hr />

            <div className="form-group col-lg-6">
              <h3 className="fancy-type">1. Pick a seamless background</h3>
              <div className="col-sm-10">
                <input type="bg" onChange={handleBG} className="form-control" id="inputBG" placeholder="background image url" />
              </div>
              <div id="radios">

                <label className="radio">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> Yes, my image is seamless
                </label>
                <label className="radio">
                  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> No, I'm bad with directions.
                </label>
              </div>
            </div>
            <div className="col-lg-6 right-side">
              <ImageForm handleImage={handleImage} handleSpeed={handleSpeed} />
              <button type="button" onClick={addImage} className="btn btn-default caps" id="add">+</button>
              {
                flash ? (
                  <div id="flash">
                    <p>{message}</p>
                  </div>
                ): null
              }
            </div>
            <button type="submit" className="btn btn-default caps" id="submit">Hit me with it</button>
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
  );
}
