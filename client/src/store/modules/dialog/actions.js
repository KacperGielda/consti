export default {
    dialogYes({state, dispatch, commit}){ 
        commit('hideDialog');
        dispatch('activities/delActivity',state.activityId, {root: true});
    }
}