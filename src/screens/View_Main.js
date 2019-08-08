import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    Alert,
    AsyncStorage,
    Button,
    StyleSheet,
    Text,
    TouchableHighlight,
    BackHandler
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackNavigator, NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import List from '../components/List';
import Credits from '../components/Credits';

import { newForm } from '../actions/Actions_Form';
import { addForm } from '../actions/Actions_Forms';
import { switchLoading } from '../actions/Actions_Loading';

import { getId, setForm } from '../lib/Storage';

import Style from '../config/Styles';

const resetAction_Login = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
    ]
});
const resetAction_Form = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Form' }),
    ]
});


const mapStateToProps = state => (
    {
        loading: state.Reducer_Loading.loading,
        forms: state.Reducer_Forms.forms,
        form: state.Reducer_Form.form
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
        alignItems: 'center',
    },
    footer: {
        flex: 0.1,
        alignItems: 'center'
    },
    space: {
        margin: Style.PADDING
    },
    actionButtonIcon: {
        fontSize: Style.FONT_SIZE_BIG * 0.6,
        height: Style.FONT_SIZE_BIG * 0.6,
        color: 'white',
    },
});

var verify = true;

class View_Main extends Component {

    componentDidMount() {

        getId();

        AsyncStorage.getItem('@App:forms')
            .then((data) => {
                data = JSON.parse(data);
                if (typeof data != 'object') {
                    data = JSON.parse(data[0]);
                }
                let forml = null;
                let father = this;
                if (data != null) {
                    if (data.constructor === Array) {
                        forml = new Array();
                        data.map((object) => {
                            if (object.constructor === Object) {
                                father.props.addForm(object);
                            }
                        })
                    } else if (data.constructor === Object) {
                        Object.keys(data).map(function (object) {
                            forml = data.object;
                        });
                    }
                }

            });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        return true;
    }

    static navigationOptions = {
        title: 'Formulários',
        headerLeft: (
            <TouchableHighlight onPress={() => setForm()}
                style={{ margin: margin_sl }}>
                <Icon name="sync" style={{
                    fontSize: Style.FONT_SIZE_BIG * 0.6,
                    height: Style.FONT_SIZE_BIG * 0.6,
                    width: Style.FONT_SIZE_BIG * 0.6,
                    color: 'white',
                }} />
            </TouchableHighlight>
        ),
        headerRight: <Credits />,
        headerStyle: {
            backgroundColor: Style.COLOR_SECONDARY_DARK,
            fontSize: Style.FONT_SIZE_MEDIUM
        },
        headerTintColor: '#FFF'
    };

    constructor(props) {
        super(props);
        this.state = {
            agente: {
                nome: '',
                idade: '',
                sexo: '',
                regiao: ''
            },
            listItems: []
        };
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

                    if (!okay) {
                        this.props.switchLoading(false);
                        this.props.navigation.dispatch(resetAction_Login);
                    }
                });
        }
        verify = false;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <StatusBar
                        backgroundColor={Style.COLOR_SECONDARY_DARK}
                        barStyle={'light-content'} />
                    <Spinner
                        visible={this.props.loading}
                        textContent={"Carregando..."}
                        textStyle={{ color: '#FFF' }} />
                </View>
                <View style={styles.body}>
                    <List items={this.props.forms} />
                    <ActionButton
                        buttonColor={Style.COLOR_SECONDARY_DARK}
                        renderIcon={() => (<Icon name="add" style={styles.actionButtonIcon} />)}
                        title="New Task" onPress={() => verifyForms(this)} />
                </View>
            </ScrollView>
        );
    }
}

function verifyForms(father) {
    if (father.props.form != undefined) {
        // console.log(father.props.forms);
        if (father.props.form.estado == "unfinished") {
            Alert.alert(
                'Atenção',
                'O último formulário não foi concluido, gostaria de continuar no mesmo, ou deseja iniciar um novo?',
                [
                    {
                        text: 'Iniciar um novo', onPress: () => {
                            father.props.newForm();
                            //father.props.addForm(father.props.form);
                            father.props.navigation.navigate('Form');
                        }
                    },
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Continuar', onPress: () => father.props.navigation.navigate('Form') },
                ],
                { cancelable: false }
            );
        } else {
            father.props.newForm();
            //father.props.addForm(father.props.form);
            father.props.navigation.navigate('Form');
        }

    } else {
        father.props.newForm();
    }
}

export default connect(mapStateToProps, { addForm, newForm, switchLoading })(View_Main);
