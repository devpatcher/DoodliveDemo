import firebase from "firebase/app";
import router from '../router';

const actions = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
        router.push('/');
      } else {
        commit("setUser", null);
        router.push('/login');
      }
    });
  },
  signInAction({ commit }, payload: any) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        commit("setError", error.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch(error => {
        commit("setError", error.message);
      });
  }
};

export default actions;