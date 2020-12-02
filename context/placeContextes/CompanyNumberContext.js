import React, {useReducer} from 'react';

import CompanyNumberReducer from '../../reducers/placeReducers/CompanyNumberReducer';

export const CompanyNumberContext = React.createContext();

const CompanyNumberContextProvider = ({children}) => {
    const [companyNumber, dispatchCompanyNumber] = useReducer(CompanyNumberReducer, "");

    return(
        <CompanyNumberContext.Provider value={{companyNumber, dispatchCompanyNumber}}>
            {children}
        </CompanyNumberContext.Provider>
    );
}

export default CompanyNumberContextProvider;