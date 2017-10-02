import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileIds: [],
      profilesById: {},
    }
  }
  // this is really ugly.  how can i do this nicer??
  start = () => {
    let state = this.state;
    const ids = [1, 2, 3];
    ids.forEach(id => {
      state = this.addProfile(state, id);
    });

    this.setState(state);
  }
  nextProfile = () => {
    let state = this.state;
    state = this.hideProfile(state, state.profileIds[0]);
    this.setState(state);
    setTimeout(() => {
      state.profileIds.shift();
      state = this.addProfile(state, Math.floor(Math.random()*151 + 1));
      this.setState(state);
    }, 1000);
  }

  hideProfile = (state, id) => {
    try {
      state.profilesById[id].isHidden = true;
      return state;
    }
    catch(e) {
      return state;
    }
  }
  addProfile = (state, id) => {
    state.profileIds.push(id);
    state.profilesById[id] = {
      isHidden: false,
      isLoaded: false,
    };
    this.fetchProfileData(id);
    return state;
  }

  // messy af, but lowkey works?
  fetchProfileData = async (id) => {
    let profile = this.state.profilesById[id];
    profile.name = 'bob'; // spoof coz api is slow af atm
    // profile.name = await pokeApi.getName(id, 'ja');
    profile.sprite = await pokeApi.getSprite(id);
    profile.isLoaded = (profile.name && profile.sprite);
    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: profile
      }
    });
  }
  render() {
    console.log(this.state.profileIds);
    const cards = this.state.profileIds.map((id, i) => 
      <ProfileCard key={i} profile={this.state.profilesById[id]} zIndex={-i} />
    );
    return (
      <div>
        <button onClick={() => this.start()}>START</button>
        <button onClick={() => this.nextProfile()}>NEXT</button>
        {cards}
      </div>
    );
  }
}
export default App;
