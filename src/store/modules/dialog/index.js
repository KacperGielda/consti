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
        };
    },
    mutations,
    actions,
    getters,
};
