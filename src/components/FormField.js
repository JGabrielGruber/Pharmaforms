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
        padding: Style.PADDING
    },
    textTitle: {
        fontSize: Style.FONT_SIZE_TITLE,
        color: Style.COLOR_TEXT_HOLDER
    },
    TextInput: {
        fontSize: Style.FONT_SIZE_LITTLE,
        width: Style.FIELD_WIDTH,
        height: Style.FIELD_HEIGHT,
        color: Style.COLOR_TEXT_DARK
    }
});

export default FormField = (
    { title = "", title_id = "", input_id = "", container_id = "", data = "", group = "",name = "", placeholder = "", keyboardType = "default", father }
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
            <TextInput
                style={styles.TextInput}
                autoCapitalize="none"
                autoCorrect={false}
                value={data}
                underlineColorAndroid={Style.COLOR_SECONDARY}
                placeholder={placeholder}
                placeholderTextColor={Style.COLOR_TEXT_HOLDER}
                selectionColor={Style.COLOR_SECONDARY_DARK}
                keyboardType={keyboardType}
                onChangeText={(value) => {
                    let newState = father.state;
                    newState[group][name] = value;
                    father.setState({newState});
                }}
            />
        </View>
    );
}
