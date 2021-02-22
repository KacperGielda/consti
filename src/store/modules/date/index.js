import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            selected: {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                day: new Date().getDate(),
              },
              today: new Date(),    
              displayedDate: new Date(),
        };
    },
    mutations,
    actions,
    getters,
};
