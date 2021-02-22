export default {
    selected(state) {
        return state.selected;
    },
    today(state) {
        return state.today;
    },
    displayedDate(state) {
        return state.displayedDate;
    },
    displayedYear(state) {
        return state.displayedDate.getFullYear();
    },
    displayedMonth(state) {
        return state.displayedDate.getMonth();
    },
    displayedDay(state) {
        return state.displayedDate.getDate();
    },
};
