import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    StyleSheet
} from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import Style from '../config/Styles';

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
    },
    comboText: {
        fontSize: Style.FONT_SIZE_LITTLE,
        color: Style.COLOR_TEXT_HOLDER
    },
    footerText: {
        fontSize: Style.FONT_SIZE_LITTLE,
        color: Style.COLOR_TEXT_DARK
    }
});

export default Combo = (
    { title = "", data = "", group = "", name = "", items = [], father, type = "picker", footer = "default" }
) => {

    if (type == "picker") {
        return (
            <View
                style={styles.container}
            >
                <Text
                    style={styles.textTitle}
                >
                    {title}
                </Text>
                <Picker
                    selectedValue={data}
                    placeholder={''}
                    style={styles.combo}
                    itemStyle={styles.comboText}
                    fieldTemplate={renderField}
                    onValueChange={(itemValue, itemIndex) => {
                        let newState = father.state;
                        newState[group][name] = itemValue;
                        father.setState({ newState });
                    }}>
                    {items.map((item) => {
                        return (<Item label={item + ''} value={item + ''} key={item + ''} />)
                    })}
                </Picker>
            </View>
        );
    } else {
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
                    options={items}
                    defaultValue={items[0]}
                    fieldTemplate={renderField}
                    optionTemplate={renderOption}
                    footerTemplate={(settings) => {
                        if (footer != "default" && footer != "") {
                            return (
                                <View style={styles.modalField}>
                                    <Text style={styles.footerText}>
                                        {footer}
                                    </Text>
                                </View>
                            )
                        } else {
                            return (<View />)
                        }
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        let newState = father.state;
                        newState[group][name] = itemValue;
                        father.setState({ newState });
                    }}
                />
            </View>
        );
    }

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
