
const MediaReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PROFILE_IMAGE':
            return action.imageSource;
            
        case 'ADD_IMAGE': 
            return {
                ...state, media: action.image
            }

        // case 'ADD_VIDEO':
        //     return action.lastName;
            
        default:
            return state;
    }
}

export default MediaReducer;