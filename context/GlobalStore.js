import React from 'react';

import TrainerGlobalStore from './trainerContextes/TrainerGlobalStore';
import PlaceGlobalStore from './placeContextes/PlaceGlobalStore';
import SignUpAsContextProvider from './SignAsTypeContext';
import OrderContextProvider from './orderContexts/OrderContext';

const GlobalStore = ({children}) => {
    return(
        <SignUpAsContextProvider>
            <TrainerGlobalStore>
                <PlaceGlobalStore>
                    <OrderContextProvider>
                    {children} 
                    </OrderContextProvider>
                </PlaceGlobalStore>
            </TrainerGlobalStore> 
        </SignUpAsContextProvider>
    );
}

export default GlobalStore;