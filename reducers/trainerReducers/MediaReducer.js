
const MediaReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PROFILE_IMAGE':
            return action.profileImage;

        case 'SET_MEDIA_PICTURES':
            return action.mediaPictures;
    
        case 'SET_MEDIA_VIDEOS':
            return action.mediaVideos;
                       
        default:
            return state;
    }
}

export default MediaReducer;