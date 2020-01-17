import { auth } from '~/services/fireInit.js';

export default context => {
  const { store } = context;

  new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async user => {
      try {
        console.log('Auth State changed, User: ', user);
        if (user) {
          const tokenResult = await user.getIdTokenResult();
          return resolve(store.dispatch('user/storeUserOnClient', { user, tokenResult }));
          
        }
        return resolve(store.commit('user/CLEAR_AUTH'));
      } catch (e) {
        console.log('fireAuth error', e);
      }
    });
  });
};
