import cookieDecoder from '~/services/cookie-decoder';
export const state = () => ({});

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req) {
      const rawCookie = req.headers.cookie;
      if (rawCookie) {
        const state = cookieDecoder(rawCookie, 'vuex');
        commit('user/SET_AUTH', state);
      }
    }
  }
};

export const getters = {};
