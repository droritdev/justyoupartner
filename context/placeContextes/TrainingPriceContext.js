import React, {useReducer} from 'react';

import TrainingPriceReducer from '../../reducers/placeReducers/TrainingPriceReducer';

export const TrainingPriceContext = React.createContext();

const TrainingPriceContextProvider = ({children}) => {
    const [singlePrice, dispatchSingle] = useReducer(TrainingPriceReducer, "");
    const [couplePrice, dispatchCouple] = useReducer(TrainingPriceReducer, "");

    return(
        <TrainingPriceContext.Provider 
            value={{
                singlePrice, couplePrice,
                dispatchSingle, dispatchCouple
            }}
        >
            {children}
        </TrainingPriceContext.Provider>
    );
}

export default TrainingPriceContextProvider;