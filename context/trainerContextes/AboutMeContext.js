import React, {useReducer} from 'react';

import AboutMeReducer from '../../reducers/trainerReducers/AboutMeReducer';

export const AboutMeContext = React.createContext();

const AboutMeContextProvider = ({children}) => {
    const [aboutMe, dispatchAboutMe] = useReducer(AboutMeReducer, "ABOUT ME");

    return(
        <AboutMeContext.Provider value={{aboutMe, dispatchAboutMe}}>
            {children}
        </AboutMeContext.Provider>
    );
}

export default AboutMeContextProvider;