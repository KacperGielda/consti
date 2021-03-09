import { createStore } from 'vuex'
import dialog from "./modules/dialog/index.js"
import date from "./modules/date/index.js"
import activities from "./modules/activities/index.js";

import axios from "axios";

export default createStore({
  modules:{
    dialog,
    date,
    activities,
  },
  state() {
    return{
        login: null,
        accessToken: null,
        refreshToken: null,
        lastModified: null,
    }
  },
  mutations: {
    setAccessToken(state, token){
      state.accessToken = token;
    },
    setRefreshToken(state, token){
      state.refreshToken = token;
    },
  },
  actions: {
    refreshToken({state}){
      console.log(state.accessToken);
      axios.post("/api/token", {
        refreshToken: state.refreshToken
      }).then(res => {
        state.accessToken = res.data.accessToken;
        console.log(state.accessToken);
      });
    }
  },
  getters:{
    accessToken(state){
      return state.accessToken;
    },
  }
})
