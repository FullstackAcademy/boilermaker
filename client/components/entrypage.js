import React from 'react'
import {Video} from './index.js'
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Button
} from 'semantic-ui-react'

const EntryPage = () => {
  return (
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column />
        <Grid.Column />
        <Grid.Column id="logo">
          <div>
            <div>
              <Image
                rounded={true}
                id="getstartedimg"
                src="https://www.ajc.com/rf/image_inline/Pub/p8/CmgSharedContent/2017/12/04/Images/GettyImages-830954658.jpg"
              />
            </div>
            <strong>Wellcome, Start Learning Sign Today</strong>
            <div>
              <Button id="getstartedbutton" color="honeydew">
                <Icon size="large" name="american sign language interpreting" />
                Get Started
              </Button>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column />
        <Grid.Column />
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={4}>
          <p />
        </Grid.Column>
        <Grid.Column width={8}>
          <p>
            <span />
          </p>
        </Grid.Column>
        <Grid.Column width={4}>
          <p>
            <span />
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default EntryPage
