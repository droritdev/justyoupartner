import React, {useReducer} from 'react';

import CompanyNameReducer from '../../reducers/placeReducers/CompanyNameReducer';

export const CompanyNameContext = React.createContext();

const CompanyNameContextProvider = ({children}) => {
    const [companyName, dispatchName] = useReducer(CompanyNameReducer, "");

    return(
        <CompanyNameContext.Provider value={{companyName, dispatchName}}>
            {children}
        </CompanyNameContext.Provider>
    );
}

export default CompanyNameContextProvider;