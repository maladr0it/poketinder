import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';

// app is a stack of 'cards' that is worked through.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilesById: {},
      profileIds: [11, 31, 59, 111, 3],
    }
  }
  // remove profile at the top
  nextProfile = () => {
    this.setState({
      profileIds: this.state.profileIds.slice(1)
    });
  }
  // creates an object?
  fetchProfile = async (id) => {
    const name = await pokeApi.getName(id, 'ja');
    const sprite = await pokeApi.getSprite(id);
    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: { name: name, sprite: sprite }
      }
    });
  }
  // fetches profile data, adds it to the stack of profiles
  addProfile
  loadProfiles = () => {
    this.state.profileIds.forEach(id => this.fetchProfile(id));
  }
  render() {
    const cards = this.state.profileIds.map((id, i) => 
      <ProfileCard key={i} profile={this.state.profilesById[id]} />
    );
    return (
      <div>
        <button onClick={() => this.loadProfiles()}>FETCH</button>
        <button onClick={() => this.nextProfile()}>NEXT</button>
        {cards}
      </div>
    );
  }
}
export default App;
