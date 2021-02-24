import { createStore } from 'vuex'
import dialog from "./modules/dialog/index.js"
import date from "./modules/date/index.js"
import activities from "./modules/activities/index.js";

export default createStore({
  modules:{
    dialog,
    date,
    activities,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
