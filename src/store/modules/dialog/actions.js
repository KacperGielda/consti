export default {
    deactivateActivity({state, dispatch}){ 
        state.isDialogShowedUp = false;
        dispatch('activities/deactivate', state.activityId, {root:true})
    }
}