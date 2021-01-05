import React, {useReducer} from 'react';

import CalendarReducer from '../../reducers/trainerReducers/CalendarReducer';

export const CalendarContext = React.createContext();

const CalendarContextProvider = ({children}) => {
    const [calendar, dispatchCalendar] = useReducer(CalendarReducer, []);

    return(
        <CalendarContext.Provider value={{calendar, dispatchCalendar}}>
            {children}
        </CalendarContext.Provider>
    );
}

export default CalendarContextProvider;