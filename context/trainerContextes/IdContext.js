import React, {useReducer} from 'react';

import IdReducer from '../../reducers/trainerReducers/IdReducer';

export const IdContext = React.createContext();

const IdContextProvider = ({children}) => {
    const [trainerID, dispatchTrainerID] = useReducer(IdReducer, "");

    return(
        <IdContext.Provider value={{trainerID, dispatchTrainerID}}>
            {children}
        </IdContext.Provider>
    );
}

export default IdContextProvider;