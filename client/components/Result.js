import React from 'react';
import { Link } from 'react-router';
import ImageForm from './ImageForm';

export default function Home (props) {
  const bg = props.bg;
  const images = props.images;

  return (
      <div style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'repeat',
          color: 'red',
          zIndex: 0,
          margin: '0 !important',
          padding: '0 !important'
        }}>
        {
          images && images.map ( img => {
            return (
              <img src={img.url} style={{
                zIndex: img.speed/10,
                margin: 0,
                padding: 0
              }} />
            )
          })

        }
      </div>
  );
}
