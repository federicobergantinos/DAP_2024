import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {yummlyTheme} from "../constants";


const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.overlay} />
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color={yummlyTheme.COLORS.GRADIENT_START} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscurecido con transparencia
    },
    spinnerContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingScreen;
