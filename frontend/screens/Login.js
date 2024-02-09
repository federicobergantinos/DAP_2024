import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Block, Checkbox, Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, yummlyTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends React.Component {
  render() {
    return (
      <DismissKeyboard>
        <Block flex style={{ justifyContent: 'flex-end', marginTop: 'auto' }}>
          <StatusBar hidden />
          <ImageBackground
            source={Images.LoginBackground}
            style={{ width, height, zIndex: 1 }}
          >
            <Block style={{ width, height: height * 0.8, justifyContent: 'flex-end', marginBottom: 20 }} middle>
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
                      >
                        <Block row>
                          <Icon
                            name="logo-google"
                            family="Ionicon"
                            size={16}
                            color={"black"}
                            style={{ marginTop: 2, marginRight: 5 }}
                          />
                          <Text style={styles.socialTextButtons}>Google</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.3 : height * 0.2,
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
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  }
});

export default Login;
