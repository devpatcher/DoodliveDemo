import { createStore } from 'vuex';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const initialState = () => {
  return {
    user: '',
    avatar: '',
    error: '',
  };
};

const store = createStore({
	state: initialState(),
	mutations: mutations,
	actions: actions,
  getters: getters,
});

export default store;