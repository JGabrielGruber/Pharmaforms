import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
import Dimensions from 'Dimensions';

var x = Dimensions.get('window').width;
var y = Dimensions.get('window').height;

const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

const base_unit = 16;

const unit = base_unit * ratioX;

function em(value) {
    return unit * value;
}

if (x > y) {
    let t = y;
    y = x;
    x = t;
}

export default Style = {

    DEVICE_WIDTH: x,
    DEVICE_HEIGHT: y,
    RATIO_X: ratioX,
    RATIO_Y: ratioY,
    UNIT: em(1),
    PADDING: em(1.25),

    CARD_WIDTH: x,
    CARD_HEIGHT: y,
    CARD_PADDING_X: em(1.875),
    CARD_PADDING_Y: em(1.25),

    FONT_SIZE: em(1),
    FONT_SIZE_SMALLEST: em(0.6),
    FONT_SIZE_SMALLER: em(0.75),
    FONT_SIZE_SMALL: em(0.875),
    FONT_SIZE_LITTLE: em(1.25), // 1
    FONT_SIZE_TITLE: em(1.5), // 1.25
    FONT_SIZE_MEDIUM: em(1.7),
    FONT_SIZE_BIG: em(3),
    FONT_SIZE_BIGGER: em(3.25),

    COLOR_PRIMARY: '#bdbdbd',
    COLOR_PRIMARY_LIGHT: '#efefef',
    COLOR_PRIMARY_DARK: '#8d8d8d',
    COLOR_SECONDARY: '#d50000',
    COLOR_SECONDARY_LIGHT: '#ff5131',
    COLOR_SECONDARY_DARK: '#9b0000',
    COLOR_TEXT_LIGHT: '#F1F1F1',
    COLOR_TEXT_DARK: '#212121',
    COLOR_TEXT_HOLDER: '#616161',

    FIELD_WIDTH: em(30),
    FIELD_HEIGHT: em(3),


};

export const web_styles = StyleSheet.create({
    div: {
        fontSize: Style.FONT_SIZE_SMALL,
        color: 'white',
        textAlign: 'justify'
    },
    b: {
        fontWeight: '500'
    },
    strong: {
        fontWeight: '500'
    },
    i: {
        fontStyle: 'italic'
    },
    em: {
        fontStyle: 'italic'
    },
    u: {
        textDecorationLine: 'underline'
    },
    pre: {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
    },
    code: {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
    },
    a: {
        fontWeight: '500'
    },
    h1: {
        fontWeight: '500',
        fontSize: em(3.67)
    },
    h2: {
        fontWeight: '500',
        fontSize: em(2.14)
    },
    h3: {
        fontWeight: '500',
        fontSize: em(2.60)
    },
    h4: {
        fontWeight: '500',
        fontSize: em(2.25)
    },
    h5: {
        fontWeight: '500',
        fontSize: em(1.07),
        lineHeight: em(2.07)
    },
    h6: {
        fontWeight: '500',
        fontSize: em(1.71)
    }
});

export function getHeight(img) {
    let oy = img.height;
    let ox = img.width;

    let y = 0;
    if (ox > oy) {
        y = (oy * (x / ox));
    } else {
        y = oy;
    }
    return y;
}