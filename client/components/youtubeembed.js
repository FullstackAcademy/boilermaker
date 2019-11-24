import React from 'react'
const YoutubeEmbed = () => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '50%'
        }}
        src="https://www.youtube.com/embed/j5a0jTc9S10"
        frameBorder="0"
      />
    </div>
  )
}
export default YoutubeEmbed
