
const MediaReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PROFILE_IMAGE':
            return action.imageSource;
            
        case 'ADD_IMAGE': 
            return {
                ...state, media: action.image
            }
            
        default:
            return state;
    }
}

export default MediaReducer;