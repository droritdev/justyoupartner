import React, {useReducer} from 'react';

import AboutThePlaceReducer from '../../reducers/placeReducers/AboutThePlaceReducer';

export const AboutThePlaceContext = React.createContext();

const AboutThePlaceContextProvider = ({children}) => {
    const [aboutThePlace, dispatchAboutThePlace] = useReducer(AboutThePlaceReducer, "ABOUT THE PLACE");

    return(
        <AboutThePlaceContext.Provider value={{aboutThePlace, dispatchAboutThePlace}}>
            {children}
        </AboutThePlaceContext.Provider>
    );
}

export default AboutThePlaceContextProvider;