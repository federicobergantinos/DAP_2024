import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Modal,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Header } from "../components";
import { Images, yummlyTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { openImagePickerAsync, openCameraAsync } from '../components/ImagePicker.js';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;



class Profile extends React.Component {
  constructor()
  {
    super();
    this.state={
      show:false
    }
  }
  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={ Images.ProfilePicture }
                    style={styles.avatar}
                    size={40}
                  />
                  <TouchableOpacity
                    style={styles.container}
                    onPress={()=>{this.setState({show:true})}}
                  >
                    <Text>Editar Perfil</Text>
                  </TouchableOpacity>
                </Block>
                <Modal
                  transparent={true}
                  visible={this.state.show}
                >
                  <View style={styles.editarPerfilPopup}>
                    <View style={styles.editarPerfilPopupInterno}>
                      <Image
                        source={Images.ProfilePicture}
                        style={styles.avatarInterno}
                        size={40}
                      />
                      <TouchableOpacity
                        style={styles.containerInterno}
                        onPress={() => { openImagePickerAsync /* VER PQ NO ANDA */ , this.setState({ show: false }) }}
                      >
                        <Text>Adjuntar Imagen</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <Block style={styles.info}>
                  <Block middle style={styles.nameInfo}>                  
                    <Text style={{ fontFamily: 'open-sans-regular' }} size={28} color="#32325D">
                      Matias Caliz
                    </Text>
                  </Block>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 5, paddingBottom: 24 }}
                  >
                  </Block>
                  <Block row space="evenly">
                    <Block middle>
                      <Text
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4, fontFamily: 'open-sans-bold' }}
                      >
                        13
                      </Text>
                      <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={yummlyTheme.COLORS.TEXT}>Recetas</Text>
                    </Block>
                    <Block middle>
                      <Text
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'open-sans-bold' }}
                      >
                        504
                      </Text>
                      <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={yummlyTheme.COLORS.TEXT}>Favoritos</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14 }}
                    space="between"
                  >
                    <Text bold size={16} color="#525F7F" style={{ marginTop: 3 }}>
                      Mis Recetas
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 14 }}
                      onPress={() => { this.props.navigation.navigate('ProfileRecetasDrawer') }}
                    >
                      Ver más
                    </Button>
                  </Block>
              
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    </Block>
                  </Block>
                </Block>

                <Block flex>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14 }}
                    space="between"
                  >
                    <Text bold size={16} color="#525F7F" style={{ marginTop: 3 }}>
                      Mis Favoritos
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 14 }}
                      onPress={() => { this.props.navigation.navigate('ProfileFavoritosDrawer') }}
                    >
                      Ver más
                    </Button>
                  </Block>


                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    </Block>
                  </Block>
                </Block>
              </Block>
              <Block style={{ marginBottom: 25 }}/>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height - height / 10,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2,
    top: height / 10
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  avatarInterno: {
    width: 248,
    height: 248,
    borderRadius: 62,
    borderWidth: 0,
    top: 200
  },

  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  container: {
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 120,
    height: 45
  },
  containerInterno: {
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 140,
    height: 45,
    top: 220
  },
  editarPerfilPopup: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  editarPerfilPopupInterno: {
    backgroundColor: "000000aa",
    alignItems: "center"
  },
});

export default Profile;
