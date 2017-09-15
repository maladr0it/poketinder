import React from 'react';

const ProfileCard = (props) => {
  if (!props.profile) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {props.profile.name}
      <img src={URL.createObjectURL(props.profile.sprite)} />
      <button>COOL!</button>
      <button>LAME!</button>
    </div>
  )
}

export default ProfileCard;