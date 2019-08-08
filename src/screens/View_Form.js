import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    Alert,
    AsyncStorage,
    Button,
    StyleSheet,
    FlatList,
    Text,
    TouchableHighlight,
    BackHandler,
    TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StackNavigator, NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FormField from '../components/FormField';
import ComboSex from '../components/ComboSex';
import Combo from '../components/Combo';
import BetterList from '../components/BetterList';
import FormTitle from '../components/FormTitle';

import { newForm } from '../actions/Actions_Form';
import { addForm } from '../actions/Actions_Forms';
import { switchLoading } from '../actions/Actions_Loading';

import { setForm } from '../lib/Storage';

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
        form: state.Reducer_Form.form,
        forms: state.Reducer_Forms.forms,
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
        color: Style.COLOR_TEXT_DARK,
        fontSize: Style.FONT_SIZE_LITTLE,
        fontWeight: "bold"
    },
    cancel_button: {
        padding: margin_sl,
        margin: margin_sl,
        justifyContent: "center",
        alignItems: "center",
    },
    cancel_button_text: {
        color: Style.COLOR_SECONDARY_DARK,
        fontSize: Style.FONT_SIZE_LITTLE,
        fontWeight: "bold"
    },
    done_button: {
        padding: margin_sl,
        margin: margin_sl,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Style.COLOR_SECONDARY_DARK
    },
    done_button_text: {
        color: Style.COLOR_TEXT_LIGHT,
        fontSize: Style.FONT_SIZE_LITTLE,
        fontWeight: "bold"
    },
});

var verify = true, goBack = 0;

class View_Main extends Component {

    componentDidMount() {
        let individuo = this.props.form.individuo;
        let adesao = this.props.form.adesao;
        let medicamentos = this.props.form.medicamentos;
        this.setState({ individuo, adesao, medicamentos });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        goBack++;
        if (goBack == 2) {
            goBack = 0;
            this.props.navigation.navigate('Main');
        }
        //this.goBack(); // works best when the goBack is async
        return true;
    }

    static navigationOptions = {
        title: 'Novo Formulário',
        headerStyle: {
            backgroundColor: Style.COLOR_SECONDARY_DARK,
            fontSize: Style.FONT_SIZE_MEDIUM
        },
        headerTintColor: '#FFF'
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            individuo: {
                nome: '',
                sexo: '',
                idade: '',
                serieEstudo: '',
                rendaFamiliar: '',
                opiniaoSaude: '',
                medicamentos: [
                    {
                        key: '',
                        nome: '',
                        dose: '',
                        posologia: '',
                        comoUsa: '',
                        indicacao: ''
                    }
                ]
            },
            adesao: {
                um: '',
                dois: '',
                tres: '',
                quatro: '',
                cinco: '',
                seis: '',
                sete: '',
                oito: '',
                nove: '',
                dez: '',
                onze: '',
                doze: '',
                verifica: '',
                quando: ''
            },
            medicamentos: {
                obtem: '',
                uso: '',
                estoque: '',
                adquiridos: '',
                descartados: '',
                descarte: '',
                motivoSobra: '',
                consciencia: '',
                orientacao: ''
            },
            medicamento: {
                key: '',
                nome: '',
                dose: '',
                posologia: '',
                comoUsa: '',
                indicacao: ''
            },
            listItems: [],
            statusIndividuo: true,
            statusAdesao: false,
            statusMedicamentos: false
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
                    if (data == null || data == "" || data == undefined) {
                        okay = false;
                    }

                    if (!okay) {
                        this.props.switchLoading(false);
                        this.props.navigation.dispatch(resetAction_Login);
                    }
                });
        }
        verify = false;

        return (
            <ScrollView style={styles.container} ref='_scrollView'>
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
                    <Form_Individuo father={this} />
                    <Form_Adesao father={this} />
                    <Form_Medicamentos father={this} />
                </View>
                <View style={styles.footer}>
                </View>
            </ScrollView>
        );
    }
}

