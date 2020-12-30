
const IdReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TRAINER_ID':
            return action.trainerID;
        
        default:
            return state;
    }
}

export default IdReducer;