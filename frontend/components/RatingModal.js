import React from "react";
import {Modal, View, ScrollView, Text, StyleSheet, TouchableOpacity} from "react-native";
import {AirbnbRating, Rating} from "react-native-ratings";
import yummlyTheme from "../constants/Theme";

const ReviewsModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <AirbnbRating
                        count={5}
                        defaultRating={0}
                        selectedColor={yummlyTheme.COLORS.GRADIENT_START}
                        size={40}
                        showRating={false}
                        style={{ paddingVertical: 10, width: 100 }}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 20,
        maxHeight: "80%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        marginTop: 10,
        color: "blue",
    },
});

export default ReviewsModal;
