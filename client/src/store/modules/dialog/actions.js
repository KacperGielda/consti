export default {
    dialogYesDel({state, dispatch, commit}){ 
        commit('hideDialog');
        dispatch('activities/delActivity',state.activityId, {root: true});
    },
    dialogYesDeactivate({state, dispatch, commit}){ 
        console.log("sdsdsf");
        commit('hideDialog');
        dispatch('activities/deactivate',state.activityId, {root: true});
    }
}