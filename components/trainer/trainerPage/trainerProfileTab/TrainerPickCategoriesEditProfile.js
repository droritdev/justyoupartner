import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PickCategories from '../../../globalComponents/PickCategories';
import {CategoryContext} from '../../../../context/trainerContextes/CategoryContext';

const categoriesData = [
    { id: 1, label: 'HIT' },
    { id: 2, label: 'KIK BOX' },
    { id: 3, label: 'MARTIAL ARTS' },
    { id: 4, label: 'PILATIS' },
    { id: 5, label: 'CLIMBING' },
    { id: 6, label: 'TRX' },
    { id: 7, label: 'DANCING' },
    { id: 8, label: 'SWIMMING' },
    { id: 9, label: 'RUNNING' }
];

const TrainerPickCategoriesEditProfile = ({navigation}) => {
    const {categories, dispatchCategories} = useContext(CategoryContext);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState(categoriesData);

    const [isCategoryError, setIsCategoryError] = useState(false);
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("Pick at least 1 category")

    // useEffect(() => {
    //     for(let i = 0; i < categories.length; i++){
    //         let item = categoriesData.filter((category) => category.label === categories[i]);
    //         alert("hey");
    //         setSelectedCategories(selectedCategories => [...selectedCategories, item]);
    //     }
    // },[]);

    const handleArrowButton = () => {
        if(selectedItems.length > 0){
            dispatchCategories({
                type: 'SET_CATEGORIES',
                categories: selectedItems
            });
            navigation.navigate('TrainerEditProfile');
        }
        else{
            setIsCategoryError(true);
        }
    }

    //When the user chooses category it whill be displayed on the input bellow
    const handleOnItemPress = (item) => {
        setIsCategoryError(false);
        if(selectedItems.includes(item.label)){
          let index = selectedItems.indexOf(item.label);
          selectedItems.splice(index, 1);
          setSelectedItems(selectedItems.filter(element => element !== item.label));
        }
        else{
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
        <TouchableOpacity
            onPress={handleArrowButton}
        >
            <Image
              source={require('../../../../images/arrowBack.png')}
              style={styles.arrowImage}
            />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>Choose your categories</Text>
        <View style={styles.categoryAndErrorContainer}>
            <View style={styles.searchContainer}>
                <View style={styles.serachRow}>
                    <Image
                        source={require('../../../../images/searchIcon.png')}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        placeholder="Search category"
                        style={styles.textInputStyle}
                        onChangeText={(text) => handleOnInputChange(text)}
                    />
                </View>
            </View>
            {isCategoryError ? 
                <Text style={styles.categoryErrorMessage}>{categoryErrorMessage}</Text>
            : null}
        </View>
        <View style={styles.categoryPickerContainer}>
            <View style={styles.categorySelect}>
                <PickCategories
                    value={selectedCategories}
                    data={items}
                    onItemPress={(item) => handleOnItemPress(item)}
                />
            </View>
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
        fontSize: 30,
        fontWeight: 'bold'
    },
    partnerText: {
        color: 'deepskyblue',
        fontWeight: 'bold',
        fontSize: 20
    },
    arrowImage: {
        marginLeft: 20
    },
    categoryTitle: {
        fontSize: 25,
        marginLeft: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },
    categoryAndErrorContainer: {
        height: Dimensions.get('window').height * .09,
    },
    searchContainer: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'deepskyblue',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .06,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center'
    },
    serachRow: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * .06,
        alignItems: 'center'
    },
    searchIcon: {
        height: Dimensions.get('window').height * .04,
        width: Dimensions.get('window').width * .09,
        marginLeft: 10,
    },
    textInputStyle: {
        marginLeft: 15,
        fontSize: 20,
        justifyContent: 'center'
    },
    categoryErrorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 5
    },
    categoryPickerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    categorySelect: {
        width: Dimensions.get('window').width * .9,
        marginTop: 30
    },
});

export default TrainerPickCategoriesEditProfile;