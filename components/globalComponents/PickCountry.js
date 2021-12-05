import React, { useEffect, useState } from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native'
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';

const PickCountry = (props) => {

    let index = 0;
    const [categories, setCategories] = useState([
      { key: index++, section: true, label: 'Countries' }
    ])

    const configCountries = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all', configCountries)
      .then(response => {
        const countryNames = response.data.map(country => country.name.common)
        console.log('countryNames ', countryNames)
        countryNames.sort()
        const newCategories = countryNames.map(country => (
          { key: index++, label: country }
        ))
        setCategories(prevCat => [prevCat[0], ...newCategories])
      })
      .catch(err => console.log('countries catch ', err))
    }, [])

    return (
        <View>
          <View style={styles.container}>
            <ModalSelector
                data={categories}
                initValue={props.initValue}
                onChange={props.onChange} 
                selectStyle={{
                  width: Dimensions.get('window').width * .825,
                  height: 60,
                  justifyContent: 'center',
                  borderColor: 'deepskyblue',
                  borderRadius: 17,
                  borderWidth: 2
                }}
                selectTextStyle={{
                  color: 'red'
                }}
                initValueTextStyle={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '300'
                }}
                visible={props.visible}
                onModalClose={props.onModalClose}
            />
            <TouchableOpacity
              onPress={props.onPress}
            >
              <Image 
                source={require('../../images/worldIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        width: Dimensions.get('window').width * .95, 
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .022
    },
    image: {
        height: Dimensions.get('window').height * .066, 
        width: Dimensions.get('window').height * .066 
    }
});

export default PickCountry;