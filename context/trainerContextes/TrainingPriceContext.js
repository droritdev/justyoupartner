import React, {useReducer} from 'react';

import TrainingPriceReducer from '../../reducers/trainerReducers/TrainingPriceReducer';

export const TrainingPriceContext = React.createContext();

const TrainingPriceContextProvider = ({children}) => {
    const [singlePriceAtTrainer, dispatchSingleAtTrainer] = useReducer(TrainingPriceReducer, "");
    const [singlePriceOutdoor, dispatchSingleOutdoor] = useReducer(TrainingPriceReducer, "");
    const [couplePriceAtTrainer, dispatchCoupleAtTrainer] = useReducer(TrainingPriceReducer, "");
    const [couplePriceOutdoor, dispatchCoupleOutdoor] = useReducer(TrainingPriceReducer, "");

    return(
        <TrainingPriceContext.Provider 
            value={{
                singlePriceAtTrainer, singlePriceOutdoor, couplePriceAtTrainer, couplePriceOutdoor, 
                dispatchSingleAtTrainer, dispatchSingleOutdoor, dispatchCoupleAtTrainer, dispatchCoupleOutdoor
            }}
        >
            {children}
        </TrainingPriceContext.Provider>
    );
}

export default TrainingPriceContextProvider;