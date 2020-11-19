import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";

import {MediaContext} from '../../../context/trainerContextes/MediaContext';

//Here the traniner add photos and videos to his profile
const AddPhotosTrainer = ({navigation}) => {
    const {profileImage, dispatchProfileImage} = useContext(MediaContext);
    const {media, dispatchMedia} = useContext(MediaContext);
    const [pictures, setPictures] = useState([]);
    const [isPencilPressed, setIsPencilPressed] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [numOfElements, setNumOfElements] = useState(8);

    //Navigates back to the profile details page
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }

    const handleAPencilButton = () => {
        isPencilPressed ? setIsPencilPressed(false) : setIsPencilPressed(true);
    }

    //Select image from the phone
    const handleImage = (index) => {
        const options = {
          title: 'Select photo'
        };
  
        ImagePicker.showImagePicker(options, (res) => {
          if(res.didCancel){
          }
          else if(res.error){
          }
          else{
            const source = {uri: res.uri};
            if(typeof media[index] !== 'undefined') {
                let picturesTemp = [...pictures];
                picturesTemp[index] = source;
                setPictures(picturesTemp);
            }
            else{
                setPictures((prevState) => [...prevState, source]);
            }
          }
        })
    }
     
    //Press cancel in the dialog
    const handleCancel = () => {
        setVisible(false);
    };
    
    //Delete the selected picture
    const handleDelete = () => {
        pictures.splice(selectedImage, 1)
        setVisible(false);
    };
    
    //Views the dialog
    const handlePencilPressed = (num) => {
        if(typeof pictures[num] !== 'undefined') {
            setSelectedImage(num);
            setVisible(true);
        }
    }

    //Adds 2 more images to pick 
    const handlePlusButton = () => {
        if(numOfElements === pictures.length){
            setNumOfElements(numOfElements + 2);
        }
    }

    //Sets the view to rows and cols
    let repeats = [];
    for(let i = 0; i < numOfElements; i+=2){
        repeats.push(
            <View style={styles.rowPicturesContainer}>
                <TouchableOpacity
                    onPress={() => isPencilPressed ? handlePencilPressed(i) : handleImage(i)}
                >
                    <Image
                        source={pictures[i]}
                        style={isPencilPressed ? styles.deletePicture : styles.picture}
                        key={i}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => isPencilPressed ? handlePencilPressed(i+1) : handleImage(i+1)}
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
    
    return(
        <View style={styles.mainContainer}>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>Delete this picture?</Dialog.Description>
                    <Dialog.Button label="No" onPress={handleCancel} />
                    <Dialog.Button label="Delete" onPress={handleDelete} />
                </Dialog.Container>
            </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={handleArrowButton}
                >
                    <Image
                        source={require('../../../images/arrowBack.png')}
                        style={styles.arrowImage}
                    />
                </TouchableOpacity>
                <Text style={styles.PhotosTitle}>Photos</Text>
                <TouchableOpacity
                    onPress={handleAPencilButton}
                >
                    <Image
                        source={require('../../../images/pencil.png')}
                        style={styles.pencilImage}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.picturesListContainer}>
                    <Text style={styles.profilePictureText}>Profile Picture</Text>
                    {repeats}
                </View>
            </ScrollView>
            <View style={styles.footerContainer}> 
                <View style={styles.footerImagesContainer}>
                    <TouchableOpacity
                        onPress={handlePlusButton}
                    >
                        <Image
                            source={require('../../../images/plus.png')}
                            style={styles.plusImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    mainContainer: {
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerContainer: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .95
    },  
    arrowImage: {
        marginLeft: 10
    },
    PhotosTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 8,
        alignSelf: 'center'
    },
    pencilImage: {
        marginTop: 15,
        height: Dimensions.get('window').height * .035,
        width: Dimensions.get('window').width * .07,
    },
    scrollViewContainer: {
    },
    picturesListContainer: {
        marginTop: 30,
        height: Dimensions.get('window').height * .7
        
    },
    profilePictureText: {
        marginLeft: 20,
        marginBottom: 5
    },
    rowPicturesContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picture: {
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
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        marginTop: 40

    },
    footerImagesContainer: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    plusImage: {
        marginBottom: 20
    },
});

export default AddPhotosTrainer;