import React, {useReducer} from 'react';

import TrainingSiteReducer from '../../reducers/trainerReducers/TrainingSiteReducer';

export const TrainingSiteContext = React.createContext();

const TrainingSiteContextProvider = ({children}) => {
    const [trainingSite1, dispatchTrainingSite1] = useReducer(TrainingSiteReducer, "");
    const [trainingSite2, dispatchTrainingSite2] = useReducer(TrainingSiteReducer, "");
    const [coordinates1, dispatchCoordinates1] = useReducer(TrainingSiteReducer, []);
    const [coordinates2, dispatchCoordinates2] = useReducer(TrainingSiteReducer, []);

    return(
        <TrainingSiteContext.Provider value={{trainingSite1, trainingSite2, coordinates1, coordinates2, dispatchTrainingSite1, dispatchTrainingSite2, dispatchCoordinates1, dispatchCoordinates2}}>
            {children}
        </TrainingSiteContext.Provider>
    );
}

export default TrainingSiteContextProvider;