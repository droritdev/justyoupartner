import React, { useContext, useEffect, useState } from 'react'
import {FlatList, StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {TrainingSiteContext} from '../../../context/trainerContextes/TrainingSiteContext';

import ArrowBackButton from '../../globalComponents/ArrowBackButton';
import MapView, { Marker }  from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';



var API_KEY = 'AIzaSyAKKYEMdjG_Xc6ZuvyzxHBi1raltggDA2c'; // TODO: move api key to .env
Geocoder.init(API_KEY); // use a valid API key


//Here The trainer user writes about him
const AddressTrainer = ({navigation, route}) => {
    const type = route.params.type;
    const {dispatchTrainingSite1} = useContext(TrainingSiteContext);
    const {dispatchTrainingSite2} = useContext(TrainingSiteContext);
    const {dispatchCoordinates1} = useContext(TrainingSiteContext);
    const {dispatchCoordinates2} = useContext(TrainingSiteContext);

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latitudeDelta, setLatitudeDelta] = useState(0);
    const [longitudeDelta, setLongitudeDelta] = useState(0);
    const [listData, setListData] = useState({});
    const [inputText, setInputText] = useState("");
    const [locationTitle, setLocationTitle] = useState("");
    const [locationCoordinates, setLocationCoordinates] = useState([]);
    const [isSubmitOn, setIsSubmitOn] = useState("none");
    const [markerLocation, setMarkerLocation] = useState({latitude: 0, longitude: 0});


    var splitLocationTitle = [];

    //Navigates back to the ProfileDetailsPage1Trainer
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }


    //Search location based on input text
    const searchLocation = async (text) => {
        setInputText(text);
        setIsSubmitOn('none');

        if(text === "") {
            setListData({});
            showUserCurrentLocation();
        } else {
            axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${text}`,
            })
            .then((response) => {
                setListData(response.data.predictions);
            })
            .catch((e) => {
                console.log(e.response);
            });
        }
    };




    //Display pressed item and and navigate to location
    const handleItemPressed = (text) => {
        setListData({});
        setInputText(text);
        
        // Search by address
        Geocoder.from(text)
        .then(json => {
            var location = json.results[0].geometry.location;
            setZoomedLocation(location.lat, location.lng);
            setMarkerLocation({latitude: location.lat, longitude: location.lng});
            setLocationTitle(text);
            setLocationCoordinates([location.lat, location.lng]);
            setIsSubmitOn('flex');
        })
        .catch(error => console.warn(error));
    }

    //Set location on the map according to lat and lang
    const setZoomedLocation = (lat, lang) => {
        setLatitude(lat);
        setLatitudeDelta(0.02);
        setLongitude(lang);
        setLongitudeDelta(0.02);
    }




    //Get user current location and display it
    const showUserCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setZoomedLocation(info.coords.latitude, info.coords.longitude);
            Geocoder.from(info.coords.latitude, info.coords.longitude)
            .then(json => {
                var address = json.results[0].formatted_address;
                setLocationTitle(address);
                setLocationCoordinates([info.coords.latitude, info.coords.longitude]);
                setIsSubmitOn('flex');   
		    })
		.catch(error => console.warn(error));

        });
    }




    //Save user address and coordinates to dispatch
    const handleSubmit = () => {
        if (locationTitle !== "") {
            if (type === 1) {
                dispatchTrainingSite1({
                    type: 'SET_TRAINING_SITE_1',
                    trainingSite1: locationTitle
                });

                dispatchCoordinates1({
                    type: 'SET_COORDINATES_1',
                    coordinates1: locationCoordinates
                });

                navigation.navigate('ProfileDetailsPage2Trainer');
            } else if (type === 2) {
                dispatchTrainingSite2({
                    type: 'SET_TRAINING_SITE_2',
                    trainingSite2: locationTitle
                });

                dispatchCoordinates2({
                    type: 'SET_COORDINATES_2',
                    coordinates2: locationCoordinates
                });

                navigation.navigate('ProfileDetailsPage2Trainer');
            }
        }
    }


    //Show user current location when map is first loaded
    if (latitude === 0 && longitude === 0) {
        showUserCurrentLocation();
    }

    return (   
        <SafeAreaView style={{flex: 1}}   >  
            <MapView    
                style={styles.mapContainer}
                region=
                {
                    {   
                        latitude: latitude,  
                        longitude: longitude,    
                        latitudeDelta: latitudeDelta,       
                        longitudeDelta: longitudeDelta      
                    }
                }    
                animated ={true}
                zoomEnabled={true}
                loadingEnabled={true}
                showsUserLocation={true}   
            >
                <Marker
                    coordinate={markerLocation}
                    title={locationTitle}
                    pinColor = {'red'}
                />   
            </MapView>

            <View style={styles.arrowBackContainer}>
                <ArrowBackButton
                    onPress={handleArrowButton}
                />
            </View>

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Image
                        source={require('../../../images/locationIcon.png')}
                        style={styles.locationIcon}
                    />
                    <TextInput
                        style={styles.textStyle}
                        placeholder={'Search your address'}
                        placeholderTextColor={'grey'}
                        onChangeText={(text)=>searchLocation(text)}
                        value={inputText}
                    />                 
                </View>
                <FlatList
                    data={listData}
                    renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => handleItemPressed(item.description)}
                        >
                        <Text  style={styles.itemText}>{item.description}</Text>
                        </TouchableOpacity>
                    );
                    }}
                    keyExtractor={(item) => item.key}
                    style={styles.searchResultsContainer}  
                />
            </View> 
            <View display={isSubmitOn} style={styles.sumbitContainer}>
                <Text style={styles.locationTitle}> {locationTitle.indexOf(',') >= 0 ? locationTitle.slice(0, locationTitle.indexOf(',')) : locationTitle} </Text> 
                <Text style={styles.locationTitle}> {locationTitle.indexOf(',') >= 0 ? locationTitle.slice(locationTitle.indexOf(',')+1) : ""}</Text> 
               
                <TouchableOpacity
                    style={styles.submitButtonContainer}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}> Submit</Text>
                </TouchableOpacity>
            </View> 
        </SafeAreaView> 
        );  
}


const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        zIndex: -1
    },
    arrowBackContainer: {
        position: 'absolute',
        top: Dimensions.get('window').height * .05, 
        width: '100%', 
        zIndex: 1
    },
    searchBarContainer: {
        position: 'absolute',
        top: Dimensions.get('window').height * .01, 
        width: '100%' 
    },
    searchBar: {
        flexDirection: 'row',
        paddingLeft: Dimensions.get('window').width * .01,
        borderRadius: 17,
        marginTop: Dimensions.get('window').height * .1,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        color: 'black',
        backgroundColor: 'white',
        opacity: 0.8,
        height: Dimensions.get('window').height * .05,
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      },
    textStyle: {
        flex: 1,
        paddingLeft: Dimensions.get('window').width * .03,
        marginTop: Dimensions.get('window').height * .01,
        fontSize: Dimensions.get('window').height * .02,
    },
    searchResultsContainer: {
        width: Dimensions.get('window').width * 0.85,
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.8,
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    resultItem: {
        height: Dimensions.get('window').height * 0.05,
    },
    itemText: {
        fontSize: Dimensions.get('window').height * .02,
    },
    sumbitContainer: {
        position: 'absolute',
        height: Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width * 0.75,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 17,
        bottom: 0,
        marginBottom: Dimensions.get('window').height * 0.05,
        zIndex: 1,
        opacity: 0.8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    locationTitle: {
        marginTop: Dimensions.get('window').height * 0.01,
        fontSize: Dimensions.get('window').height * .02,
        alignSelf: 'center'
    },
    submitButtonContainer: {
        marginTop: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').width * .3,
        height: Dimensions.get('window').height * .045,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 15
    },
    submitButtonText: {
        fontSize: Dimensions.get('window').height * 0.030,
        fontWeight: 'bold',
        color: 'white'
    },
    locationIcon: {
        marginLeft: Dimensions.get('window').width * 0.02,
        marginTop: Dimensions.get('window').height * 0.01,
        width: Dimensions.get('window').width * .07,
        height: Dimensions.get('window').height * .035,
        resizeMode: 'stretch',
    },
});

export default AddressTrainer;