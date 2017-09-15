const pokeApi = {
  async getName(id, lang) {
    try {
      const resp = await fetch(
        'https://pokeapi.co/api/v2/pokemon-species/'+id+'/'
      );
      if (!resp.ok) {
        throw 'name_not_found';
      }
      const respJson = await resp.json();
      return this.localise(respJson.names, lang)
    }
    catch(e) {
      return e;
    }
  },
  async getSprite(id) {
    try {
      const resp = await fetch(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png'
      );
      if (!resp.ok) {
        throw 'invalid_url'
      }
      return resp.blob();
    }
    catch(e) {
      return e;
    }
  },
  localise(names, lang) {
    try {
      return names.find(n => n.language.name === lang).name;
    }
    catch(e) {
      return 'no_translation';
    }
  },
}

export default pokeApi;