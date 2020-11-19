
const TrainingSiteReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ADDRESS':
            return action.address;
            
        default:
            return state;
    }
}

export default TrainingSiteReducer;