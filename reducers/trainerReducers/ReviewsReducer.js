
const ReviewsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_REVIEWS':
            return action.reviews;
            
        default:
            return state;
    }
}

export default ReviewsReducer;