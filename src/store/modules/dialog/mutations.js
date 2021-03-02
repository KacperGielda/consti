export default {
    displayDialog(state, options){
        state.isDialogShowedUp = true;
        state.msg = options.msg;
        state.title = options.title;
        state.type = options.type ? options.type : 'default';
        if(options.activity) state.activityId = options.activity;
        if(options.callback) state.callback = options.callback;
        console.log(state.type);
    },
    hideDialog(state){
        state.isDialogShowedUp = false;
    },
}