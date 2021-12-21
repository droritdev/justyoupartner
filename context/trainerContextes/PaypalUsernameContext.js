import React, {useReducer} from 'react';

import PaypalUsernameReducer from '../../reducers/trainerReducers/PaypalUsernameReducer';

export const PaypalUsernameContext = React.createContext();

const PaypalUsernameContextProvider = ({children}) => {
    const [paypalUsername, dispatchPaypalUsername] = useReducer(PaypalUsernameReducer, "");

    return(
        <PaypalUsernameContext.Provider value={{paypalUsername, dispatchPaypalUsername}}>
            {children}
        </PaypalUsernameContext.Provider>
    );
}

export default PaypalUsernameContextProvider;