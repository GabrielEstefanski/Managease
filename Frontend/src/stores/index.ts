import { createStore, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { StoreIndex } from './types';

const state: StoreIndex = {
  isComponentOpen: false,
  locale: 'en',
  userId: '',
  userName: '',
};

const mutations = {
  openComponent(state: StoreIndex) {
    state.isComponentOpen = true;
  },
  closeComponent(state: StoreIndex) {
    state.isComponentOpen = false;
  },
  setUser(state: StoreIndex, user: { id: string; name: string }) {
    state.userId = user.id;
    state.userName = user.name;
  },
  clearUser(state: StoreIndex) {
    state.userId = '';
    state.userName = '';
  },
  setLocale(state: StoreIndex, teste: { locale: string }) {
    state.locale = teste.locale
  },
};

const store: Store<StoreIndex> = createStore({
  state,
  mutations,
  plugins: [createPersistedState()]
});

export default store;
