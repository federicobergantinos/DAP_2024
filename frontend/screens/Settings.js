import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Switch } from "../components";
import yummlyTheme from "../constants/Theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import backendGateway from "../api/backendGateway";
import backendApi from "../api/backendGateway";

const { width } = Dimensions.get("window");

export default function Settings() {
  const navigation = useNavigation();
  const logOut = async () => {
    await AsyncStorage.clear();
    await GoogleSignin.signOut();
    navigation.navigate("Login");
  };

  const deleteAccount = async () => {
    await AsyncStorage.clear();
    await backendGateway.authUser.deleteCredential();
    navigation.navigate("Login");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const { response, statusCode } =
          await backendGateway.users.getUser(userId);
        this.state = {
          nombre: response.user.name,
          apellido: response.user.surname,
          email: response.user.email,
        };
      } catch (error) {
        console.error("Error al obtener usuario");
        navigation.replace("Home");
      }
    };
    getUser();
  }, []);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "deleteAccount":
        return (
          <TouchableOpacity onPress={deleteAccount}>
            <View style={styles.deleteButton}>
              <Text style={{ color: "red" }}>Eliminar Cuenta</Text>
            </View>
          </TouchableOpacity>
        );
      case "nameInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text
              style={{ fontFamily: "open-sans-regular" }}
              size={14}
              color="#525F7F"
            >
              {item.title}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ nombre: text })}
              value={this.state.nombre}
              placeholder={item.title}
              placeholderTextColor="#BFBFBF"
            />
          </Block>
        );
      case "lastNameInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text
              style={{ fontFamily: "open-sans-regular" }}
              size={14}
              color="#525F7F"
            >
              {item.title}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ apellido: text })}
              value={this.state.apellido}
              placeholder={item.title}
              placeholderTextColor="#BFBFBF"
            />
          </Block>
        );
      case "mailInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text
              style={{ fontFamily: "open-sans-regular" }}
              size={14}
              color="#525F7F"
            >
              {item.title}
            </Text>
            <TextInput
              style={[styles.inputContainer, { color: "#BFBFBF" }]}
              value={this.state.email}
              editable={false}
            />
          </Block>
        );
      case "logout":
        return (
          <TouchableOpacity onPress={logOut}>
            <View style={styles.logoutButton}>
              <Text style={{ color: "red" }}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        break;
    }
  };

  const recommended = [
    { title: "Nombre", id: "nombre", type: "nameInput" },
    { title: "Apellido", id: "apellido", type: "lastNameInput" },
    { title: "Mail", id: "mail", type: "mailInput" },
    { title: "Cerrar Sesión", id: "sesion", type: "logout" },
  ];

  const payment = [
    { title: "Eliminar Cuenta", id: "delete", type: "deleteAccount" },
  ];

  return (
    <View style={styles.container}>
      <Block center style={styles.title}>
        <Text
          style={{ fontFamily: "open-sans", paddingBottom: 5 }}
          size={theme.SIZES.BASE}
          color={yummlyTheme.COLORS.TEXT}
        >
          Configuración Recomendada
        </Text>
      </Block>
      <FlatList
        data={recommended}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
      <Block center style={styles.title}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            paddingBottom: 10,
            color: "red",
          }}
          size={theme.SIZES.BASE}
          color={yummlyTheme.COLORS.TEXT}
        >
          Danger Zone
        </Text>
      </Block>
      <FlatList
        data={payment}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: width - theme.SIZES.BASE * 2,
    alignSelf: "center",
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  input: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    marginRight: 10,
    width: "70%",
    flexShrink: 1,
    borderWidth: 1,
    borderColor: "gray",
  },
  inputContainer: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "gray",
    marginRight: 10,
    width: "70%",
    flexShrink: 1,
    borderWidth: 1,
    borderColor: "gray",
  },
  logoutButton: {
    paddingHorizontal: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "red",
    marginLeft: 10,
  },
  deleteButton: {
    paddingHorizontal: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "red",
    marginLeft: 10,
  },
});
