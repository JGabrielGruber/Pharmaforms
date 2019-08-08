import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import Style from '../config/Styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Style.PADDING,
        alignContent:'center'
    },
    textTitle: {
        fontSize: Style.FONT_SIZE_MEDIUM,
        color: Style.COLOR_TEXT_HOLDER,
        fontWeight: 'bold'
    },
});

export default FormTitle = (
    { title = ""}
) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.textTitle}
            >
                {title}
            </Text>
        </View>
    );
}
