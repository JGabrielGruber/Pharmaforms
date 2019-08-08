import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';

import Style from '../config/Styles';

const logo = require('../assets/byJGG_w.png');
const image_width = Style.CARD_WIDTH * 0.3;
const image_height = Style.CARD_HEIGHT * 0.3;

export default props => (
    <View style={ container }>
        <Image source={ logo } style={ image }/>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1, 
        width: image_width,
        height: image_height,
        resizeMode: 'contain',
    },
});

const { container, image } = styles;