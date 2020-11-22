import React from 'react'
import {Image, Container, Row, Col, Badge} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'

const Song = props => {
  return (
    <Container className="flex-column justify-content-center align-self-center">
      {/* <Row> */}
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/d/df/You%27re_Dead%21.jpg"
        rounded
      />
      <div className="flex-row justify-content-start">
        {/* <FontAwesomeIcon icon={faPlayCircle} style={{width: "", height: ""}}/> */}
        <div>
          <h4>Song Title</h4>
          <h6>by Artist</h6>
        </div>
      </div>
      {/* </Col>
      </Row> */}
    </Container>
  )
}

export default Song
