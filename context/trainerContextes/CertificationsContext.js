import React, {useReducer} from 'react';

import CertificationsReducer from '../../reducers/trainerReducers/CertificationsReducer';

export const CertificationsContext = React.createContext();

const CertificationsContextProvider = ({children}) => {
    const [certifications, dispatchCertifications] = useReducer(CertificationsReducer, "Write your certifications...");

    return(
        <CertificationsContext.Provider value={{certifications, dispatchCertifications}}>
            {children}
        </CertificationsContext.Provider>
    );
}

export default CertificationsContextProvider;