import React, {useReducer} from 'react';

import CategoryReducer from '../../reducers/trainerReducers/CategoryReducer';

export const CategoryContext = React.createContext();

const CategoryContextProvider = ({children}) => {
    const [categories, dispatchCategories] = useReducer(CategoryReducer, []);

    return(
        <CategoryContext.Provider value={{categories, dispatchCategories}}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContextProvider;