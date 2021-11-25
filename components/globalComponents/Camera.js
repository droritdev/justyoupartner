import React, { useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { BottomNavigation } from 'react-native-paper'

const Camera = ({navigation}) => {
    const [takingPic, setTakingPic] = useState(false)
    const [img, setImg] = useState(null)
    let cameraRef = useRef(null)

    const onPicture = ({uri}) => {
        setImg(uri)
    }

    const onBackToCamera = () => {
        setImg(null)
    }

    const takePicture = async () => {
        if (cameraRef && !takingPic) {

            let options = {
              quality: 0.85,
              fixOrientation: true,
              forceUpOrientation: true,
            }
      
            setTakingPic(true)
      
            try {
               const data = await cameraRef.current.takePictureAsync(options)
               Alert.alert('Success', JSON.stringify(data))
               navigation.navigate('AddPhotosTrainer', {
                   photoUri: data.uri
               })
            } catch (err) {
              Alert.alert('Error', 'Failed to take picture: ' + (err.message || err))
              return
            } finally {
              setTakingPic(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            <RNCamera 
                ref={cameraRef}
                captureAudio={false}
                style={{flex: 1}}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <TouchableOpacity
                style={{backgroundColor: 'deepskyblue', padding: 10, alignItems: 'center'}}
                onPress={takePicture}
            >
                <Text style={{color: 'white', fontSize: 18}}>Click here to take a photo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Camera

