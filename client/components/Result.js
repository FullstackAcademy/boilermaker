import React from 'react';
import { Link } from 'react-router';
import ImageForm from './ImageForm';

export default function Result (props) {
  const bg = props.bg;
  const images = props.images;
  const height = screen.width;
  const toggleCode = props.toggleCode;
  const showCode = props.showCode;

  const code = ["$(window).scroll(function(event){",
    "  parallax();",
     "});",
    "function parallax(){",
    "  var scrolled = $(window).scrollTop();",
    "  $('.bg').css('top',-(scrolled*0.1)+'px');",
    "  $('.100').css('top',-(scrolled)+'px');",
    "  $('.150').css('top',-(scrolled*1.5)+'px');",
    "  $('.200').css('top',-(scrolled*2)+'px');",
    "  $('.250').css('top',-(scrolled*2.5)+'px');",
    "  $('.300').css('top',-(scrolled*3)+'px');",
    "}"]


  return (
      <div className="bg" style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'repeat',
          zIndex: 0,
          margin: '0 !important',
          padding: '0 !important',
          minHeight: height,
          minWidth: '100%',
          position: 'absolute'
        }}>
        <button type="button" onClick={toggleCode} className="btn btn-default caps" id="code">Get the code</button>
        {
          showCode ? (
            <div className="row">
              <div className="col-lg-3"></div>
              <div id="code-box" className="col-lg-6">
                <div className="inner-code">
                  <h1 className="fancy-type caps your-code">Your code</h1>
                  <hr />
                   {code.map ( (line, i) => {
                    return (
                      <p key={i}> {line} </p>
                    )
                  })}
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          ) : null
        }
        {
          images && images.map ( (img, i) => {
            return (
              <div>
                <img key={i} className={img.speed} src={img.url} style={{
                  zIndex: img.speed,
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  position: 'absolute'
                }} />
              </div>
            )
          })
        }
      </div>
  );
}
