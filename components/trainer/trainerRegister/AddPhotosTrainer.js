import React, {useRef, useContext, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import {MediaContext} from '../../../context/trainerContextes/MediaContext';
import Video from 'react-native-video';

import AppButton from '../../globalComponents/AppButton';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';


//Here the traniner add photos and videos to his profile
const AddPhotosTrainer = ({route, navigation}) => {
    const {profileImage, dispatchProfileImage} = useContext(MediaContext);
    const {mediaPictures, dispatchMediaPictures} = useContext(MediaContext);
    const {mediaVideos, dispatchMediaVideos} = useContext(MediaContext);
    const [pictures, setPictures] = useState(mediaPictures);
    const [videos, setVideos] = useState(mediaVideos);
    const [isPencilPressed, setIsPencilPressed] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [isError, setIsError] = useState(false); 
    const [errorMessage ,setErrorMessage] = useState("");
  
    const scrollRef = useRef();

    //Scroll the user UI to specific position
    const scrollTo = () => {
      scrollRef.current?.scrollTo({
          y: 0,
          animated: true
      });
    }



    //Navigates back to the profile details page
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }

    const handleAPencilButton = () => {
        isPencilPressed ? setIsPencilPressed(false) : setIsPencilPressed(true);
    }

    const handleSubmit = () => {
        if (route.params) {
            dispatchProfileImage({
                type: 'SET_PROFILE_IMAGE',
                profileImage: route.params.photoUri
              });
            dispatchMediaPictures({
                type: 'SET_MEDIA_PICTURES',
                mediaPictures: [...pictures, route.params.photoUri]
            });
            dispatchMediaVideos({
                type: 'SET_MEDIA_VIDEOS',
                mediaVideos: videos
            });
            navigation.navigate('ProfileDetailsPage2Trainer');
        } else if (pictures[0] === undefined) {
            scrollTo();
            setIsError(true);
            setErrorMessage('Please choose a profile picture');
        } else {
            dispatchProfileImage({
                type: 'SET_PROFILE_IMAGE',
                profileImage: pictures[0]
              });
            dispatchMediaPictures({
                type: 'SET_MEDIA_PICTURES',
                mediaPictures: pictures
            });
            dispatchMediaVideos({
                type: 'SET_MEDIA_VIDEOS',
                mediaVideos: videos
            });
            navigation.navigate('ProfileDetailsPage2Trainer');
        }
    }



    //Show image picker with crop and set image to the cropped image
    const handleImage = (index) => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            mediaType: 'photo',
            cropping: true
          }).then(image => {
            const source = {uri: "file://"+image.path};
            let picturesTemp = [...pictures];
            picturesTemp[index] = source.uri;
            picturesTemp = bubbleSort(picturesTemp);
            setPictures(picturesTemp);
            setIsError(false);
        }).catch(err => {
            //user cancel the picker
        });
    }

    //Sort image/video oreder 
    const bubbleSort = (array) => {
        // Iterate Over Array From First Element
        for (let i = 0; i < array.length; i++) {
          // Iterate Over Array From Succeeding Element
          for (let j = 1; j < array.length; j++) {
            // Check If First Element Is Greater Proceeding Element
            if (array[j - 1] === undefined) {
              // Swap Numbers
              swapNumbers(array, j - 1, j);
            }
          }
        }
        return array;
    }

    const swapNumbers = (array, i, j) => {
        // Save Element Value (Because It Will Change When We Swap/Reassign)
        let temp = array[i];
        // Assign Element2 To Element1
        array[i] = array[j];
        // Assign Element1 To Element2
        array[j] = temp;
      };
      


    //Show video picker and set video to the chosen video
    const handleVideo = (index) => {
        ImagePicker.openPicker({
            mediaType: "video",
          }).then((video) => {
            const source = {uri: video.sourceURL};
            let videosTemp = [...videos];
            videosTemp[index] = source.uri;
            videosTemp = bubbleSort(videosTemp);
            setVideos(videosTemp);
        }).catch(err => {
            //user cancel the picker
        });
    }


     
    //Press cancel in the dialog
    const handleCancel = () => {
        setVisible(false);
    };

    
    //Delete the selected picture/video
    const handleDelete = () => {
        switch (selectedType) {
            case "pic":
                pictures.splice(selectedItem, 1);
            break;
            case "vid": 
                videos.splice(selectedItem, 1);
            break;
        }
        setVisible(false);
    };
    

    //Views the dialog
    const handlePencilPressed = (type, index) => {
        switch (type) {
            case "pic":
               if (pictures[index] !== undefined) {
                setSelectedType(type);
                setSelectedItem(index);
                setVisible(true);
               }
            break;
            case "vid": 
            if (videos[index] !== undefined) {
                setSelectedType(type);
                setSelectedItem(index);
                setVisible(true);
               }
            break;
        }
    }



    //Sets the view to rows and cols for the images
    const getImagePattern = () => {
        let repeats = [];
        if(route.params){
            console.log('route.params.photoUri ', route.params.photoUri)
            repeats.push(
                <View key={"cameraImage"} style={styles.rowPicturesContainer}>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={styles.shadowContainer}
                        >
                        <Image
                            source={{uri: route.params.photoUri}}
                            style={isPencilPressed ? styles.deletePicture : styles.picture}
                            key={'camerImage'}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        for(let i = 0; i < pictures.length; i++) {
            repeats.push(
                <View key={"image"+i} style={styles.rowPicturesContainer}>
                    <TouchableOpacity
                    onPress={() => isPencilPressed ? handlePencilPressed("pic", i) : handleImage(i)}
                    style={styles.shadowContainer}
                    >
                    <Image
                        source={{uri: pictures[i]}}
                        style={isPencilPressed ? styles.deletePicture : styles.picture}
                        key={'image'+i}
                    />
                </TouchableOpacity>
                </View>
            ) 
        }
        repeats.push(
            <View key={"addImage"} style={styles.rowPicturesContainer}>
                <TouchableOpacity
                onPress={() => isPencilPressed ? null : handleImage(pictures.length)}
                >
                <Image
                    source={require('../../../images/cameraIcon.png')}
                    style={styles.plusPicture}
                    key={'addImage'}
                />
            </TouchableOpacity>
            </View>
        )
        return repeats;
    }

    //Sets the view to rows and cols for the videos 
    const getVideoPattern = () => {
        let repeats = [];
        for(let i = 0; i < videos.length; i++) {
            repeats.push(
                <View key={"video"+i} style={styles.rowPicturesContainer}>
                    <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("vid", i) : handleVideo(i)}
                        style={styles.shadowContainer}
                    >
                        <Video 
                            muted = {true}
                            resizeMode="cover"  
                            controls={videos[i]=== undefined?  false : !isPencilPressed}
                            source={{uri: videos[i]}}
                            style={isPencilPressed ? styles.deletePicture : styles.video}
                            key={'video'+i}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        repeats.push(
            <View key={"addVideo"} style={styles.rowPicturesContainer}>
                <TouchableOpacity
                onPress={() => isPencilPressed ? null : handleVideo(videos.length)}
                >
                <Image
                    source={require('../../../images/videoIcon.png')}
                    style={styles.plusPicture}
                    key={'addVideo'}
                />
            </TouchableOpacity>
            </View>
        )
        return repeats;
    }

    
    return(
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Delete this media?</Dialog.Title>
                    <Dialog.Button label="No" onPress={handleCancel} />
                    <Dialog.Button label="Delete" onPress={handleDelete} />
                </Dialog.Container>
            </View>


            <View style={styles.headerContainer}>
            <ArrowBackButton
                onPress={handleArrowButton}
            />
                <Text style={styles.mediaTitle}>Media</Text>
                <TouchableOpacity
                    onPress={handleAPencilButton}
                >
                    <Image
                        source={require('../../../images/pencil.png')}
                        style={styles.pencilImage}
                    />
                </TouchableOpacity>
            </View>



            
            <Text style={styles.photoTitle}>Photos</Text>
                <ScrollView style={styles.photoScrollContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    >
                    {getImagePattern()}
                </ScrollView>

                <Text style={styles.videoTitle}>Videos</Text>

                <ScrollView style={styles.videoScrollContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    >
                    {getVideoPattern()}
                </ScrollView>

            <View>
                <TouchableOpacity
                    style={{backgroundColor: 'deepskyblue', borderRadius: 10, padding: 10, alignSelf: 'center'}}
                    onPress={() => navigation.navigate('Camera')}
                >
                    <Text style={{color: 'white', fontSize: 20}}>Take a photo</Text>
                </TouchableOpacity>
            </View>    

            <View style={styles.submitButtonContainer}>
            {isError ?
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              : null}
            <AppButton 
                title="Submit"
                onPress={handleSubmit}
              />
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    mainContainer: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerContainer: {
        marginTop: Dimensions.get('window').height * .01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .95
    },  
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .015
    },
    mediaTitle: {
        fontSize: Dimensions.get('window').height * .035,
        fontWeight: 'bold',
        marginTop: Dimensions.get('window').height * .002,
        alignSelf: 'center',
    },
    pencilImage: {
        marginTop: Dimensions.get('window').height * .015,
        height: Dimensions.get('window').height * .035,
        width: Dimensions.get('window').width * .07,
    },
    mainScrollContainer: {
        height: Dimensions.get('window').height * .9,
    },
    photoContainer: {
        marginTop: Dimensions.get('window').height * .01,
        alignSelf: 'center',
        width: Dimensions.get('window').width * .95
    },
    photoTitle: {
        fontSize: Dimensions.get('window').height * .030,
        fontWeight: 'bold',
        marginTop: Dimensions.get('window').height * .08,
        marginBottom: Dimensions.get('window').height * .03,
        alignSelf: 'center',
        color: "deepskyblue"
    },
    photoScrollContainer: {
        height: Dimensions.get('window').height * .0005,
    },
    picturesListContainer: {
        marginTop: Dimensions.get('window').height * .040,
        
    },
    videoScrollContainer: {
        height: Dimensions.get('window').height * .0005,
        marginTop: Dimensions.get('window').height * .03,
    },
    videosListContainer: {
    
    },
    videoTitle: {
        marginTop: Dimensions.get('window').height * .08,
        fontSize: Dimensions.get('window').height * .030,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: "deepskyblue"
    },
    profilePictureText: {
        marginLeft: Dimensions.get('window').width * .050,
        marginBottom: Dimensions.get('window').height * .005
    },
    rowPicturesContainer: {
        height: Dimensions.get('window').height * .15,
        marginLeft: Dimensions.get('window').width * .050,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shadowContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'visible'
    },
    picture: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,    
    },
    plusPicture: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        borderRadius: 16,
        backgroundColor: 'whitesmoke',
        resizeMode: 'stretch'
    },
    deletePicture: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        backgroundColor: 'lightgrey',
        borderColor: 'deepskyblue',
        borderWidth: 3
    },
    video: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,    
    },
    footerContainer:{
    },
    footerImagesContainer: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    plusImage: {
        marginTop: Dimensions.get('window').height * .020,
    },
    submitButtonContainer: {
        flex: 1,
        marginTop: Dimensions.get('window').height * .05,
        alignItems: 'center'
      },
    submitButton: {
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .065,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'deepskyblue',
        borderRadius: 20
      },
      submitButtonText: {
        fontSize: Dimensions.get('window').height * .0278,
        fontWeight: 'bold',
        color: 'white'
      },
      errorMessage: {
        marginBottom: Dimensions.get('window').height * .015,
        alignSelf: 'center',
        color: 'red'
    },
      
});

export default AddPhotosTrainer;