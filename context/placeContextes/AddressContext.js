import React, {useReducer} from 'react';

import AddressReducer from '../../reducers/placeReducers/AddressReducer';

export const AddressContext = React.createContext();

const AddressContextProvider = ({children}) => {
    const [address, dispatchAddress] = useReducer(AddressReducer, "");

    return(
        <AddressContext.Provider value={{address, dispatchAddress}}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressContextProvider;