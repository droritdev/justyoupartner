
const TrainingPriceReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SINGLE_PRICE':
            return action.singlePrice;

        case 'SET_COUPLE_PRICE':
            return action.couplePrice; 
            
        default:
            return state;
    }
}

export default TrainingPriceReducer;