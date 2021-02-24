let months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

export default{
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
    displayedDateText(_, getters){
        return `${months[getters.displayedMonth]} ${getters.displayedYear}`;
    },
    selectedDateText(state){
        return `${state.selected.day} ${months[state.selected.month]} ${state.selected.year}`;
    },
    selectedDateWeekDay(state){
        let weekDay = new Date(state.selected.year, state.selected.month, state.selected.day).getDay();
        if (weekDay === 0) weekDay = 6;
        else weekDay--;
        return weekDay;
    }
};
