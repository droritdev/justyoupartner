import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import {Accordion, Block} from 'galio-framework';
import auth from '@react-native-firebase/auth';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import FastImage from 'react-native-fast-image';

import {MediaContext} from '../../../../context/trainerContextes/MediaContext';
import {NameContext} from '../../../../context/trainerContextes/NameContext';
import {BirthdayContext} from '../../../../context/trainerContextes/BirthdayContext';
import {ReviewsContext} from '../../../../context/trainerContextes/ReviewsContext';


//The question and answers page
const TrainerReviews = ({navigation}) => {

    const {firstName} = useContext(NameContext);
    const {lastName} = useContext(NameContext);
    const {birthday} = useContext(BirthdayContext);
    const {mediaPictures} = useContext(MediaContext);
    const {reviews} = useContext(ReviewsContext);

    const [age, setAge] = useState();
    const [starRating ,setStarRating] = useState();


    //Calculate trainer age
    const calculateTrainerAge = () => {
        let array = birthday.split('/');
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let todayDay = today.getDate();
        let age = year - (Number(array[2]));
        if(month < (Number(array[0]))){
            age--;
        }
        if((Number(array[0])) === month && todayDay < (Number(array[1]))){
            age--
        }
        setAge(age);
    }



    //Load trainer star rating
    const loadStarRating = () => {
        if (reviews.length === 0) {
            setStarRating(0);
        } else {
            var sumStars = 0;
            for (let index = 0; index < reviews.length; index++) {
                const singleReviewStar = reviews[index].stars;
                sumStars += Number(singleReviewStar);
            }
            setStarRating((sumStars/reviews.length).toFixed(1));
        }
    }


    useEffect (() => {
        //Hide bottom navigation UI
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        calculateTrainerAge();

        loadStarRating();

    }, []);

    //Navigates back to the profile page
    const handleArrowButton = () => {
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true
        })
        navigation.navigate('TrainerProfilePage');
    }


    const getTrainerReviews = () => {
        let repeats = [];
        if (reviews !== []) {
            for(let i = 0; i < reviews.length; i++) {
                var singleReview = reviews[i];
                repeats.push(
                    //row
                    <View style={styles.reviewRowContainer}> 
                        <FastImage
                            style={styles.reviewUserImage}
                            source={{
                                uri: singleReview.userImage,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <View style={styles.reviewTextContainer}>
                            <View style={{flexDirection:'row'}}>
                                
                                <Text style={styles.reviewTitle}> {singleReview.userFirstName + ' ' + singleReview.userLastName + ' - ' + singleReview.stars}  </Text>
                                <Image
                                source={require('../../../../images/starIconBlue.png')}
                                style={styles.starIconReview}
                                />
                            </View>

                            <View style={{flexDirection:'row', marginLeft:Dimensions.get('window').width * .012 }}> 
                                <Text style={{width: Dimensions.get('window').width * .65}}> 
                                    {singleReview.reviewContent}
                                </Text>
                            </View>

                              
                        </View>
                    </View>
                )
            }
        }
        return repeats;
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <ArrowBackButton
                onPress={handleArrowButton}
            />

            <View style={styles.imageAndDetailsContainer}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: mediaPictures[0],
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.nameRatingAgeContainer}>
                    <Text style={styles.nameText}>{firstName+" "+lastName}</Text>
                    <Text style={styles.personalTrainerText}>Personal Trainer</Text> 
                    <View style={styles.ratingAndAge}>
                        <Text style={styles.ratingText}>{starRating} </Text>
                        <Image
                            source={require('../../../../images/starIconBlue.png')}
                            style={styles.starIcon}
                        />
                        <Text style={styles.ageText}> - Age {age}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.pageTitle}> {'Customer Reviews (' +reviews.length+')'} </Text>


            <View style={styles.greyBorder}></View>
            <ScrollView style={styles.scrollViewContainer}>
                {getTrainerReviews()}
            </ScrollView>
        </SafeAreaView>
    )
}   

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        flex: 1
    },
    imageAndDetailsContainer: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .1227,
        marginLeft: Dimensions.get('window').width * .0483,
        marginTop: Dimensions.get('window').height * .02
    },
    profileImage: {
        height: Dimensions.get('window').width * .265,
        width: Dimensions.get('window').width * .265,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'grey'
    },
    nameRatingAgeContainer: {
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width * .0483,
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * .11
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .033
    },
    personalTrainerText: {
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022,
        color: 'deepskyblue'
    },
    ratingAndAge: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .022
    },
    ratingText: {
        fontSize: Dimensions.get('window').height * .02
    },
    starIcon: {
        marginTop: Dimensions.get('window').height * .001,
        height: Dimensions.get('window').height * .022,
        width: Dimensions.get('window').height * .022
    },
    starIconReview: {
        marginTop: Dimensions.get('window').height * .002,
        height: Dimensions.get('window').height * .022,
        width: Dimensions.get('window').height * .022
    },
    ageText: {
        fontSize: Dimensions.get('window').height * .02
    },
    pageTitle: {
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .06,
        fontSize: Dimensions.get('window').height * .03,
        fontWeight: '600',
    }, 
    scrollViewContainer: {
        marginTop: Dimensions.get('window').height * .01,
    },
    greyBorder: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        width: Dimensions.get('window').width * .7,
        borderTopWidth: 3,
        borderTopColor: 'lightgrey',
    },
    reviewRowContainer: {
        marginTop: Dimensions.get('window').height * .01,
        marginBottom: Dimensions.get('window').height * .03,
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewUserImage: {
        marginLeft: Dimensions.get('window').width * .050,
        backgroundColor: 'transparent',
        height: Dimensions.get('window').height * .075,
        width: Dimensions.get('window').height * .075,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3
    },
    reviewTextContainer: {
        marginLeft: Dimensions.get('window').width * .050,
        marginTop: Dimensions.get('window').height * .01,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    reviewTitleContainer: {
        flexDirection: 'row',
    },
    reviewTitle: {
        fontSize: Dimensions.get('window').height * .022,
        fontWeight: 'bold'
    },
    reviewText: {
        fontSize: Dimensions.get('window').height * .02,
        fontWeight: '300',
        width: Dimensions.get('window').width * .65,
    }

});

export default TrainerReviews;