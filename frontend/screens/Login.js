import React, { useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Button,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import { Icon } from "../components"; // Asegúrate de tener este componente.
import { Images, yummlyTheme } from "../constants";
import * as Google from 'expo-auth-session/providers/google';

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      // Aquí manejas el éxito de la autenticación, como almacenar el token,
      // navegar a otra pantalla, etc.
    }
  }, [response]);

  return (
    <DismissKeyboard>
      <Block flex style={{ justifyContent: 'flex-end', marginTop: 'auto' }}>
        <StatusBar hidden />
        <ImageBackground
          source={Images.LoginBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block style={{ width, height: height * 0.8, justifyContent: 'flex-end', marginBottom: 20 }} middle>
                  <Block flex={0.4} row style={{ marginBottom: 18 }}>
                    <Button
                      title="Go Home"
                      onPress={() => {
                        navigation.navigate("HomeDrawer");
                      }}
                      disabled={!request}
                    />
                  </Block>
            <Block style={styles.loginContainer}>
              <Block flex space="between">
                <Block flex={1} middle style={styles.socialConnect}>
                  <Block flex={0.6} middle>
                    <Text color="#8898AA" size={16}>
                      Login & Sign Up
                    </Text>
                  </Block>
                  <Block flex={0.4} row style={{ marginBottom: 18 }}>
                    {/* Botón de inicio de sesión con Google */}
                    <Button
                      title="Login with Google"
                      onPress={() => {
                        promptAsync();
                      }}
                      disabled={!request}
                    />
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
}


const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.7,
    height: height < 812 ? height * 0.25 : height * 0.15,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: yummlyTheme.COLORS.BLACK,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: yummlyTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: yummlyTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: yummlyTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
});

export default Login;
