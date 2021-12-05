import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PickCategories from '../../globalComponents/PickCategories';
import {CategoryContext} from '../../../context/trainerContextes/CategoryContext';
import ArrowBackButton from '../../globalComponents/ArrowBackButton';

const categoriesData = [
        { id: 1, label: 'STRENGTH' },
        { id: 2, label: 'KICKBOXING' },
        { id: 3, label: 'MARTIAL ARTS' },
        { id: 4, label: 'PILATES' },
        { id: 5, label: 'CLIMBING' },
        { id: 6, label: 'TRX' },
        { id: 7, label: 'DANCING' },
        { id: 8, label: 'SWIMMING' },
        { id: 9, label: 'RUNNING' },
        { id: 10, label: 'AEROBIC' },
        { id: 11, label: 'CYCLING' },
        { id: 12, label: 'FLEXIBILITY' },
        { id: 13, label: 'YOGA' },
        { id: 14, label: 'MUSCLE BUILDING' },
        { id: 15, label: 'BALANCE AND STABILITY' },
        { id: 16, label: 'ENDURANCE' },
        { id: 17, label: 'POWERLIFTING' },
        { id: 18, label: 'CROSSFIT' },
        { id: 19, label: 'HORSEBACK RIDING' }
];

const PickCategory = ({navigation}) => {
    const {categories, dispatchCategories} = useContext(CategoryContext);
    const [isError, setIsError] = useState(false); 
    const [errorMessage ,setErrorMessage] = useState("");

    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState(categoriesData);


    useEffect(() => {
        
    }, [])

    //Navigate user back to profile details page
    const handleArrowButton = () => {
        navigation.navigate('ProfileDetailsPage2Trainer');
    }

    const handleSubmit = () => {
        if (selectedItems.length == 0) {
            setIsError(true);
            setErrorMessage('Select at least one category');
        } else {
            dispatchCategories({
                type: 'SET_CATEGORIES',
                categories: selectedItems
            });
            navigation.navigate('ProfileDetailsPage2Trainer');
        }
    }


    //When the user chooses category it whill be displayed on the input bellow
    const handleOnItemPress = (item) => {
        if(selectedItems.includes(item.label)){
          let index = selectedItems.indexOf(item.label);
          selectedItems.splice(index, 1);
          setSelectedItems(selectedItems.filter(element => element !== item.label));
        }
        else{
          setIsError(false);
          setSelectedItems(selectedItems => [...selectedItems, item.label]);
        }
    }

    const handleOnInputChange = (text) => {
        if(text.length > 0){
            setItems(items.filter(item => item.label.toLowerCase().includes(text.toLowerCase())));
        }
        else{
            setItems(categoriesData);
        }
    }


 
  
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.justYouHeader}>Just You</Text>
            <Text style={styles.partnerText}>Partner</Text>
        </View>
        <ArrowBackButton
          onPress={handleArrowButton}
        />
        <Text style={styles.categoryTitle}>Choose your categories</Text>
        <View style={styles.searchContainer}>
            <View style={styles.serachRow}>
                <Image
                    source={require('../../../images/searchIcon.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search by category"
                    style={styles.textInputStyle}
                    onChangeText={(text) => handleOnInputChange(text)}
                />
            </View>
        </View>
        <View style={styles.categoryPickerContainer}>
            <View style={styles.categorySelect}>
                <PickCategories
                    data={items}
                    onItemPress={(item) => handleOnItemPress(item)}
                />
            </View>
        </View>
        {isError ?
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              : null}
        <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center'
    },
    justYouHeader: {
        fontSize: Dimensions.get('window').height * .033,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').height * .022
    },
    arrowImage: {
        marginLeft: Dimensions.get('window').width * .0483
    },
    categoryTitle: {
        fontSize: Dimensions.get('window').height * .0278,
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .022,
        fontWeight: 'bold'
    },
    searchContainer: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .06,
        alignSelf: 'center',
        marginTop: Dimensions.get('window').height * .018,
        justifyContent: 'center'
    },
    serachRow: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .06,
        alignItems: 'center'
    },
    searchIcon: {
        height: Dimensions.get('window').height * .03,
        width: Dimensions.get('window').width * .04,
        marginLeft: Dimensions.get('window').width * .0241,
    },
    textInputStyle: {
        marginLeft: Dimensions.get('window').width * .0362,
        fontSize: Dimensions.get('window').height * .022,
        justifyContent: 'center'
    },
    categoryPickerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    categorySelect: {
        width: Dimensions.get('window').width * .9,
        marginTop: Dimensions.get('window').height * .033
    },
    submitButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').height * .08,
        alignItems: 'center',
        marginBottom: 70
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
        marginLeft: Dimensions.get('window').width * .0483,
        color: 'red'
      },
});

export default PickCategory;