Form_Individuo = ({ father }) => {
    if (father.state.statusIndividuo) {
        return (
            <View key="individuo">
                <FormTitle title="Sobre o indivíduo" />
                <FormField title="Nome:" data={father.state.individuo.nome} group="individuo" name="nome" father={father} />
                <ComboSex title="Sexo:" data={father.state.individuo.sexo} group="individuo" father={father} />
                <FormField title="Idade:" data={father.state.individuo.idade}
                    group="individuo" name="idade" keyboardType='decimal-pad' father={father} />
                <FormField title="Série de Estudo:" data={father.state.individuo.serieEstudo}
                    group="individuo" name="serieEstudo" father={father} />
                <FormField title="Renda Familiar:" data={father.state.individuo.rendaFamiliar} keyboardType='decimal-pad'
                    group="individuo" name="rendaFamiliar" father={father} />
                <Combo title="O que você acha da sua saúde hoje?" data={father.state.individuo.opiniaoSaude} group="individuo"
                    type="combo" name="opiniaoSaude" items={['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} father={father} />
                <BetterList items={father.state.individuo.medicamentos} father={father} />
                <Buttons type="first" father={father} />
            </View>
        )
    } else {
        return (<View />)
    }
}

Form_Adesao = ({ father }) => {
    let options = ["Nunca", "As Vezes", "Quase Sempre", "Sempre"];
    if (father.state.statusAdesao) {
        return (
            <View key="adesao">
                <FormTitle title="Sobre a adesão" />
                <Combo title="Esquece-se de tomar seu medicamento?" data={father.state.adesao.um}
                    type="combo" group="adesao" name="um" father={father} items={options} />
                <Combo title="Com que frequência decide não tomar seus medicamentos?" data={father.state.adesao.dois}
                    type="combo" group="adesao" name="dois" father={father} items={options} />
                <Combo title="Esquece-se de ir a farmácia pegar seus medicamentos?" data={father.state.adesao.tres}
                    type="combo" group="adesao" name="tres" father={father} items={options} />
                <Combo title="Deixa acabar seus medicamentos?" data={father.state.adesao.quatro}
                    type="combo" group="adesao" name="quatro" father={father} items={options} />
                <Combo title="Deixa de tomar seus medicamentos porque vai a uma consulta médica?" data={father.state.adesao.cinco}
                    type="combo" group="adesao" name="cinco" father={father} items={options} />
                <Combo title="Deixa de tomar seu medicamento quando se sente melho?" data={father.state.adesao.seis}
                    type="combo" group="adesao" name="seis" father={father} items={options} />
                <Combo title="Deixa de tomar seu medicamento quando se sente mal ou doente?" data={father.state.adesao.sete}
                    type="combo" group="adesao" name="sete" father={father} items={options} />
                <Combo title="Deixa de tomar seu medicamento qunado está mais descuidado consigo mesmo?" data={father.state.adesao.oito}
                    type="combo" group="adesao" name="oito" father={father} items={options} />
                <Combo title="Muda a dose do seu medicamento por alguma necessidade?" data={father.state.adesao.nove}
                    type="combo" group="adesao" name="nove" father={father} items={options} />
                <Combo title="Esquece-se de tomar o medicamento quando tem que tomar mais de uma vez por dia?" data={father.state.adesao.dez}
                    type="combo" group="adesao" name="dez" father={father} items={options} />
                <Combo title="Deixa de adquirir seu medicamento por causa do preço muito caro?" data={father.state.adesao.onze}
                    type="combo" group="adesao" name="onze" father={father} items={options} />
                <Combo title="Se antecipa e busca seu medicamento na farmácia do seu acabar?" data={father.state.adesao.doze}
                    type="combo" group="adesao" name="doze" father={father} items={options} />
                <Combo title="Realiza verificação do prazo de validade do medicamento?" data={father.state.adesao.verifica}
                    type="combo" group="adesao" name="verifica" father={father} items={["Não", "Sim"]} />
                <Another father={father} />
                <AnotherField father={father} />
                <Buttons type="middle" father={father} />
            </View>
        )
    } else {
        return (<View />)
    }
}

let content = ["Na compra", "Quando vai usar", "Quando revisa o estoque domiciliar", "Outro? Qual? "];

Another = ({ father }) => {
    if (father.state.adesao.verifica == "Sim") {
        return (
            <Combo title="Em que momento ocorre a verificação do prazo de validade?" data={father.state.adesao.quando}
                group="adesao" name="quando" father={father}
                type="combo" items={content} />
        );
    }
    return (<View />);
}

AnotherField = ({ father }) => {
    if (father.state.adesao.verifica == "Sim" &&
        (!content.includes(father.state.adesao.quando) || father.state.adesao.quando == "Outro? Qual? ")) {
        return (
            <FormField title="Outro? Qual:" data={father.state.adesao.quando}
                group="adesao" name="quando" father={father} />
        );
    }
    return (<View />);
}

var contentDescartados = ["Não descarto", "Descarto um pouco", "Descarto alguns", "Descarto muito"],
    contentDescarte = ["Coloco no lixo comum", "Medicamento na água corrente e embalagens de lixo", "Possto de saúde/Farmácia",
        "Tudo no reciclável", "Outros? Qual? "],
    contentSobra = ["Não utilizado devido reações adversas", "Sobras devido a interrupção do tratamento. Por qual motivo? ",
        "Sobras devido quantidade usada inferior a adquirida", "Sobras devido a troca de medicação", "Outros? Qual? "];

Form_Medicamentos = ({ father }) => {
    if (father.state.statusMedicamentos) {
        return (
            <View key="medicamento">
                <FormTitle title="Sobre o medicamento" />
                <Combo title="Onde você adquire seu medicamento?" data={father.state.medicamentos.obtem} group="medicamentos"
                    name="obtem"
                    items={["Farmácia/posto de saúde do governo (gratuito)", "Farmácia/drogaria (pago)",
                        "Amostra grátis distribuída por profissionais de saúde em consultórios, clínicas e/ou hospitais",
                        "Não adquiro ou faço uso de medicamentos."]}
                    type="combo" father={father} />
                <Combo title="Sobre o uso do medicamento" data={father.state.medicamentos.uso} group="medicamentos"
                    name="uso"
                    items={["Diário com prescrição médica", "Diário sem prescrição médica", "Esporádicos sem prescrição médioca", "Esporádico com prescrição médica"]}
                    type="combo" father={father} />

                <Combo title="Há estoque de medicamentos no domicilio?" data={father.state.medicamentos.estoque}
                    group="medicamentos" name="estoque" father={father}
                    type="combo" items={["Sim", "Não"]} />
                <Combo title="Quantidade de medicamentos adquiridos em um mês" data={father.state.medicamentos.adquiridos}
                    group="medicamentos" name="adquiridos" father={father}
                    type="combo" items={['0', 1, 2, 3, 4, "mais de 4"]} />
                <Combo title="Quantidade de medicamentos vencidos descartados em um período de um ano" data={father.state.medicamentos.descartados}
                    group="medicamentos" name="descartados" father={father}
                    type="combo" items={contentDescartados} 
                    footer={"Sendo que, descarto pouco significa: até 6 unidades de comprimidos ou 30ml, descarto alguns até 12 unidades de comprimidos ou até 60ml, descarto muito: mais do que 12 unidades de comprimidos ou mais do que 60 ml."}/>
                <Combo title="Onde você costuma descartar seu medicamento vencido?"
                    data={father.state.medicamentos.descarte} group="medicamentos" name="descarte" father={father}
                    type="combo" items={contentDescarte} />
                <FieldDescarte father={father} />
                <Combo title="Motivo da sobra de medicação acarretando no vencimento" data={father.state.medicamentos.motivoSobra}
                    group="medicamentos" name="motivoSobra" father={father}
                    type="combo" items={contentSobra} />
                <FieldSobra father={father} />
                <Combo title="Vocẽ sabe que o descarte inadequado de medicamentos ode causar impactos ao ambiente e à saúde pública?"
                    data={father.state.medicamentos.consciencia} group="medicamentos" name="consciencia" father={father}
                    type="combo" items={["Sim", "Não"]} />
                <Combo title="Você já recebeu alguma orientação sobre o descarte correto de medicamentos?"
                    data={father.state.medicamentos.orientacao} group="medicamentos" name="orientacao" father={father}
                    type="combo" items={["Sim", "Não"]} />
                <Buttons type="last" father={father} />
            </View>
        )
    } else {
        return (<View />)
    }
}

FieldDescartados = ({ father }) => {
    //<FieldDescartados father={father} />
    if (!contentDescartados.includes(father.state.medicamentos.descartados) ||
        father.state.medicamentos.descartados == "Outros? Qual? ") {
        return (
            <FormField title="Outro? Qual:" data={father.state.medicamentos.descartados}
                group="medicamentos" name="descartados" father={father} />
        );
    }
    return (<View />);
}

FieldDescarte = ({ father }) => {
    if (!contentDescarte.includes(father.state.medicamentos.descarte) ||
        father.state.medicamentos.descarte == "Outros? Qual? ") {
        return (
            <FormField title="Outro? Qual:" data={father.state.medicamentos.descarte}
                group="medicamentos" name="descarte" father={father} />
        );
    }
    return (<View />);
}

FieldSobra = ({ father }) => {
    if (!contentSobra.includes(father.state.medicamentos.motivoSobra) ||
        father.state.medicamentos.motivoSobra == "Sobras devido a interrupção do tratamento. Por qual motivo? ") {
        return (
            <FormField title="Por qual motivo?" data={father.state.medicamentos.motivoSobra}
                group="medicamentos" name="motivoSobra" father={father} />
        );
    } else if (!contentSobra.includes(father.state.medicamentos.motivoSobra) ||
        father.state.medicamentos.motivoSobra == "Outros? Qual? ") {
        return (
            <FormField title="Outros? Qual:" data={father.state.medicamentos.motivoSobra}
                group="medicamentos" name="motivoSobra" father={father} />
        );
    }
    return (<View />);
}

Buttons = ({ father, type = "" }) => {
    switch (type) {
        case "first":
            return (
                <View style={styles.buttons_container}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Atenção',
                            'Você confirma que deseja realmente cancelar o formulário e apagar seu conteúdo? Caso deseja voltar ao menu, pressione duas vezes o botão físico de voltar',
                            [

                                { text: 'Cancelar e voltar ao formulário', style: 'cancel' },
                                {
                                    text: 'Confirmar', onPress: () => {
                                        father.props.newForm();
                                        father.props.navigation.navigate('Main');
                                    }
                                },
                            ],
                            { cancelable: false }
                        );
                    }}>
                        <View style={styles.cancel_button}>
                            <Text style={styles.cancel_button_text}>
                                CANCELAR
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => {
                        father.setState({ statusIndividuo: false, statusAdesao: true });
                        father.refs._scrollView.scrollTo({ y: 0, animated: false });
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>
                                PRÓXIMO
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        case "middle":
            return (
                <View style={styles.buttons_container}>
                    <TouchableOpacity onPress={() => {
                        father.setState({ statusIndividuo: true, statusAdesao: false });
                        father.refs._scrollView.scrollTo({ y: 0, animated: false });
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>
                                ANTERIOR
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => {
                        father.setState({ statusMedicamentos: true, statusAdesao: false });
                        father.refs._scrollView.scrollTo({ y: 0, animated: false });
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>
                                PRÓXIMO
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        case "last":
            return (
                <View style={styles.buttons_container}>
                    <TouchableOpacity onPress={() => {
                        father.setState({ statusMedicamentos: false, statusAdesao: true });
                        father.refs._scrollView.scrollTo({ y: 0, animated: false });
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>
                                ANTERIOR
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Atenção',
                            'Você confirma que deseja concluir o formulário? Após isso, ele não poderá mais ser editado!',
                            [

                                { text: 'Cancelar e voltar ao formulário', style: 'cancel' },
                                {
                                    text: 'Confirmar', onPress: () => {
                                        if (father.props.agente == null || father.props.agente == "" || father.props.agente == undefined) {
                                            Alert.alert(
                                                'Atenção',
                                                'Estamos com problemas nos dados do agente, por favor reinicie a aplicação e tente novamente.',
                                                { text: 'Okay' }
                                            );
                                        } else if (father.props.agente == null || father.props.agente == "" || father.props.agente == undefined) {
                                            Alert.alert(
                                                'Atenção',
                                                'Estamos com problemas nos dados do formulário, por favor reinicie a aplicação e tente novamente.',
                                                { text: 'Okay' }
                                            );
                                        } else {
                                            father.props.addForm(father.props.form, father.props.agente);
                                            AsyncStorage.setItem('@App:forms', JSON.stringify(father.props.forms))
                                                .then(() => {
                                                    setForm();
                                                    father.props.navigation.navigate('Main');
                                                });
                                        }

                                    }
                                },
                            ],
                            { cancelable: false }
                        );
                    }}>
                        <View style={styles.done_button}>
                            <Text style={styles.done_button_text}>
                                CONCLUIR
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
    }

}


export default connect(mapStateToProps, { newForm, addForm, switchLoading })(View_Main);
