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
      <Grid.Row>
        <Grid.Column id="logo" width={4}>
          <Image
            rounded={true}
            id="getstartedimg"
            src="https://www.ajc.com/rf/image_inline/Pub/p8/CmgSharedContent/2017/12/04/Images/GettyImages-830954658.jpg"
          />
          <strong id="welcom"> Wellcome, Start Learning Sign Today</strong>
          <Button id="getstartedbutton">
            <Icon size="large" name="american sign language interpreting" />
            Get Started
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default EntryPage
