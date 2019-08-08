import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    Alert,
    AsyncStorage,
    Button,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackNavigator, NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import FormTitle from '../components/FormTitle';
import FormField from '../components/FormField';
import ComboSex from '../components/ComboSex';
import CreditsDark from '../components/CreditsDark';

import { verifyData } from '../lib/Functions';

import { switchLoading } from '../actions/Actions_Loading';

import Style from '../config/Styles';
import credentials from '../config/credentials';

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
    ]
});

const mapStateToProps = state => (
    {
        loading: state.Reducer_Loading.loading,
        agente: state.Reducer_Agente.agente,
    }
)

var margin_sl = Style.CARD_WIDTH * 0.02;
var margin_sm = Style.CARD_WIDTH * 0.10;
var margin_md = Style.CARD_WIDTH * 0.15;
var margin_vr = Style.CARD_HEIGHT * 0.20;
var margin_input = Style.CARD_HEIGHT * 0.021;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Style.COLOR_PRIMARY_LIGHT,
    },
    header: {
        flex: 0.7,
        marginTop: margin_vr,
    },
    body: {
        flex: 0.33,
        alignItems: 'center'
    },
    footer: {
        flex: 0.1,
        alignItems: 'center'
    },
    space: {
        margin: Style.PADDING
    }
});

var verify = true;

class View_Login extends Component {

    componentWillMount() {
        firebase.app();
        firebase.auth()
            .signInAndRetrieveDataWithEmailAndPassword(credentials.login, credentials.password);
    }

    componentDidMount() {
        let agente = this.props.agente;
        this.setState({ agente });
    }

    constructor(props) {
        super(props);
        this.state = {
            agente: {
                nome: '',
                idade: '',
                sexo: '',
                regiao: ''
            }
        };
        //   props.switchLoading(true);
    }

    render() {

        if (verify) {
            AsyncStorage.getItem('@App:agente')
                .then((data) => {
                    data = JSON.parse(data);
                    if (typeof data != 'object') {
                        data = JSON.parse(data);
                    }
                    let okay = true;
                    Object.keys(data).map(function (object) {
                        if (data[object] == "" || data[object] == undefined)
                            okay = false;
                    });
                    this.props.switchLoading(false);
                    console.log("Teste");
                    if (okay) {
                        console.log("FOi");
                        let agente = this.state.agente;
                        agente.nome = data.nome;
                        agente.idade = data.idade;
                        agente.sexo = data.sexo;
                        agente.regiao = data.regiao;
                        this.setState({ agente });
                        if (data == null || data == "" || data == undefined) {
                            console.log("Visho");
                        } else {
                            console.log("Eba");
                            this.props.switchLoading(false);
                            this.props.navigation.dispatch(resetAction);
                        }
                    }
                })
                .catch(() => {
                    this.props.switchLoading(false);
                });
        }
        verify = false;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <StatusBar
                        backgroundColor={Style.COLOR_PRIMARY}
                        barStyle={'dark-content'} />
                </View>
                <View style={styles.body}>
                    <FormTitle title="Sobre o agente" />
                    <FormField title="Nome completo:" data={this.state.agente.nome} group="agente" name="nome" father={this} />
                    <FormField title="Idade:" data={this.state.agente.idade} group="agente" name="idade" keyboardType='decimal-pad' father={this} />
                    <ComboSex title="Sexo:" data={this.state.agente.sexo} group="agente" father={this} />
                    <FormField title="Região de atuação:" data={this.state.agente.regiao} group="agente" name="regiao" father={this} />
                    <View style={styles.space} />
                    <Button
                        onPress={() => verifyData(this.state.agente, this, acess.bind(this))}
                        title="Acessar os formulários"
                        color={Style.COLOR_SECONDARY_DARK}
                        accessibilityLabel="Acessar os formulários com esses dados"
                    />
                </View>
                <View style={styles.footer}>
                    <CreditsDark />
                    <Spinner
                        visible={this.props.loading}
                        textContent={"Carregando..."}
                        textStyle={{ color: '#FFF' }} />
                </View>
            </ScrollView>
        );
    }
}

function acess(data, father) {
    AsyncStorage.setItem('@App:agente', JSON.stringify(data))
        .then(() => {
            AsyncStorage.getItem('@App:agente').then((data) => {
                data = JSON.parse(data);
                if (data == null || data == "" || data == undefined) {
                    Alert.alert(
                        'Atenção',
                        'Estamos com problemas nos dados do agente, por favor reinicie a aplicação e tente novamente.',
                        { text: 'Okay' }
                    );
                } else {
                    father.props.switchLoading(false);
                    father.props.navigation.dispatch(resetAction);
                }
            });
        });
}

export default connect(mapStateToProps, { switchLoading })(View_Login);
