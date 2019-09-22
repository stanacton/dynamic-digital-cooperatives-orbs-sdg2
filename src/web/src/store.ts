import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

class State {
  userData?: string;
}

export default new Vuex.Store<State>({
  state: new State(),
  mutations: {
    userData(state, userData) {
      state.userData = userData;
    },
  },
  actions: {

  },
});
