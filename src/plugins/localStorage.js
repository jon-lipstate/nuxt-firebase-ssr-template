import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

export default ({ store, isHMR, app }) => {
  if (isHMR) return;
  // add persisted state as a vue mounted mixin
  if (!app.mixins) {
    app.mixins = [];
  }
  app.mixins.push({
    mounted() {
      createPersistedState({
        paths: ['user'],
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
          removeItem: key => Cookies.remove(key)
        }
      })(store);

      createPersistedState({
        paths: ['another-store-path']
      })(store);
    }
  });
};
//https://github.com/robinvdvleuten/vuex-persistedstate/issues/137
