import { createStore } from "vuex";
import dialog from "./modules/dialog/index.js";
import date from "./modules/date/index.js";
import activities from "./modules/activities/index.js";

import axios from "axios";
import localForage from "localforage";
import router from "../router/index.js";

export default createStore({
  modules: {
    dialog,
    date,
    activities,
  },
  state() {
    return {
      login: null,
      accessToken: null,
      refreshToken: null,
      lastModified: null,
      dataProvider: null,
    };
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
      localForage.setItem("refreshToken", token);
    },
  },
  actions: {
    async refreshToken({ state }) {
      const res = await axios.post("/api/token", {
        refreshToken: state.refreshToken,
      });
      state.accessToken = res.data.accessToken;
      return res.data.accessToken;
    },
    async sendRequest({ dispatch }, { url, method = "get", data = {} }) {
      const accessToken = await dispatch("refreshToken");
      return axios({
        method,
        url,
        baseURL: '/',
        data,
        headers: {
          Authorization: `bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });
    },
    logout({ state, dispatch }) {
      state.dataProvider = "local";
      axios
        .delete("/api/logout", { refreshToken: state.refreshToken })
        .then(async () => {
          state.accessToken = null;
          state.refreshToken = null;
          localForage.clear().then(() => {
            dispatch("activities/fetchData", { root: true }).then(() => {
              router.push("/");
            });
          });
        });
    },
    async setDataProvider({ state, dispatch }) {
      const isConnected = window.navigator.onLine;
      const refreshToken = await localForage.getItem("refreshToken");

      if (!isConnected || !refreshToken) return (state.dataProvider = "local");

      const localLastMod = await localForage.getItem("lastModified");
      const serverLastMod = await dispatch('sendRequest',{
        url: "api/lastmodified",
      });

      if (!serverLastMod) return (state.dataProvider = "local");
      if (localLastMod > serverLastMod) {
        state.dataProvider = "local";
      } else state.dataProvider = "server";

    },
    signIn({state, commit, dispatch},{login,password}){
     axios.post('api/login',{
        login,
        password,
      } ).then(async(res) => {
        const {refreshToken, accessToken} = res.data;
        commit('setRefreshToken', refreshToken);
        state.accessToken = accessToken;
        state.dataProvider = 'server';
        dispatch('activities/fetchData');
        router.replace('/activities');
      })
      .catch(()=>{
        commit('dialog/displayDialog', {title: "Bład", msg:"Błędne dane logowania", type:'default'}, {root:true});
      });
    }
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    dataProvider(state) {
      return state.dataProvider;
    },
    canSendRequest(state){
      return (window.navigator.onLine && state.refreshToken);
    }
  },
});
