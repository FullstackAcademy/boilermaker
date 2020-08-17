import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: 40,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  style: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.purple,
    fontSize: 40,
    marginBottom: theme.spacing(0),
    backgroundImage:
      'url(https://cms.qz.com/wp-content/uploads/2018/10/Untitled-1.jpg?quality=75&strip=all&w=1200&h=900&crop=1)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  tech: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: 40,
    marginBottom: theme.spacing(0),
    backgroundImage:
      'url(https://assets.podomatic.net/images/podcast/customizer/backgrounds/full/1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  cuisine: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: '#33eb91',
    fontSize: 40,
    marginBottom: theme.spacing(0),
    backgroundImage:
      'url(https://www.beyondceliac.org/wp-content/uploads/2019/08/gluten-free-foods.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(15),
      paddingRight: 0
    }
  }
}))

export default function StylePage() {
  const classes = useStyles()
  const sections = ['style', 'tech', 'cuisine']

  return (
    <div>
      <Paper className={classes.mainFeaturedPost}>
        {/* Increase the priority of the hero background image */}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              />
            </div>
          </Grid>
          <h1>LETS TREND</h1>
        </Grid>
      </Paper>
    </div>
  )
}
