import React, {useReducer} from 'react';

import SignUpAsReducer from '../reducers/SignUpAsReducer';

export const SignUpAsContext = React.createContext();

const SignUpAsContextProvider = ({children}) => {
    const [signAsType, dispatchSignAsType] = useReducer(SignUpAsReducer, "");

    return(
        <SignUpAsContext.Provider value={{signAsType, dispatchSignAsType}}>
            {children}
        </SignUpAsContext.Provider>
    );
}

export default SignUpAsContextProvider;