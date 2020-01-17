import { db, auth, functions } from '~/services/fireInit';
import cookie from 'js-cookie';
import Vue from 'vue';
// ------------------- STATE ------------------- \\
export const state = () => ({
  uid: null,
  email: null,
  role: null
});
// ------------------- MUTATIONS ------------------- \\
export const mutations = {
  SET_AUTH(state, data) {
    state.uid = data.user.uid;
    state.email = data.user.email;
    state.role = data.user.role;
  },
  CLEAR_AUTH(state) {
    state.uid = null;
    state.email = null;
    state.role = null;
    cookie.remove('vuex');
  }
};
// ------------------- ACTIONS ------------------- \\
export const actions = {
  // LOGIN
  async login({ dispatch }, authData) {
    await auth.setPersistence('local');
    return auth.signInWithEmailAndPassword(authData.email, authData.password);
    //dispatch-storeUserOnClient in fireAuth
  },
  // LOGOUT
  async logout({ commit }) {
    await auth.signOut();
    //commit-clear_auth in fireAuth
  },
  // REGISTER
  async register({ dispatch }, authData) {
    const result = await auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
    const tokenResult = await auth.currentUser.getIdTokenResult();
    authData.id = result.user.uid;
    delete authData.password;
    dispatch('saveUserToDB', authData);
    dispatch('storeUserOnClient', { user: auth.currentUser, tokenResult });
  },
  //STORE USER
  async storeUserOnClient({ commit, dispatch }, data) {
    const claims = data.tokenResult.claims;
    const payload = {
      user: {
        uid: data.user.uid,
        email: data.user.email,
        role: claims.admin ? 'admin' : ''
      }
    };
    commit('SET_AUTH', payload);
    //dispatch('setColorTheme', payload.user);
  },
  //SET COLORS
  setColorTheme({ commit, app }, data) {
    //https://stackoverflow.com/questions/50243769/vuetify-how-to-set-background-color#50283479
    if (data.role == 'admin') {
      Vue.prototype.$nuxt.$vuetify.theme.dark = false;
    } else {
      Vue.prototype.$nuxt.$vuetify.theme.dark = true;
    }
  },
  // SET USER ROLE
  async setRole({ commit }, data) {
    const fn = functions.httpsCallable('setRole');
    const res = await fn({ email: data.email, role: data.role });
    console.log(res);
  },
  // GET USER FROM DB
  async getUserFromDB({ commit }, uid) {
    const userSnap = await db
      .collection('users')
      .doc(uid)
      .get();
    const dbUser = userSnap.data();
    //console.log('ACTION; getUserFromDB; , dbuser', dbUser);
    return dbUser;
  },
  // SAVE USER
  async saveUserToDB({ commit }, user) {
    const res = await db
      .collection('users')
      .doc(user.uid)
      .set(user);
  }
};
// ------------------- GETTERS ------------------- \\
export const getters = {
  isAuth(state) {
    return state.uid != null;
  },
  isAdmin(state) {
    return state.role == 'admin';
  },
  user(state) {
    return {
      uid: state.uid,
      email: state.email,
      role: state.role
    };
  }
};
