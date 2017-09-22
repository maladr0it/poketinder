import React from 'react';

// format this so it has basic shape even when not loaded
const ProfileCard = (props) => {
  const isLoaded = (props.profile) ? true : false;
  return (
    <div>
      {(isLoaded)? props.profile.name : ''}
      {(isLoaded)? <img src={URL.createObjectURL(props.profile.sprite)} /> : <div />}
      <button>COOL!</button>
      <button>LAME!</button>
    </div>
  )
}

export default ProfileCard;