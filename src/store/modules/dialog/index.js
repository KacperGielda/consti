import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            isDialogShowedUp: false,
            title: "",
            msg: "",
            type: "default",
            activityId: null,
            callback: null,
        };
    },
    mutations,
    actions,
    getters,
};
