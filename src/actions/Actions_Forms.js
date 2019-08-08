
let nextFormId = 1;

export const addForm = (form, agente) => {
    return {
        type: 'ADD_FORM',
        index: nextFormId++,
        form,
        agente
    };
};
