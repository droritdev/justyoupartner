import React from 'react';

import IdContextProvider from './IdContext';
import EmailContextProvider from './EmailContext';
import CountryContextProvider from './CountryContext';
import PasswordContextProvider from './PasswordContext';
import NameContextProvider from './NameContext';
import PhoneContextProvider from './PhoneContext';
import MediaContextProvider from './MediaContext';
import BirthdayContextProvider from './BirthdayContext';
import CategoryContextProvider from './CategoryContext';
import AboutMeContextProvider from './AboutMeContext';
import CertificationsContextProvider from './CertificationsContext';
import MaximumDistanceContextProvider from './MaximumDistanceContext';
import TrainingSiteContextProvider from './TrainingSiteContext';
import TrainingPriceContextProvider from './TrainingPriceContext';
import CalendarContextProvider from './CalendarContext';
import ReviewsContextProvider from './ReviewsContext';
import PaypalUsernameContextProvider from './PaypalUsernameContext';


const TrainerGlobalStore = ({children}) => {

    return(
        <IdContextProvider>
            <EmailContextProvider>
                <CountryContextProvider>
                    <PasswordContextProvider>
                        <NameContextProvider>
                            <BirthdayContextProvider>
                                <CategoryContextProvider>
                                    <AboutMeContextProvider>
                                        <CertificationsContextProvider>
                                            <MaximumDistanceContextProvider>
                                                <TrainingSiteContextProvider>
                                                    <TrainingPriceContextProvider>
                                                        <MediaContextProvider>
                                                            <PhoneContextProvider>
                                                                <CalendarContextProvider>
                                                                    <ReviewsContextProvider>
                                                                        <PaypalUsernameContextProvider>
                                                                {children}  
                                                                        </PaypalUsernameContextProvider>
                                                                    </ReviewsContextProvider>
                                                                </CalendarContextProvider>
                                                            </PhoneContextProvider>
                                                        </MediaContextProvider>
                                                    </TrainingPriceContextProvider>
                                                </TrainingSiteContextProvider>
                                            </MaximumDistanceContextProvider>
                                        </CertificationsContextProvider>
                                    </AboutMeContextProvider>
                                </CategoryContextProvider>
                            </BirthdayContextProvider>
                        </NameContextProvider>
                    </PasswordContextProvider>
                </CountryContextProvider>
            </EmailContextProvider>
        </IdContextProvider>
    );
}

export default TrainerGlobalStore;