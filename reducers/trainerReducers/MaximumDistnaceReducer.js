
const MaximumDistanceReducer = (state, action) => {
    switch(action.type) {
        case 'SET_MAXIMUM_DISTANCE':
            return action.maximumDistnace;
        
        default:
            return state;
    }
}

export default MaximumDistanceReducer;