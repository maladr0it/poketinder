import React, { Component } from 'react';
import pokeApi from './pokeApi';
import ProfileCard from './components/ProfileCard';

const styles = {
  root: {
    margin: 'auto',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProfileIds: [],
      profilesById: {},
      rng: [],
    }
  }
  componentWillMount = () => {
    let state = this.state;
    state.rng = Array.from(Array(151), (v, i) => i + 1)
      .sort(() => Math.random() - 0.5)
    state.rng.splice(0, 5).forEach(id => {
      state = this.addProfile(state, id);
    });
    this.setState(state);
  }
  rateProfile = (id, rating) => {
    let state = this.state;
    state.profilesById[id].rating = rating;
    this.setState(state);
    setTimeout(() => {
      this.nextProfile();
    }, 500);
  }
  nextProfile = () => {
    let state = this.state;
    state = this.removeProfile(this.state);
    state = this.addProfile(state, state.rng.pop());
    this.setState(state);
  }
  fetchProfileData = async (id) => {
    let profile = this.state.profilesById[id];
    const name = await pokeApi.getName(id, 'ja');
    const sprite = await pokeApi.getSprite(id);
    profile.isLoaded = (name && sprite) ? true : false;
    profile = Object.assign({}, profile, { name, sprite });
    this.setState({
      profilesById: {
        ...this.state.profilesById,
        [id]: profile
      }
    });
  }
  addProfile = (state, id) => {
    state.activeProfileIds.push(id);
    state.profilesById[id] = {
      rating: undefined,
      isLoaded: false,
    };
    this.fetchProfileData(id);
    return state;
  }
  removeProfile = (state) => {
    state.activeProfileIds.shift();
    return state;
  }
  render() {
    const cards = this.state.activeProfileIds.slice().reverse().map((id, i) => 
      <ProfileCard
        key={id}
        profile={this.state.profilesById[id]}
        onLike={() => this.rateProfile(id, 'like')}
        onDislike={() => this.rateProfile(id, 'dislike')}
      />
    )
    return (
      <div style={styles.root}>
        HELLO
        {cards}
      </div>
    );
  }
}
export default App;
