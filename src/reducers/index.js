import { combineReducers } from 'redux';

import Reducer_Loading from './Reducer_Loading';
import Reducer_Form from './Reducer_Form';
import Reducer_Forms from './Reducer_Forms';
import Reducer_Agente from './Reducer_Agente';

export default combineReducers({
    Reducer_Loading: Reducer_Loading,
    Reducer_Form: Reducer_Form,
    Reducer_Forms: Reducer_Forms,
    Reducer_Agente: Reducer_Agente
});