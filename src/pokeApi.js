const pokeApi = {
  async getName(id, lang) {
    try {
      const resp = await fetch(
        'https://pokeapi.co/api/v2/pokemon-species/'+id+'/'
      );
      if (!resp.ok) {
        throw new Error('name not found');
      }
      const respJson = await resp.json();
      return this.localise(respJson.names, lang)
    }
    catch(e) {
      console.log(e.message);
      return 'name';
    }
  },
  async getSprite(id) {
    try {
      const resp = await fetch(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png'
      );
      if (!resp.ok) {
        throw new Error('sprite_not_found');
      }
      return resp.blob();
    }
    catch(e) {
      console.log(e.message);
      return new Blob();
    }
  },
  localise(names, lang) {
    try {
      return names.find(n => n.language.name === lang).name;
    }
    catch(e) {
      console.log(e.type);
      return 'no_translation';
    }
  },
}

export default pokeApi;