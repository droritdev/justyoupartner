
const CalendarReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CALENDAR':
            return action.calendar;
            
        default:
            return state;
    }
}

export default CalendarReducer;