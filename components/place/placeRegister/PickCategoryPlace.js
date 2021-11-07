import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PickCategories from '../../globalComponents/PickCategories';
import {CategoryContext} from '../../../context/placeContextes/CategoryContext';

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

const PickCategoryPlace = ({navigation}) => {
    const {categories, dispatchCategories} = useContext(CategoryContext);

    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState(categoriesData);

    const handleArrowButton = () => {
        dispatchCategories({
            type: 'SET_CATEGORIES',
            categories: selectedItems
        });
        navigation.navigate('ProfileDetailsPage2Place');
    }

    //When the user chooses category it whill be displayed on the input bellow
    const handleOnItemPress = (item) => {
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
              source={require('../../../images/arrowBack.png')}
              style={styles.arrowImage}
            />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>Choose your categories</Text>
        <View style={styles.searchContainer}>
            <View style={styles.serachRow}>
                <Image
                    source={require('../../../images/searchIcon.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search category"
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
    categoryPickerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    categorySelect: {
        width: Dimensions.get('window').width * .9,
        marginTop: 30
    },
});

export default PickCategoryPlace;