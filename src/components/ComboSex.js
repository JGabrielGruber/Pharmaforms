import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    StyleSheet
} from 'react-native';
import Style from '../config/Styles';
import { CustomPicker } from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Style.PADDING
    },
    textTitle: {
        fontSize: Style.FONT_SIZE_TITLE,
    },
    combo: {
        width: Style.FIELD_WIDTH,
        height: Style.FIELD_HEIGHT * 1.2,
    },
    comboTextContainer: {
        flex: 1,
    },
    comboText: {
        fontSize: Style.FONT_SIZE_LITTLE,
        color: Style.COLOR_TEXT_DARK
    },
    comboField: {
        padding: Style.PADDING * 0.4,
        width: Style.FIELD_WIDTH,
        flex: 1,
        flexDirection: 'row',
        alignContent: "flex-end",
        alignItems: "flex-end",
    },
    modalField: {
        padding: Style.PADDING * 0.6,
        backgroundColor: Style.COLOR_PRIMARY_LIGHT,
        flexDirection: 'row',
        alignContent: "flex-end",
        alignItems: "flex-end",
    },
    comboIco: {
        padding: Style.PADDING * 0.4,
        fontSize: Style.FONT_SIZE_BIG * 0.4,
        color: Style.COLOR_TEXT_DARK,
    }
});

export default ComboSex = (
    { title = "", data = "", group = "", father }
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
            <CustomPicker
                style={styles.combo}
                options={[
                    "Feminino",
                    "Masculino"
                ]}
                defaultValue={'Feminino'}
                fieldTemplate={renderField}
                optionTemplate={renderOption}
                onValueChange={(itemValue, itemIndex) => {
                    let newState = father.state;
                    newState[group].sexo = itemValue;
                    father.setState({newState});
                }}
            />
        </View>
    );
}

renderField = (settings) => {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
        <View style={styles.comboField}>
            <View style={styles.comboTextContainer} >
                <Text style={styles.comboText}>
                    {getLabel(selectedItem)}
                </Text>
            </View>
            <Icon name="md-arrow-dropdown" style={styles.comboIco} />
        </View>
    )
}

renderOption = (settings) => {
    const { item, getLabel } = settings;
    return (
        <View style={styles.modalField}>
            <Text style={styles.comboText}>
                {getLabel(item)}
            </Text>
        </View>
    )
}
