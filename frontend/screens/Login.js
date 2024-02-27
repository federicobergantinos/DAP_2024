import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
} from "react-native";
import { Block, Text } from "galio-framework";

import { Button } from "../components";
import { Images, yummlyTheme } from "../constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import backendApi from "../api/backendGateway";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = () => {
  const navigation = useNavigation();
  const isLoggedUser = async () => {
    return (
      (await AsyncStorage.getItem("token")) !== null &&
      (await AsyncStorage.getItem("refresh")) !== null &&
      (await AsyncStorage.getItem("userId")) !== null
    );
  };

  const [isLoading, setIsLoading] = useState(isLoggedUser);

  GoogleSignin.configure({
    webClientId:
      "445263022323-e0okjk06i01er8q0gcg51oensjp8h34o.apps.googleusercontent.com",
    androidClientId:
      "445263022323-iej9nrjnjk5gr7h1l9cuq9g9l8mbfr6b.apps.googleusercontent.com",
    iosClientId:
      "445263022323-u2nac6qhp2rupfsgc26gkbriup8n7ho5.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    const validateLoggedUser = async () => {
      if (await isLoggedUser()) {
        reAuthenticate();
      } else {
        setIsLoading(false);
      }
    };
    validateLoggedUser();
  }, []);

  const authenticate = async () => {
    try {
      setIsLoading(true);
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;

      const { response, statusCode } = await backendApi.authUser.authenticate({
        token: idToken,
      });

      if (statusCode === 201) {
        await saveCredentials(
          response.accessToken,
          response.refreshToken,
          response.id
        );
      }
      setIsLoading(false);
    } catch (error) {
      await logOut();
    }
  };

  const reAuthenticate = async () => {
    setIsLoading(true);
    const { response, statusCode } = await backendApi.authUser.authenticate({
      token: null,
    });

    if (statusCode === 201) {
      await saveCredentials(
        response.accessToken,
        response.refreshToken,
        response.id
      );
    } else if (statusCode === undefined) {
      try {
        if ((await asyncStorage.getItem("token")) !== null) {
          await refreshToken();
        } else await logOut();
      } catch (e) {
        await logOut();
      }
    }
  };

  const refreshToken = async () => {
    const { response, statusCode } = await backendApi.authUser.refresh(
      await AsyncStorage.getItem("refresh")
    );
    if (statusCode === 201) {
      const userId = await AsyncStorage.getItem("userId");
      await saveCredentials(
        response.accessToken,
        response.refreshToken,
        userId
      );
    } else {
      await logOut();
    }
  };

  const logOut = async () => {
    await clearAsyncStorage();
    await GoogleSignin.signOut();
    setIsLoading(false);
  };

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  const saveCredentials = async (accessToken, refreshToken, userId) => {
    navigation.replace("Home");
    await AsyncStorage.setItem("token", accessToken);
    await AsyncStorage.setItem("refresh", refreshToken);
    await AsyncStorage.setItem("userId", JSON.stringify(userId));
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <DismissKeyboard>
        <Block flex style={{ justifyContent: "flex-end", marginTop: "auto" }}>
          <StatusBar hidden />
          <ImageBackground
            source={Images.LoginBackground}
            style={{ width, height, zIndex: 1 }}
          >
            <Block
              style={{
                width,
                height: height * 0.8,
                justifyContent: "flex-end",
                marginBottom: 20,
              }}
              middle
            >
              <Block style={styles.loginContainer}>
                <Block flex space="between">
                  <Block flex={1} middle style={styles.socialConnect}>
                    <Block flex={0.6} middle>
                      <Text color="#8898AA" size={16}>
                        Login & Sign Up
                      </Text>
                    </Block>
                    <Block flex={0.4} row style={{ marginBottom: 18 }}>
                      <Button
                        style={{ ...styles.socialButtons }}
                        onPress={authenticate}
                      >
                        <Block
                          row
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/imgs/g_icon.png")}
                            style={{
                              height: 30,
                              width: 30,
                              marginTop: 2,
                              marginRight: 5,
                            }}
                          />
                          <Text style={styles.socialTextButtons}>
                            Continue with Google
                          </Text>
                        </Block>
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
      <LoadingScreen visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: yummlyTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: yummlyTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)",
  },
  socialButtons: {
    width: 200,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    shadowColor: yummlyTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    maxWidth: 400,
    transition: "background-color .218s, border-color .218s, box-shadow .218s",
  },
  socialTextButtons: {
    color: "#1f1f1f",
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
});

export default Login;
