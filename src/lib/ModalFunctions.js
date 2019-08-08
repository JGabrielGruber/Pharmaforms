
export function alterModalVisible(father) {
    father.setState({
        modaVisible: !father.state.modaVisible
    });
}

export function cancelModal(father, data) {
    data.map((object) => {
        object = '';
    });
    alterModalVisible(father);
}

export function comfirmModal(father, data) {
    father.props.pushMedicamento(data);
    alterModalVisible(father);
}