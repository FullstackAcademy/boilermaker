import React from 'react';
import { Link } from 'react-router';
import ImageForm from './ImageForm';

export default function Result (props) {
  const bg = props.bg;
  const images = props.images;
  const height = screen.height * images.length;
  let i = 0;

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
        {
          images && images.map ( img => {
            return (
              <div>
              <img className={img.speed} src={img.url} style={{
                zIndex: img.speed,
                margin: 0,
                padding: 0,
                width: '100%',
                position: 'absolute',
                top: screen.height * i++
              }} />
              </div>
            )
          })
        }
      </div>
  );
}
