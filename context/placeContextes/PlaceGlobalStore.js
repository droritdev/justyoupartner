import React from 'react';

import EmailContextProvider from './EmailContext';
import CountryContextProvider from './CountryContext';
import PasswordContextProvider from './PasswordContext';
import CompanyNameContextProvider from './CompanyNameContext';
import PhoneContextProvider from './PhoneContext';
import AboutThePlaceContextProvider from './AboutThePlaceContext';
import MediaContextProvider from './MediaContext';
import ProfileImageContextProvider from './ProfileImageContext';
import AddressContextProvider from './AddressContext';
import TrainingPriceContextProvider from './TrainingPriceContext';
import CategoryContextProvider from './CategoryContext';

const PlaceGlobalStore = ({children}) => {

    return(
        <EmailContextProvider>
            <CountryContextProvider>
                <PasswordContextProvider>
                    <CompanyNameContextProvider>
                        <AddressContextProvider>
                            <CategoryContextProvider>
                                <TrainingPriceContextProvider>
                                    <AboutThePlaceContextProvider>
                                        <MediaContextProvider>
                                            <ProfileImageContextProvider>
                                                <PhoneContextProvider>
                                                    {children}  
                                                </PhoneContextProvider>
                                            </ProfileImageContextProvider>
                                        </MediaContextProvider>
                                    </AboutThePlaceContextProvider>
                                </TrainingPriceContextProvider>
                            </CategoryContextProvider>
                        </AddressContextProvider>
                    </CompanyNameContextProvider>
                </PasswordContextProvider>
            </CountryContextProvider>
        </EmailContextProvider>
    );
}

export default PlaceGlobalStore;