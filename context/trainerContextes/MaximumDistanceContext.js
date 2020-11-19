import React, {useReducer} from 'react';

import MaximumDistanceReducer from '../../reducers/trainerReducers/MaximumDistnaceReducer';

export const MaximumDistanceContext = React.createContext();

const MaximumDistanceContextProvider = ({children}) => {
    const [maximumDistnace, dispatchMaximumDistance] = useReducer(MaximumDistanceReducer, 1);

    return(
        <MaximumDistanceContext.Provider value={{maximumDistnace, dispatchMaximumDistance}}>
            {children}
        </MaximumDistanceContext.Provider>
    );
}

export default MaximumDistanceContextProvider;