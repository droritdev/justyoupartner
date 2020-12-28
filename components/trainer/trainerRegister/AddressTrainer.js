import React, { useContext, useEffect, useState } from 'react'
import {FlatList, StyleSheet, View, Text, Image, TextInput, Dimensions, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {TrainingSite} from '../../../context/trainerContextes/TrainingSiteContext';

import AppButton from '../../globalComponents/AppButton';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';
import MapView, { Marker }  from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

//Here The trainer user writes about him
const AddressTrainer = ({navigation}) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latitudeDelta, setLatitudeDelta] = useState(0);
    const [longitudeDelta, setLongitudeDelta] = useState(0);
    const [listData, setListData] = useState({});
    const [inputText, setInputText] = useState("");
    const [locationTitle, setLocationTitle] = useState("");
    const [isSubmitOn, setIsSubmitOn] = useState("none");


    //Navigates back to the ProfileDetailsPage1Trainer
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }


    //Search location based on input text
    const searchLocation = async (text) => {
        setInputText(text);
        setIsSubmitOn('none');
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
            setLocationTitle(text);
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
        });
    }



    const handleSubmit = () => {

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
                    coordinate={{ latitude : latitude , longitude : longitude }}
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
                <TextInput
                    style={styles.searchBar}
                    placeholder={'Search your address'}
                    placeholderTextColor={'grey'}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text)=>searchLocation(text)}
                    value={inputText}
                />
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
                    keyExtractor={(item) => item.id}
                    style={styles.searchResultsContainer}  
                />
            </View> 
            <View display={isSubmitOn} style={styles.sumbitContainer}>
                <Text style={styles.locationTitle}> {locationTitle.slice(0, locationTitle.indexOf(','))} </Text> 
                <Text style={styles.locationTitle}> {locationTitle.slice(locationTitle.indexOf(',')+1)}</Text> 
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
        borderRadius: 17,
        marginTop: Dimensions.get('window').height * .1,
        marginLeft: Dimensions.get('window').width * .02,
        marginRight: Dimensions.get('window').width * .02,
        color: 'black',
        borderColor: 'deepskyblue',
        backgroundColor: 'white',
        opacity: 0.8,
        borderWidth: 1,
        height: Dimensions.get('window').height * .05,
        fontSize: Dimensions.get('window').height * .02,
      },
      placeholderStyle: {
        alignSelf: 'center',
    },
    searchResultsContainer: {
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.8,
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
        width: Dimensions.get('window').width * 0.55,
        backgroundColor: 'white',
        opacity: 0.8,
        alignSelf: 'center',
        borderRadius: 17,
        bottom: 0,
        marginBottom: Dimensions.get('window').height * 0.05,
        zIndex: 1
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
    }
});

export default AddressTrainer;