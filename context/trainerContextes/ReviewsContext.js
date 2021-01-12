import React, {useReducer} from 'react';

import ReviewsReducer from '../../reducers/trainerReducers/ReviewsReducer';

export const ReviewsContext = React.createContext();

const ReviewsContextProvider = ({children}) => {
    const [reviews, dispatchReviews] = useReducer(ReviewsReducer, []);
    return(
        <ReviewsContext.Provider value={{reviews, dispatchReviews}}>
            {children}
        </ReviewsContext.Provider>
    );
}

export default ReviewsContextProvider;