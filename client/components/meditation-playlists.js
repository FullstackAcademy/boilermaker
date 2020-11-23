import React from 'react'
import {Image, Container, Row, Col, Button, Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import {ErrorBoundary} from './index'
import axios from 'axios'

const MeditationPlaylist = ({currentPlaylist, playlists}) => {
  async function handleClick() {
    try {
      // const {data} = await fetchDevice()
      // const device  = data[0].id
      const link = currentPlaylist.uri
      await axios.put(`/api/spotify/`, {
        context_uri: link,
        offset: {
          position: 0
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchDevice() {
    try {
      return await axios.get(`/api/spotify/`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ErrorBoundary>
      <Card className="ml-3">
        <Card.Body>
          <Image
            src={currentPlaylist.images[0].url}
            className="ml-3"
            style={{flexShrink: '3'}}
            rounded
          />
          <div className="flex-row justify-content-start">
            <div>
              <Card.Title>{currentPlaylist.name} </Card.Title>
              <Card.Text>by {currentPlaylist.owner.id}</Card.Text>
              {currentPlaylist.description ? (
                <p>{currentPlaylist.description}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            <Button
              type="button"
              variant="success"
              className="m-1"
              onClick={() => handleClick()}
            >
              Play
            </Button>
            {playlists}
          </div>
        </Card.Body>
      </Card>
    </ErrorBoundary>
  )
}

export default MeditationPlaylist

{
  /* <Container className="flex-column justify-content-center align-self-center"> */
}
{
  /* <Row> */
}
{
  /* <FontAwesomeIcon icon={faPlayCircle} style={{width: "", height: ""}}/> */
}
{
  /* </Col>
      </Row>
      </Container> */
}
