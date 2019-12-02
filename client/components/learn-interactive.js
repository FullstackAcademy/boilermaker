import React, {Component} from 'react'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'
import axios from 'axios'
// import Camera from './camera.js'
// import Photo from './photo.js'
import * as tf from '@tensorflow/tfjs'
import WebcamModal from './Camera'
import {webcam} from '@tensorflow/tfjs-data'
import {Navbar} from '.'
import {Footer} from './footer'
import {cpus} from 'os'

const Interactive = () => {
  return (
    <div>
      <Navbar />
      <Segment style={{padding: '8em 0em', color: 'white'}} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{fontSize: '2em', color: 'white'}}>
                We Help those who want to learn ASL
              </Header>
              <p style={{fontSize: '1.33em', color: 'white'}}>
                Using tensorflow we can recognize your image to tell you how
                your doing.
              </p>
              <Header as="h3" style={{fontSize: '2em', color: 'white'}}>
                If your ready to start learning hit the start button.
              </Header>
              <WebcamModal />
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://www.aussiedeafkids.org.au/site/resized/80-03062015182514-35-55-690-250-1070x390-cropped-dreamstime_s_34718081.jpg"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" />
          </Grid.Row>
        </Grid>
      </Segment>
      <Footer />
    </div>
  )
}
export default Interactive
