
const AboutThePlaceReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ABOUT_THE_PLACE':
            return action.aboutThePlace;
        
        default:
            return state;
    }
}

export default AboutThePlaceReducer;