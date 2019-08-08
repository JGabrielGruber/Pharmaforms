import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    Alert,
    ScrollView
} from 'react-native';

import Style from '../config/Styles';

const styles = StyleSheet.create({
    container: {
        height: Style.CARD_HEIGHT * 0.89,
        width: Style.CARD_WIDTH * 0.9,
        flex: 1,
        margin: 10
    },
    item: {
        fontSize: Style.FONT_SIZE_TITLE,
        width: Style.FIELD_WIDTH,
        color: Style.COLOR_TEXT_HOLDER
    },
    itemContainer: {
        padding: Style.PADDING * 0.8,
        flex: 1
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: Style.COLOR_PRIMARY
    },
});

export default List = ({ items }) => {
    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={items}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={
                    (value) => {
                        if (value.item.key != "")
                            return (
                                <Item item={value} />
                            )
                    }}
            />
        </ScrollView>
    );
}

Item = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.item}>
                {item.item.key} - {item.item.individuo.nome}
            </Text>
        </View>
    )
}

ItemSeparator = () => {
    return (
        <View style={styles.separator} />
    );
}
