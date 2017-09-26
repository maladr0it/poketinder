import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';

// app is a stack of 'cards' that is worked through.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilesById: {},
      profileIds: [11, 31, 59, 111, 3]
    }
  }

  // remove profile at the top
  nextProfile = () => {
    this.setState({
      profileIds: this.state.profileIds.slice(1)
    });
  }

  // this should set state for a shell profile with no data
  createProfile = (id) => {
    const profile = {
      isHidden: false,
      isLoaded: false,
    }
    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: profile
      }
    })
  }

  // check out how to control precisely when it can act using await
  fetchProfileData = async (id) => {
    const profile = this.state.profilesById[id];
    const name = await pokeApi.getName(id, 'ja');
    const sprite = await pokeApi.getSprite(id);

    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: Object.assign({}, profile, { name: name, sprite: sprite, isLoaded: true })
      }
    });
  }
  start = () => {
    this.state.profileIds.forEach(id => {
      this.createProfile(id);
    })
  }
  // fetches profile data, adds it to the stack of profiles
  fetchAllData = () => {
    this.state.profileIds.forEach(id => {
      this.fetchProfileData(id);
    })
  }
  hideProfile = (id) => {
    const profile = this.state.profilesById[id];
    profile.isHidden = true;
    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: profile
      }
    })
  }
  render() {
    console.log(this.state);
    const cards = this.state.profileIds.map((id, i) => 
      <ProfileCard key={i} profile={this.state.profilesById[id]} />
    );
    return (
      <div>
        <button onClick={() => this.start()}>START</button>
        <button onClick={() => this.fetchAllData()}>FETCH</button>
        <button onClick={() => this.nextProfile()}>NEXT</button>
        <button onClick={() => this.hideProfile(31)}>HIDE</button>
        {cards}
      </div>
    );
  }
}
export default App;
