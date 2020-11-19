import React, {useReducer} from 'react';

import ProfileImageReducer from '../../reducers/placeReducers/ProfileImageReducer';

export const ProfileImageContext = React.createContext();

const ProfileImageContextProvider = ({children}) => {
    const [imageSource, dispatch] = useReducer(ProfileImageReducer, "");

    return(
        <ProfileImageContext.Provider value={{imageSource, dispatch}}>
            {children}
        </ProfileImageContext.Provider>
    );
}

export default ProfileImageContextProvider;