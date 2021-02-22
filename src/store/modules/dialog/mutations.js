export default {
    displayDialog(state, options){
        state.isDialogShowedUp = true;
        state.msg = options.msg;
        state.title = options.title;
    },
    hideDialog(state){
        state.isDialogShowedUp = false;
    }
}