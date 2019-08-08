import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import credentials from '../config/credentials';

export async function getId(setForm = "") {
    await firebase.app();
    await firebase.auth()
        .signInAndRetrieveDataWithEmailAndPassword(credentials.login, credentials.password);
    AsyncStorage.getItem('@App:id').then((id) => {
        if (id == null || id == undefined) {
            const id = firebase.database().ref('users').push().key;
            AsyncStorage.setItem('@App:id', id).then(() => {
                if (setForm == "set") {
                    setForm();
                }
            });;
        }
    }).catch((erro) => {
        console.log(erro);
    });
}

export async function setForm() {
    console.log("Começou");
    await firebase.app();
    await firebase.auth()
        .signInAndRetrieveDataWithEmailAndPassword(credentials.login, credentials.password);
    AsyncStorage.getItem('@App:id').then((id) => {
        if (id == null || id == undefined) {
            getId("set");
        } else {
            AsyncStorage.getItem('@App:forms').then((forms) => {
                forms = JSON.parse(forms);
                firebase.database().ref('users').child(id).set(forms)
                    .catch((erro) => {
                        console.log("Deu pau!");
                    });
                Alert.alert(
                    'Sucesso',
                    'Sincronização concluída!',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                );
                console.log("Foi!");
            });
        }
    }).catch((erro) => {
        console.log("Deu pau!");
        console.log(erro);
    });
}

