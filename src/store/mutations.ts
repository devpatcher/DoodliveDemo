const mutations = {

  setUser(state, payload) {
    if (payload) {
      state.user = payload.displayName;
      state.avatar = payload.photoURL;
    } else {
      state.user = '';
      state.avatar = '';
    }
  }
};

export default mutations;