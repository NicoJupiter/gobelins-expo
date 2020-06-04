export const state = () => ({
  global: {},
  isPanning: false,
})

export const mutations = {
  SET_GLOBAL(state, global) {
    state.global = global
  },
  SET_ERROR(state, error) {
    state.global = error
  },
  SET_PANNING(state, value) {
    state.isPanning = value;
  }
};

export const actions = {
  async fetchGlobal({ commit }, $prismic) {
    try {
      const global = (await $prismic.api.getSingle('settings')).data;

      commit('SET_GLOBAL', global);
    } catch (e) {
      const error = 'Global settings not found';

      commit('SET_ERROR', error);
    }
  }
}
