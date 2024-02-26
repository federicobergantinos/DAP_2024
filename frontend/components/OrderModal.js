import React, { useState } from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const OrderByModal = ({ isVisible, onClose, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('default');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        onSelect(option);
        onClose()
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Ordenar por:</Text>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectOption('default')}
                    >
                        <View style={styles.radioButton}>
                            {selectedOption === 'default' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.optionText}>Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleSelectOption('rating')}
                    >
                        <View style={styles.radioButton}>
                            {selectedOption === 'rating' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.optionText}>Rating</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 35,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#888',
    },
    optionText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
});

export default OrderByModal;
