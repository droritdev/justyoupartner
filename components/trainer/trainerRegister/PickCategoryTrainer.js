import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions, Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PickCategories from '../../globalComponents/PickCategories';
import {CategoryContext} from '../../../context/trainerContextes/CategoryContext';

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

const PickCategory = ({navigation}) => {
    const {categories, dispatchCategories} = useContext(CategoryContext);

    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState(categoriesData);

    const handleArrowButton = () => {
        dispatchCategories({
            type: 'SET_CATEGORIES',
            categories: selectedItems
        });
        navigation.navigate('ProfileDetailsPage2Trainer');
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
        marginLeft: Dimensions.get('window').width * .0483,
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
        height: Dimensions.get('window').height * .04,
        width: Dimensions.get('window').width * .09,
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
});

export default PickCategory;