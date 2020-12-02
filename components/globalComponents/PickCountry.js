import React from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native'
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';

const PickCountry = (props) => {

    let index = 0;
    const categories = [
        { key: index++, section: true, label: 'Countries' },
        { key: index++, label: 'Israel' },
        { key: index++, label: 'United States' },
        { key: index++, label: 'France', accessibilityLabel: 'Tap here for cranberries' },
        { key: index++, label: 'Italy', customKey: 'Not a fruit' }
    ];

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
                  borderRadius: 20,
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