import React from 'react';

import TrainerGlobalStore from './trainerContextes/TrainerGlobalStore';
import PlaceGlobalStore from './placeContextes/PlaceGlobalStore';
import SignUpAsContextProvider from './SignAsTypeContext';

const GlobalStore = ({children}) => {
    return(
        <SignUpAsContextProvider>
            <TrainerGlobalStore>
                <PlaceGlobalStore>
                    {children} 
                </PlaceGlobalStore>
            </TrainerGlobalStore> 
        </SignUpAsContextProvider>
    );
}

export default GlobalStore;