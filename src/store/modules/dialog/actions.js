export default {
    dialogYes({state}){ 
        state.isDialogShowedUp = false;
        state.callback();
    }
}