
const TrainingSiteReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TRAINING_SITE_1':
            return action.trainingSite1;

        case 'SET_TRAINING_SITE_2':
            return action.trainingSite2;


        case 'SET_COORDINATES_1':
            return action.coordinates1;


        case 'SET_COORDINATES_2':
            return action.coordinates2;
            
        default:
            return state;
    }
}

export default TrainingSiteReducer;