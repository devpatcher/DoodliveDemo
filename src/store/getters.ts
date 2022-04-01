const getters = {
  getUser(state) {
    return state.user;
  },
  getAvatar(state) {
    return state.avatar;
  },
  getError(state) {
    return state.error;
  }
};

export default getters;