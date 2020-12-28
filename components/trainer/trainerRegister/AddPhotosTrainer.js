import React, {useRef, useContext, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import {MediaContext} from '../../../context/trainerContextes/MediaContext';
import Video from 'react-native-video';

import AppButton from '../../globalComponents/AppButton';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';


//Here the traniner add photos and videos to his profile
const AddPhotosTrainer = ({navigation}) => {
    const {profileImage, dispatchProfileImage} = useContext(MediaContext);
    const {mediaPictures, dispatchMediaPictures} = useContext(MediaContext);
    const {mediaVideos, dispatchMediaVideos} = useContext(MediaContext);
    const [pictures, setPictures] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isPencilPressed, setIsPencilPressed] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [numOfElements, setNumOfElements] = useState(8);
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
        if (pictures[0] === undefined) {
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


    const uploadTest = async (uri, i) => {
      await storage().ref("/alot/test"+i).putFile(uri).then((snapshot) => {
          console.log(snapsoht);
        })
        .catch((e) => alert("fail"));
    }

    // for (let i = 0; i < pictures; i++) {
    //     uploadTest(pictures[i].uri, i);
    // }


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
            picturesTemp[index] = source;
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
            videosTemp[index] = source;
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
        for(let i = 0; i < numOfElements; i+=2) {
            repeats.push(
                <View style={styles.rowPicturesContainer}>
                    <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("pic", i) : handleImage(i)}
                    >
                        <Image
                            source={pictures[i]}
                            style={isPencilPressed ? styles.deletePicture : styles.picture}
                            key={i}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("pic", i+1) : handleImage(i+1)}
                    >
                        <Image
                            source={pictures[i+1]}
                            style={isPencilPressed ? styles.deletePicture : styles.picture}
                            key={i+1}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        return repeats;
    }

    //Sets the view to rows and cols for the videos 
    const getVideoPattern = () => {
        let repeats = [];
        for(let i = 0; i < numOfElements; i+=2) {
            repeats.push(
                <View style={styles.rowPicturesContainer}>
                    <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("vid", i) : handleVideo(i)}
                    >
                        <Video 
                            resizeMode="cover"  
                            controls={videos[i]=== undefined?  false : !isPencilPressed}
                            source={videos[i]}
                            style={isPencilPressed ? styles.deletePicture : styles.video}
                            key={i}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("vid", i+1) : handleVideo(i+1)}
                    >
                        <Video
                            resizeMode="cover"  
                            controls={videos[i+1]=== undefined? false : !isPencilPressed}
                            source={videos[i+1]}
                            fullscreen={true}
                            style={isPencilPressed ? styles.deletePicture : styles.video}
                            key={i+1}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
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



            <ScrollView ref={scrollRef} style={styles.mainScrollContainer} >
                <ScrollView ref={scrollRef} style={styles.photoScrollContainer}>
                    <View style={styles.picturesListContainer}>
                        <Text style={styles.photoTitle}>Photos</Text>
                        <Text style={styles.profilePictureText}>Profile Picture</Text>
                        {getImagePattern()}
                    </View>
                </ScrollView>
                <ScrollView  ref={scrollRef} style={styles.videoScrollContainer}>
                    <View style={styles.videosListContainer}>
                        <Text style={styles.videoTitle}>Videos</Text>
                        {getVideoPattern()}
                    </View>
                </ScrollView>
            </ScrollView>

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
        marginTop: Dimensions.get('window').height * .008,
        marginBottom: Dimensions.get('window').height * .03,
        alignSelf: 'center',
        color: "deepskyblue"
    },
    photoScrollContainer: {
        marginTop: Dimensions.get('window').height * .02,
    },
    picturesListContainer: {
        marginTop: Dimensions.get('window').height * .040,
        
    },
    videoScrollContainer: {
        marginTop: Dimensions.get('window').height * .040,
    },
    videosListContainer: {
    
    },
    videoTitle: {
        fontSize: Dimensions.get('window').height * .030,
        fontWeight: 'bold',
        marginBottom: Dimensions.get('window').height * .03,
        alignSelf: 'center',
        color: "deepskyblue"
    },
    profilePictureText: {
        marginLeft: Dimensions.get('window').width * .050,
        marginBottom: Dimensions.get('window').height * .005
    },
    rowPicturesContainer: {
        marginLeft: Dimensions.get('window').width * .050,
        marginRight: Dimensions.get('window').width * .050,
        marginBottom: Dimensions.get('window').height * .015,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picture: {
        borderRadius: 3,
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        backgroundColor: 'lightgrey'
    },
    video: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        backgroundColor: 'lightgrey'
    },
    deletePicture: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .43,
        backgroundColor: 'lightgrey',
        borderColor: 'deepskyblue',
        borderWidth: 3
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
        marginTop: Dimensions.get('window').height * .066,
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