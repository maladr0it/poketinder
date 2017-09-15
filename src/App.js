import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';

// app is a stack of 'cards' that is worked through.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: {},
      cardIds: [11, 31, 59, 111, 3],
    }
  }
  // this should only run on a legitimate names object

  // creates an object
  fetchProfile = async (id) => {
    const name = await pokeApi.getName(id, 'ja')
    const sprite = await pokeApi.getSprite(id);
    this.setState({
      profiles: { ...this.state.profiles,
        [id]: { name: name, sprite: sprite }
      }
    })
  }
  loadProfiles = () => {
    this.state.cardIds.forEach(id => this.fetchProfile(id));
  }
  render() {
    console.log(this.state.profiles)
    const cards = this.state.cardIds.map((id, i) => 
      <ProfileCard key={i} profile={this.state.profiles[id]} />
    );
    return (
      <div>
        <button onClick={() => this.loadProfiles()}>FETCH</button>
        {cards}
      </div>
    );
  }
}
export default App;
