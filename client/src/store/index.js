import { createStore } from 'vuex'
import dialog from "./modules/dialog/index.js"
import date from "./modules/date/index.js"
import activities from "./modules/activities/index.js";

import axios from "axios";
import localForage from "localforage";

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
      localForage.setItem('refreshToken', token);
    },
  },
  actions: {
    async refreshToken({state}){
      // console.log(state.accessToken);
      const res = await axios.post("/api/token", {refreshToken: state.refreshToken});
        state.accessToken = res.data.accessToken;
        console.log(state.accessToken);
        return res.data.accessToken;
    },
    async sendRequest({dispatch},{url, method = 'get', data = {},}){
      const accessToken =  await dispatch('refreshToken');
      return axios({method, url, data, headers:{'Authorization': `bearer ${accessToken}`}});
    },
    async logout({state}){
      axios.delete("/api/logout", {refreshToken: state.refreshToken}).then(()=>{
        state.accessToken = null;
        state.refreshToken = null;
        localForage.setItem("refreshToken", null);

      })
    }
  },
  getters:{
    accessToken(state){
      return state.accessToken;
    },
  }
})
