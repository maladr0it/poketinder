import React from 'react';
import {Card, CardTitle, CardMedia, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';

import Favorite from 'material-ui/svg-icons/action/favorite';
import Clear from 'material-ui/svg-icons/content/clear';

const styles = {
  root: {
    textAlign: 'center'
  },
  hidden: {
    opacity: 0,
    transition: '5s'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    margin: 'auto',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  iconButton: {
    width: 100,
    height: 100,
  },
  icon: {
    width: 72,
    height: 72,
  }
}

const ProfileCard = (props) => {
  const isLoaded = (props.profile);
  const nameTitle = (isLoaded) ? (
    <CardTitle title={props.profile.name} />
  ) : (
    undefined
  )
  const sprite = (isLoaded) ? (
    <img
      style={styles.image}
      src={URL.createObjectURL(props.profile.sprite)}
    />
  ) : (
    <CircularProgress
      color={'FFCA28'}
      size={120}
      thickness={5}
    />
  );


  // messy af, but works.  chill for a sec then fix
  const hiddenStyle = (props.hidden) ? styles.hidden : {}
  // detect if item is hidden
  // style={Object.assign({}, styles.root, styles.hidden)}
  // <Card style={styles.root}>
  return (
    <Card style={Object.assign({}, styles.root, hiddenStyle)}>
      <CardMedia overlay={nameTitle}>
        <div style={styles.imageContainer}>
          {sprite}
        </div>
      </CardMedia>
      <CardActions>
        <IconButton style={styles.iconButton} iconStyle={styles.icon}>
          <Favorite color={'9CCC65'} />
        </IconButton>
        <IconButton style={styles.iconButton} iconStyle={styles.icon}>
          <Clear color={'e53935'} />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProfileCard;