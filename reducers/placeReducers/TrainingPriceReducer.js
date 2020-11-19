
const TrainingPriceReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SINGLE_AT_TRAINER':
            return action.singleAtTrainer;

        case 'SET_SINGLE_OUTDOOR':
            return action.singleOutdoor;

        case 'SET_COUPLE_AT_TRAINER':
            return action.coupleAtTrainer;

        case 'SET_COUPLE_OUTDOOR':
            return action.coupleOutdoor; 
            
        default:
            return state;
    }
}

export default TrainingPriceReducer;