export default {
    updateDisplayedDate(state, payload){
        const newDate = new Date(payload.year, payload.month, payload.day); 
        state.displayedDate = newDate;
        state.displayedDay = newDate.getDate();
        state.displayedMonth = newDate.getMonth();
        state.displayedYear = newDate.getYear();
    },
    selectDate(state, payload){
        state.selected = {month: payload.month, day: payload.day, year: payload.year};
    },
}