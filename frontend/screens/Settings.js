import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, View, TextInput, Dimensions } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Switch } from "../components";
import yummlyTheme from "../constants/Theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default class Settings extends React.Component {
  state = {
    nombre: "",
    apellido: "",
    mail: "",
  };

  toggleSwitch = (switchNumber) =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const logOut = async () => {
      await AsyncStorage.clear();
      await GoogleSignin.signOut();
    };

    switch (item.type) {
      case "deleteAccount":
        return (
          <TouchableOpacity onPress={() => {/* Lógica para eliminar la cuenta */}}>
            <View style={styles.deleteButton}>
              <Text style={{ color: 'red' }}>Eliminar Cuenta</Text>
            </View>
          </TouchableOpacity>
        );

      case "nameInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={14} color="#525F7F">{item.title}</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ nombre: text })}
              value={this.state.nombre}
              placeholder={item.title}
              placeholderTextColor="#BFBFBF"
            />
          </Block>
        );
      case "lastNameInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={14} color="#525F7F">{item.title}</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ apellido: text })}
              value={this.state.apellido}
              placeholder={item.title}
              placeholderTextColor="#BFBFBF"
            />
          </Block>
        );
      case "mailInput":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'open-sans-regular' }} size={14} color="#525F7F">{item.title}</Text>
            <TextInput
              style={[styles.inputContainer, { color: '#BFBFBF' }]}
              //value={this.state.email}
              value={'test@gmail.com'}
              editable={false}
            />
          </Block>
        );
      case "logout":
        return (
          <TouchableOpacity onPress={() => { logOut() }}>
            <View style={styles.logoutButton}>
              <Text style={{ color: 'red' }}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        break;
    }
  };

  render() {
    const recommended = [
      { title: "Nombre", id: "nombre", type: "nameInput" },
      { title: "Apellido", id: "apellido", type: "lastNameInput" },
      { title: "Mail", id: "mail", type: "mailInput" },
      { title: "Cerrar Sesión", id: "sesion", type: "logout" }
    ];

    const payment = [
      { title: "Eliminar Cuenta", id: "delete", type: "deleteAccount" },
    ];

    return (
      <View style={styles.container}>
        <Block center style={styles.title}>
          <Text style={{ fontFamily: 'open-sans', paddingBottom: 5 }} size={theme.SIZES.BASE} color={yummlyTheme.COLORS.TEXT}>
            Configuración Recomendada
          </Text>
        </Block>
        <FlatList
          data={recommended}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          style={styles.list}
        />
        <Block center style={styles.title}>
          <Text style={{ fontFamily: 'open-sans-bold', paddingBottom: 10, color: 'red' }} size={theme.SIZES.BASE} color={yummlyTheme.COLORS.TEXT}>
            Danger Zone
          </Text>
        </Block>
        <FlatList
          data={payment}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: width - theme.SIZES.BASE * 2,
    alignSelf: 'center',
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  },
  input: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,
    width: '70%',
    flexShrink: 1,
    borderWidth: 1,
    borderColor: 'gray',
  },
  inputContainer: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginRight: 10,
    width: '70%',
    flexShrink: 1,
    borderWidth: 1,
    borderColor: 'gray',
  },
  logoutButton: {
    paddingHorizontal: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'red',
    marginLeft: 10
  },
  deleteButton: {
    paddingHorizontal: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'red',
    marginLeft: 10
  },
});
