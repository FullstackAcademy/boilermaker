import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 345,
    justifySelf: 'center',
    width: '100%'
  },
  media: {
    height: 140
  },
  fullWidth: {
    width: '100%'
  }
}

const CourseCard = props => {
  const {classes} = props
  const {id, name} = props.course
  return (
    <Card className={classes.card}>
      <Link to={`/courses/${id}`}>
        <CardActionArea className={classes.fullWidth}>
          <CardMedia className={classes.media} title={name} />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CourseCard)
