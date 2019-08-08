import { Alert } from 'react-native';

export function verifyData(data, father, action) {
    console.log("Oi");
    let okay = true;
    Object.keys(data).map(function (object) {
        if (data[object] == "" || data[object] == undefined)
            okay = false;
    });

    if (!okay) {
        Alert.alert(
            "Atenção",
            "Preencha todos os campos",
            [
                { text: 'OK' },
            ],
        );
    } else if (okay) {
        action(data, father);
    }
}