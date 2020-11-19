
const AboutMeReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ABOUT_ME':
            return action.aboutMe;
        
        default:
            return state;
    }
}

export default AboutMeReducer;