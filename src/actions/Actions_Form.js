
export const updateFormId = (id) => ({
    type: 'UPDATE_ID',
    id
});

export const updateFormEstado = (estado) => ({
    type: 'UPDATE_ESTADO',
    estado
});

export const setFormAgente = (agente) => ({
    type: 'SET_AGENTE',
    agente
});

export const setFormIndividuo = (individuo) => ({
    type: 'SET_INDIVIDUO',
    individuo
});

export const setFormAdesao = (adesao) => ({
    type: 'SET_ADESAO',
    adesao
});

export const setFormMedicamentos = (medicamentos) => ({
    type: 'SET_MEDICAMENTOS',
    medicamentos
});

export const newForm = () => ({
    type: 'NEW_FORM'
})