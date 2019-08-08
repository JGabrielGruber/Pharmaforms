import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    Alert,
    ScrollView,
    Button
} from 'react-native';
import Modal from "react-native-modal";

import ModalList from './ModalList';

import Style from '../config/Styles';

const styles = StyleSheet.create({
    container: {
        height: Style.CARD_HEIGHT * 0.4,
        width: Style.CARD_WIDTH * 0.9,
        padding: Style.PADDING,
        flex: 1,
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
    textTitle: {
        fontSize: Style.FONT_SIZE_TITLE,
        color: Style.COLOR_TEXT_HOLDER,
        marginRight: Style.PADDING * 4
    },
    titleRow: {
        width: Style.CARD_WIDTH * 0.9,
        height: Style.FONT_SIZE_BIG,
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
});

export default BetterList = ({ items, father }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.textTitle}>
                    {"Medicamentos em uso:"}
                </Text>
                <Button
                    onPress={() => alterModal(father, true)}
                    title="Novo Medicamento"
                    color={Style.COLOR_SECONDARY}
                    accessibilityLabel="Cadastrar um novo medicamento a lista"
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={(value) => {
                        if (value.item.key != "")
                            return (
                                <ItemList item={value} />
                            )
                    }}
                />
            </ScrollView>
            <Modal
                isVisible={father.state.modalVisible}
                onBackdropPress={() => alterModal(father, false)}
            >
                <ModalList father={father} action={alterModal.bind(this)} />
            </Modal>
        </View>
    );
}

ItemList = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.item}>
                {item.item.nome}
            </Text>
        </View>
    )
}

ItemSeparator = () => {
    return (
        <View style={styles.separator} />
    );
}

function alterModal(father, value) {
    father.setState({
        modalVisible: value
    });
}
