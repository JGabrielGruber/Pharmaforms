const INITIAL_STATE = {
    forms: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_FORM':
            action.form.id = action.index;
            action.form.key = '' + action.index;
            if (action.agente != "") {
                action.form.agente = action.agente;
                action.form.estado = "finished";
            }

            return Object.assign({}, state, {
                forms: [
                    ...state.forms.slice(0, action.index),
                    action.form,
                    ...state.forms.slice(action.index)
                ]
            });
    }
    return state;
};