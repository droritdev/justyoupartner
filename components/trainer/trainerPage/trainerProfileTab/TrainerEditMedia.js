import React, {useRef, useContext, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import Video from 'react-native-video';

import {MediaContext} from '../../../../context/trainerContextes/MediaContext';

import {IdContext} from '../../../../context/trainerContextes/IdContext';

import AppButton from '../../../globalComponents/AppButton';
import ArrowBackButton from '../../../globalComponents/ArrowBackButton';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

//Here the traniner add photos and videos to his profile
const TrainerEditMedia = ({navigation}) => {
    const {trainerID, dispatchTrainerID} = useContext(IdContext);
    const {profileImage, dispatchProfileImage} = useContext(MediaContext);
    const {mediaPictures, dispatchMediaPictures} = useContext(MediaContext);
    const {mediaVideos, dispatchMediaVideos} = useContext(MediaContext);
    const [pictures, setPictures] = useState(mediaPictures);
    const [videos, setVideos] = useState(mediaVideos);
    const [isPencilPressed, setIsPencilPressed] = useState(false);
    const [visible, setVisible] = useState(false);
    const [upload, setUpload] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [isError, setIsError] = useState(false); 
    const [errorMessage ,setErrorMessage] = useState("");

    const [picOrigin, setPicOrigin] = useState([]);
    const [vidOrigin, setVidOrigin] = useState([]);
  
    var picturesURL = [];
    var videosURL = [];
    var checkFinishInterval;

    const scrollRef = useRef();

    const config = {
        withCredentials: true,
        baseURL: 'http://10.0.2.2:3000/',
        headers: {
          "Content-Type": "application/json",
        },
    };


    //Scroll the user UI to specific position
    const scrollTo = () => {
      scrollRef.current?.scrollTo({
          y: 0,
          animated: true
      });
    }

    

    //Check if the picture came from storage or from the deviece
    useEffect(() => {
        let tempPicOrigin = [...picOrigin];
        let tempVidOrigin = [...vidOrigin];

        for (let index = 0; index < pictures.length; index++) {
            const picSource = pictures[index]+"";
            if(picSource.includes("file://")) {
                tempPicOrigin[index] = "offline";
            } else {
                tempPicOrigin[index] = "online";
            }       
        }

        for (let index = 0; index < videos.length; index++) {
            const vidSource = videos[index]+"";
            if(vidSource.includes("file://")) {
                tempVidOrigin[index] = "offline";
            } else {
                tempVidOrigin[index] = "online";
            }       
        }

        setPicOrigin(tempPicOrigin);
        setVidOrigin(tempVidOrigin);
    }, [pictures, videos])



    //Navigates back to the profile details page
    const handleArrowButton = () => {
        navigation.navigate('TrainerEditProfile');
    }

    //Set pencil on/off
    const handleAPencilButton = () => {
        isPencilPressed ? setIsPencilPressed(false) : setIsPencilPressed(true);
    }


    //Upload all info to Firebase and MongoDB
    const handleSubmit = () => {
        if (pictures[0] === undefined) {
            scrollTo();
            setIsError(true);
            setErrorMessage('Please choose a profile picture');
        } else {
            if (pictures.length < mediaPictures.length) {
                removeImagesFromFirebase();
            }

            if (videos.length < mediaVideos.length) {
                removeVideosFromFirebase();
            }

            setUpload(true);
            //start interval to check if upload is done
            checkFinishInterval = setInterval(() => checkFinishFirebaseUpload(), 1000);
            //start uploading images
            uploadImages();
            //start uploading videos
            uploadVideos();

        }
    }



    //Delete images from firebase
    const removeImagesFromFirebase = async () => {
        const userRef = "/trainers/" + auth().currentUser.uid + "/";

        for (let index = pictures.length; index < mediaPictures.length; index++) {
            let ref = storage().ref(userRef+"images/trainerImage"+index+".jpg");

            await ref.delete().then((snapshot) => {
                
            })
            .catch((e) => console.log("Failed to remove image from Firebase"));
        }
    }




    //Delete videos from firebase
    const removeVideosFromFirebase = async () => {
        const userRef = "/trainers/" + auth().currentUser.uid + "/";

        for (let index = videos.length; index < mediaVideos.length; index++) {
            let ref = storage().ref(userRef+"videos/trainerVideo"+index+".MP4");

            await ref.delete().then((snapshot) => {
                
            })
            .catch((e) => console.log("Failed to remove video from Firebase"));
        }
    }




    //Upload all trainer images to Firebase
    const uploadImages = async () => {
        const userRef = "/trainers/" + auth().currentUser.uid + "/";

        for (let index = 0; index < pictures.length; index++) {
            const source = pictures[index];

            if(picOrigin[index] === "offline") {
                let ref = storage().ref(userRef+"images/trainerImage"+index+".jpg");
                await ref.putFile(source).then((snapshot) => {
                })
                .catch((e) => console.log("fail to upload image to firebase"));

                await ref.getDownloadURL().then((url) => {
                    picturesURL[index] = url;
                })
                .catch((e) => console.log("fail to download image url"));
            } else {
                picturesURL[index] = source;
            }
        }
    }



    //Upload all trainer videos to Firebase
    const uploadVideos = async () => {
        const userRef = "/trainers/" + auth().currentUser.uid + "/";

        for (let index = 0; index < videos.length; index++) {
            const source = videos[index];

            if(vidOrigin[index] === "offline") { 
                let ref = storage().ref(userRef+"videos/trainerVideo"+index+".MP4");
                await ref.putFile(source).then((snapshot) => {
                    ref.getDownloadURL().then((url) => {
                        videosURL[index] = url;
                    })
                    .catch((e) => console.log("fail to download video url"));
                })
                .catch((e) => console.log("fail to upload video to firebase"));
            } else {
                videosURL[index] = source;
            }
        }
    }


    //Check if the upload to Firebase is finished
    const checkFinishFirebaseUpload = () => {
        if (pictures.length === picturesURL.length && videos.length === videosURL.length) {
            clearInterval(checkFinishInterval);
            uploadToMongo();
        }
    }


    //Upload images and videos URL to mongoDB
    const uploadToMongo = () => {
        axios  
        .post('/trainers/updateMedia', {
            _id: trainerID,
            media: {
                images: picturesURL,
                videos: videosURL
            }
        },
        config
        )
        .then((res) => {
          if (res.data.type === "success") {
            setUpload(false);
            
            dispatchMediaPictures({
                type: 'SET_MEDIA_PICTURES',
                mediaPictures: picturesURL
            });


            dispatchMediaVideos({
                type: 'SET_MEDIA_VIDEOS',
                mediaVideos: videosURL
            });

            navigation.navigate('TrainerEditProfile');
          }
        })
        .catch((err) => console.log(err));
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
        for(let i = 0; i < pictures.length; i++) {
            if (picOrigin[i] === "online") {
                repeats.push(
                    <View key={"onlinePhoto"+i} style={styles.rowPicturesContainer}>
                        <TouchableOpacity
                            onPress={() => isPencilPressed ? handlePencilPressed("pic", i) : handleImage(i)}
                            style={styles.shadowContainer}
                        >
                            <FastImage
                                style={isPencilPressed ? styles.deletePicture : styles.picture}
                                source={{
                                uri: pictures[i],
                                priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                repeats.push(
                    <View key={"offlinePhoto"+i} style={styles.rowPicturesContainer}>
                        <TouchableOpacity
                        onPress={() => isPencilPressed ? handlePencilPressed("pic", i) : handleImage(i)}
                        style={styles.shadowContainer}
                        >
                        <Image
                            source={{uri: pictures[i]}}
                            style={isPencilPressed ? styles.deletePicture : styles.picture}
                            key={i}
                        />
                    </TouchableOpacity>
                    </View>
                )
                }
        }


        repeats.push(
            <View  key={"addPhoto"} style={styles.rowPicturesContainer}>
                <TouchableOpacity
                onPress={() => isPencilPressed ? null : handleImage(pictures.length)}
                >
                <Image
                    source={require('../../../../images/plusIcon.png')}
                    style={styles.plusPicture}
                    key={pictures.length}
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
            if (vidOrigin[i] === "online") {
                repeats.push(
                    <View key={"onlineVid"+i} style={styles.rowPicturesContainer}>
                        <TouchableOpacity
                            onPress={() => isPencilPressed ? handlePencilPressed("vid", i) : handleVideo(i)}
                            style={styles.shadowContainer}
                        >
                            <Video 
                                muted={true}
                                resizeMode="cover"  
                                controls={videos[i]=== undefined?  false : !isPencilPressed}
                                source={{uri: videos[i]}}
                                style={isPencilPressed ? styles.deletePicture : styles.video}
                                key={i}
                            />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                repeats.push(
                    <View key={"offlineVid"+i} style={styles.rowPicturesContainer}>
                        <TouchableOpacity
                            onPress={() => isPencilPressed ? handlePencilPressed("vid", i) : handleVideo(i)}
                            style={styles.shadowContainer}
                        >
                            <Video 
                                resizeMode="cover"  
                                controls={videos[i]=== undefined?  false : !isPencilPressed}
                                source={{uri: videos[i]}}
                                style={isPencilPressed ? styles.deletePicture : styles.video}
                                key={i}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        }

        repeats.push(
            <View key={"addVideo"} style={styles.rowPicturesContainer}>
                <TouchableOpacity
                onPress={() => isPencilPressed ? null : handleVideo(videos.length)}
                >
                <Image
                    source={require('../../../../images/plusIcon.png')}
                    style={styles.plusPicture}
                    key={pictures.length}
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

            <View>
                <Dialog.Container visible={upload}>
                    <Dialog.Title>Updating your media</Dialog.Title>
                    <Dialog.Description>Please wait..</Dialog.Description>
                </Dialog.Container>
            </View>

            <View style={styles.headerContainer}>
            <ArrowBackButton
                onPress={handleArrowButton}
            />
                <Text style={styles.mediaTitle}>Edit Media</Text>
                <TouchableOpacity
                    onPress={handleAPencilButton}
                >
                    <Image
                        source={require('../../../../images/pencil.png')}
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

export default TrainerEditMedia;