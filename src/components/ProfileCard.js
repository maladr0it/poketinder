import React from 'react';

import {Card, CardTitle, CardMedia, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Clear from 'material-ui/svg-icons/content/clear';

const styles = {
  root: {
    textAlign: 'center',
    position: 'absolute',
  },
  swipingLeft: {
    transform: 'translate(-600px, -100px)',
    opacity: 0,
    transition: '0.5s'
  },
  swipingRight: {
    transform: 'translate(+600px, -100px)',
    opacity: 0,
    transition: '0.5s'
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
  },
  iconButton: {
    width: 100,
    height: 100,
  },
  favoriteIcon: {
    width: 72,
    height: 72,
    color: '9CCC65'
  },
  clearIcon: {
    width: 72,
    height: 72,
    color: 'e53935'
  },
  circularProgress: {
    color: 'FFCA28',
    size: 120,
    thickness: 5,
  }
}

const ProfileCard = (props) => {
  const isLoaded = (props.profile.isLoaded);
  const rating = (props.profile.rating);
  const nameTitle = (isLoaded) ? (
    <CardTitle title={props.profile.name} />
  ) : (
    undefined
  );
  const sprite = (isLoaded) ? (
    <img
      style={styles.image}
      src={URL.createObjectURL(props.profile.sprite)}
    />
  ) : (
    <CircularProgress {...styles.circularProgress} />
  );

  const animations = {
    'like' : styles.swipingRight,
    'dislike' : styles.swipingLeft
  };

  const derivedRootStyle = Object.assign({},
    styles.root,
    animations[rating]
  );
  return (
    <Card style={derivedRootStyle}>
      <CardMedia overlay={nameTitle}>
        <div style={styles.imageContainer}>
          {sprite}
        </div>
      </CardMedia>
      <CardActions>
      <IconButton
          disabled={(!isLoaded)}
          style={styles.iconButton}
          iconStyle={styles.clearIcon}
          onClick={() => props.onDislike()}
        >
          <Clear />
        </IconButton>
        <IconButton
          disabled={(!isLoaded)}
          style={styles.iconButton}
          iconStyle={styles.favoriteIcon}
          onClick={() => props.onLike()}
        >
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProfileCard;