import React, {useEffect, useState, Fragment} from 'react';
import {View, Text, Button, ScrollView, Dimensions, Image, StyleSheet, SafeAreaView, TextInput, Switch} from 'react-native'

import { TagSelect } from 'react-native-tag-select';

const PickCategories = (props) => {
    const categories = [
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
        { id: 19, label: 'HORSEBACK RIDING' },
        { id: 20, label: 'OTHER' }
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