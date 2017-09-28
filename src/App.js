import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileIds: [],
      profilesById: {},
      asyncData: {}
    }
  }
  // this is really ugly.  how can i do this nicer??
  start = () => {
    let state = this.state;
    const ids = [33, 43, 42, 95, 111];
    ids.forEach(id => {
      state = this.addProfile(state, id);
      this.fetchProfileData(id);
    });
    this.setState(state);
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
  // fade the top profile out
  nextProfile = () => {
    let state = this.state;
    state = this.hideProfile(state, state.profileIds[0]);
    this.setState(state);
    
    setTimeout(() => 
      this.setState({ profileIds: this.state.profileIds.slice(1) }), 250
    );
  }
  addProfile = (state, id) => {
    state.profileIds.push(id);
    state.profilesById[id] = {
      isHidden: false,
      isLoaded: false,
    };
    return state;
  }

  // messy af, but lowkey works?
  fetchProfileData = async (id) => {
    const profile = this.state.profilesById[id];
    profile.name = await pokeApi.getName(id, 'ja');
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
    // reverse so first card is rendered on top
    const cards = this.state.profileIds.slice().reverse().map((id, i) => 
      <ProfileCard key={i} profile={this.state.profilesById[id]} />
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
