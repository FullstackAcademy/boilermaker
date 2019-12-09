import React from 'react'
import {
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
import {Z_FIXED} from 'zlib'

export const Footer = () => {
  return (
    <div id="footer">
      <Segment
        id="footerseg"
        inverted
        vertical
        style={{
          margin: '3em 0em 0em',
          padding: '0em 0em',
          position: 'absolute',
          attached: 'bottom'
        }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Learning" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Links" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About Us" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="AllSign" />
              <p>
                Check out all our different features. Try practicing with the
                signs displayed as you attempt to learn, but if your confident
                try completeing the learning section where there is no
                assistance.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image
            centered
            size="mini"
            src={require('../../public/images/circle-cropped.png')}
          />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  )
}
