const INITIAL_STATE = {
    form: {
        id: 0,
        key: '',
        estado: 'unfinished',
        agente: {
            nome: '',
            idade: '',
            sexo: 'feminino',
            regiao: ''
        },
        individuo: {
            nome: '',
            sexo: 'feminino',
            idade: '',
            serieEstudo: '',
            rendaFamiliar: '',
            opiniaoSaude: '',
            medicamentos: []
        },
        adesao: {
            um: 'Nunca',
            dois: 'Nunca',
            tres: 'Nunca',
            quatro: 'Nunca',
            cinco: 'Nunca',
            seis: 'Nunca',
            sete: 'Nunca',
            oito: 'Nunca',
            nove: 'Nunca',
            dez: 'Nunca',
            onze: 'Nunca',
            doze: 'Nunca',
            verifica: 'Não',
            quando: 'Na compra'
        },
        medicamentos: {
            obtem: 'Farmácia/posto de saúde do governo (gratuito)',
            uso: 'Diário com prescrição médica',
            estoque: 'Sim',
            adquiridos: '0',
            descartados: 'Até 4 comprimidos',
            descarte: 'Coloco no lixo comum',
            motivoSobra: 'Não utilizado devido reações adversas',
            consciencia: 'Sim',
            orientacao: 'Sim'
        }
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_ID':
            state.form.id = action.id;
            return state;

        case 'UPDATE_ESTADO':
            state.form.estado = action.estado;
            return state;
        case 'SET_AGENTE':
            state.form.agente = action.agente;
            return state;
        case 'SET_INDIVIDUO': dividuo = action.individuo;
            return state;
        case 'SET_ADESAO':
            state.form.adesao = action.adesao;
            return state;
        case 'SET_MEDICAMENTOS':
            state.form.medicamentos = action.medicamentos;
            return state;
        case 'NEW_FORM':
            return Object.assign({}, state, {
                form: {
                    id: 0,
                    key: '',
                    estado: 'unfinished',
                    agente: {
                        nome: '',
                        idade: '',
                        sexo: 'feminino',
                        regiao: ''
                    },
                    individuo: {
                        nome: '',
                        sexo: 'feminino',
                        idade: '',
                        serieEstudo: '',
                        rendaFamiliar: '',
                        opiniaoSaude: '',
                        medicamentos: []
                    },
                    adesao: {
                        um: 'Nunca',
                        dois: 'Nunca',
                        tres: 'Nunca',
                        quatro: 'Nunca',
                        cinco: 'Nunca',
                        seis: 'Nunca',
                        sete: 'Nunca',
                        oito: 'Nunca',
                        nove: 'Nunca',
                        dez: 'Nunca',
                        onze: 'Nunca',
                        doze: 'Nunca',
                        verifica: 'Não',
                        quando: 'Na compra'
                    },
                    medicamentos: {
                        obtem: 'Farmácia/posto de saúde do governo (gratuito)',
                        uso: 'Diário com prescrição médica',
                        estoque: 'Sim',
                        adquiridos: '0',
                        descartados: 'Até 4 comprimidos',
                        descarte: 'Coloco no lixo comum',
                        motivoSobra: 'Não utilizado devido reações adversas',
                        consciencia: 'Sim',
                        orientacao: 'Sim'
                    }
                }
            });

    }
    return state;
}
/*
function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}

function removeItem(array, action) {
    return [
        ...array.slice(0, action.index),
        ...array.slice(action.index + 1)
    ];
}

function updateObjectInArray(array, action) {
    return array.map((item, index) => {
        if (index !== action.index) {
            return item;
        }

        return {
            ...item,
            ...action.item
        };
    });
}*/