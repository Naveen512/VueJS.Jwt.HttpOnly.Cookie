import axios from "axios";
import jwtInterceptor from '../../shared/jwt.interceptor'

const state = () => ({
  loginApiStatus: "",
  userProfile: {
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
  },
  logOut: false
});

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus;
  },
  getUserProfile(state) {
    return state.userProfile;
  },
  getLogout(state) {
    return state.logOut;
  }
};

const actions = {
  async loginApi({ commit }, payload) {
    const response = await axios
      .post("http://localhost:3000/auth/login", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      localStorage.setItem("isAuthenticated", "true");
      commit("setLoginApiStatus", "success");
    } else {
      commit("setLoginApiStatus", "failed");
    }
  },

  async userProfile({ commit }) {
    const response = await jwtInterceptor
      .get("http://localhost:3000/user-profile", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setUserProfile", response.data);
    }
  },

  async userLogout({ commit }) {
    const response = await axios
      .get("http://localhost:3000/logout", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLogout", true);
      localStorage.removeItem("isAuthenticated");
    } else {
      commit("setLogout", false);
    }
  },
};

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  },

  setUserProfile(state, data) {
    const userProfile = {
      id: data.id,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
    };
    state.userProfile = userProfile;
  },

  setLogout(state, payload) {
    state.logOut = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
