import React, {useReducer} from 'react';

import MediaReducer from '../../reducers/trainerReducers/MediaReducer';

export const MediaContext = React.createContext();

const MediaContextProvider = ({children}) => {
    const [profileImage, dispatchProfileImage] = useReducer(MediaReducer, require('../../images/profileImage.jpeg'));
    const [media, dispatchMedia] = useReducer(MediaReducer, []);

    return(
        <MediaContext.Provider value={{profileImage, media, dispatchProfileImage, dispatchMedia}}>
            {children}
        </MediaContext.Provider>
    );
}

export default MediaContextProvider;