import React, {useReducer} from 'react';

import MediaReducer from '../../reducers/trainerReducers/MediaReducer';

export const MediaContext = React.createContext();

const MediaContextProvider = ({children}) => {
    const [profileImage, dispatchProfileImage] = useReducer(MediaReducer, require('../../images/profileImage.jpeg'));
    const [mediaPictures, dispatchMediaPictures] = useReducer(MediaReducer, []);
    const [mediaVideos, dispatchMediaVideos] = useReducer(MediaReducer, []);

    return(
        <MediaContext.Provider value={{profileImage, mediaPictures, mediaVideos, dispatchProfileImage, dispatchMediaPictures, dispatchMediaVideos}}>
            {children}
        </MediaContext.Provider>
    );
}

export default MediaContextProvider;

