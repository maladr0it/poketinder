import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  // textAlign: 'center',
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    margin: 'auto',
  },
  image: {
    height: '100%'
  },
}

const ProfileCard = (props) => {
  const isLoaded = (props.profile);
  const nameTitle = (isLoaded) ?
    <CardTitle title={props.profile.name} /> : undefined
  const sprite = (isLoaded) ?
    <img
      style={style.image}
      src={URL.createObjectURL(props.profile.sprite)}
    />
      :
    <CircularProgress
      color={'FFCA28'}
      size={120}
      thickness={5}
    />
  return (
    <Card>
      <CardMedia overlay={nameTitle}>
        <div style={style.imageContainer}>
          {sprite}
        </div>
      </CardMedia>
      <button>COOL!</button>
      <button>LAME!</button>
    </Card>
  )
}

export default ProfileCard;