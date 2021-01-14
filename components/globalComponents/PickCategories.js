import React, {useEffect, useState, Fragment} from 'react';
import {View, Text, Button, ScrollView, Dimensions, Image, StyleSheet, SafeAreaView, TextInput, Switch} from 'react-native'

import { TagSelect } from 'react-native-tag-select';

const PickCategories = (props) => {
    const categories = [
        { id: 1, label: 'HIT' },
        { id: 2, label: 'KICK BOX' },
        { id: 3, label: 'MARTIAL ARTS' },
        { id: 4, label: 'PILATIS' },
        { id: 5, label: 'CLIMBING' },
        { id: 6, label: 'TRX' },
        { id: 7, label: 'DANCING' },
        { id: 8, label: 'SWIMMING' },
        { id: 9, label: 'RUNNING' }
    ];

    return (
        <TagSelect
            value={props.value}
            data={props.data}
            itemStyle={styles.item}
            itemLabelStyle={styles.label}
            itemStyleSelected={styles.itemSelected}
            ref={(tag) => {
                this.tag = tag;
            }}
            onItemPress={props.onItemPress}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderColor: 'deepskyblue',    
        backgroundColor: '#FFF'
    },
    label: {
        color: '#333',
        fontWeight: 'bold'
    },
    itemSelected: {
        backgroundColor: 'deepskyblue',
    }
});

export default PickCategories;