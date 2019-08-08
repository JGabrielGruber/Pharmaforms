import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';


import Style from '../config/Styles';


const margin_sl = Style.CARD_WIDTH * 0.02;
const margin_hr = Style.CARD_WIDTH * 0.13;
const margin_vr = Style.CARD_HEIGHT * 0.10;
const size_border = Style.CARD_WIDTH * 0.004;
const photo_size = Style.CARD_WIDTH * 0.5;
const margin_input = Style.CARD_HEIGHT * 0.021;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Style.COLOR_PRIMARY_LIGHT,
        padding: margin_input,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    textTitle: {
        fontSize: Style.FONT_SIZE_TITLE,
        color: Style.COLOR_TEXT_DARK,
        marginHorizontal: margin_input
    },
    field_container: {
        margin: margin_input
    },
    field_textTitle: {
        color: Style.COLOR_TEXT_DARK,
        fontSize: Style.FONT_SIZE_TITLE,
    },
    field_TextInput: {
        fontSize: Style.FONT_SIZE_LITTLE
    },
    buttons_container: {
        flexDirection: 'row',
        alignContent: "flex-end",
        alignItems: "flex-end",
    },
    button: {
        padding: margin_sl,
        margin: margin_sl,
        justifyContent: "center",
        alignItems: "center",
    },
    button_text: {
        color: Style.COLOR_SECONDARY_DARK,
        fontSize: Style.FONT_SIZE_LITTLE,
        fontWeight: "bold"
    }
});

export default ({ father, action }) => (
    <ScrollView style={styles.container}>
        <View>
            <Text style={styles.textTitle}>
                {"Novo medicamento"}
            </Text>
        </View>
        <ModalField title="Nome:" data={father.state.medicamento.nome} name="nome" father={father} />
        <ModalField title="Dose:" data={father.state.medicamento.dose} name="dose" father={father} />
        <ModalField title="Posologia:" data={father.state.medicamento.posologia} name="posologia" father={father} />
        <ModalField title="Como usa:" data={father.state.medicamento.comoUsa} name="comoUsa" father={father} />
        <ModalField title="Indicação:" data={father.state.medicamento.indicacao} name="indicacao" father={father} />
        <View style={{flex:1}} />
        <View style={styles.buttons_container}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => cancelModal(father, action)}>
                <View style={styles.button}>
                    <Text style={styles.button_text}>
                        CANCELAR
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmModal(father, action)}>
                <View style={styles.button}>
                    <Text style={styles.button_text}>
                        OK
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
)

ModalField = ({ title, data, father, name }) => {
    return (
        <View
            style={styles.field_container}
        >
            <Text
                style={styles.field_textTitle}
            >
                {title}
            </Text>
            <TextInput
                style={styles.field_TextInput}
                autoCapitalize="none"
                autoCorrect={false}
                value={data}
                underlineColorAndroid={Style.COLOR_SECONDARY}
                placeholderTextColor={Style.COLOR_TEXT_HOLDER}
                selectionColor={Style.COLOR_SECONDARY_DARK}
                onChangeText={(value) => {
                    let newState = father.state.medicamento;
                    newState[name] = value;
                    father.setState({ newState });
                }}
            />
        </View>
    );
}

function cancelModal(father, action) {

    father.setState({
        medicamento: {
            key: '',
            nome: '',
            dose: '',
            posologia: '',
            comoUsa: '',
            indicacao: ''
        }
    })
    action(father, false);
}

function confirmModal(father, action) {
    let index = father.state.individuo.medicamentos.length - 1;

    if (index == -1)
        index = 0;

    /*let array = Object.assign({}, father.state.individuo.medicamentos, [

        ...father.state.individuo.medicamentos.slice(0, index),
        father.state.medicamento

    ]);*/

    let medicamento = father.state.medicamento;

    medicamento.key = medicamento.nome;

    father.setState({ medicamento });

    let array = father.state.individuo.medicamentos.concat(father.state.medicamento);

    let newState = father.state;
    newState.individuo.medicamentos = array;
    father.setState({ newState });

    father.setState({
        medicamento: {
            key: '',
            nome: '',
            dose: '',
            posologia: '',
            comoUsa: '',
            indicacao: ''
        }
    });

    action(father, false);
}