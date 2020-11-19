import React, {useReducer} from 'react';

import TrainingSiteReducer from '../../reducers/trainerReducers/TrainingSiteReducer';

export const TrainingSiteContext = React.createContext();

const TrainingSiteContextProvider = ({children}) => {
    const [trainingSite1, dispatchTrainingSite1] = useReducer(TrainingSiteReducer, "");
    const [trainingSite2, dispatchTrainingSite2] = useReducer(TrainingSiteReducer, "");

    return(
        <TrainingSiteContext.Provider value={{trainingSite1, trainingSite2, dispatchTrainingSite1, dispatchTrainingSite2}}>
            {children}
        </TrainingSiteContext.Provider>
    );
}

export default TrainingSiteContextProvider;