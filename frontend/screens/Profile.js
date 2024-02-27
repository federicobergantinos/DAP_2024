import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Header } from "../components";
import { Images, yummlyTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { openImagePickerAsync } from "../components/ImagePicker.js";
import { useNavigation } from "@react-navigation/native";
import backendApi from "../api/backendGateway";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [recipesCount, setRecipesCount] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const handleImagePicked = async () => {
    try {
      const newImage = await openImagePickerAsync();
      if (newImage) {
        try {
          const response = await backendApi.recipesGateway.uploadImage({
            image: newImage.base64,
          });
          if (response.statusCode === 200) {
            const imageUrl = response.response.images;
            console.log(imageUrl);
            return imageUrl; // Devolvemos la URL de la imagen subida
          }
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          alert("No se pudo subir la imagen.");
        }
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
      alert("No se pudo seleccionar la imagen.");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Obtener el userId una sola vez
        const storedUserId = await AsyncStorage.getItem("userId");
        const { response, statusCode } =
          await backendApi.users.getUser(storedUserId);
        console.log(response.user);
        setUserId(storedUserId); // Almacenar userId en el estado
        setUserInfo(response.user); // Almacenar userId en el estado

        // Llamadas a la API pueden ser movidas aquí si dependen de userId
        // Asegúrate de verificar que userId no sea null antes de hacer las llamadas
      } catch (error) {
        console.error("Error inicializando el perfil:", error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return; // Asegurar que userId esté disponible
      try {
        const response = await backendApi.users.favorites(userId);
        setFavorites(response.response.favorites);
        setFavoritesCount(response.response.favorites.length);
      } catch (error) {
        console.error("Error al obtener los favoritos", error);
      }
    };

    const fetchRecipes = async () => {
      if (!userId) return; // Asegurar que userId esté disponible
      try {
        const page = 1;
        const { response: recipes } = await backendApi.recipesGateway.getAll(
          page,
          "",
          userId
        );
        setRecipes(recipes);
        setRecipesCount(recipes.length);
      } catch (error) {
        console.error("Error al obtener las recetas", error);
      }
    };

    if (userId) {
      fetchFavorites();
      fetchRecipes();
    }
  }, [userId]);

  const navigateToRecipe = (recipeId) => {
    navigation.navigate("Recipe", {
      recipeId: recipeId,
    });
  };

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.Background}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                {userInfo && (
                  <Image
                    source={{ uri: userInfo.photoUrl }}
                    style={styles.avatar}
                  />
                )}
                <View style={styles.parent}>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={handleImagePicked}
                  >
                    <Text>Adjuntar Imagen</Text>
                  </TouchableOpacity>
                  <Text> </Text>
                </View>
              </Block>
              <Block style={styles.info}>
                <Block middle style={styles.nameInfo}>
                  <Text
                    style={{ fontFamily: "open-sans-regular" }}
                    size={24}
                    color="#32325D"
                  >
                    {userInfo
                      ? `${userInfo.name} ${userInfo.surname}`
                      : "Cargando..."}
                  </Text>
                </Block>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 5, paddingBottom: 24 }}
                ></Block>
                <Block row space="evenly">
                  <Block middle>
                    <Text
                      size={18}
                      color="#525F7F"
                      style={{
                        marginBottom: 4,
                        fontFamily: "open-sans-bold",
                      }}
                    >
                      {recipesCount}
                    </Text>
                    <Text
                      style={{ fontFamily: "open-sans-regular" }}
                      size={12}
                      color={yummlyTheme.COLORS.TEXT}
                    >
                      Recetas
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      color="#525F7F"
                      size={18}
                      style={{
                        marginBottom: 4,
                        fontFamily: "open-sans-bold",
                      }}
                    >
                      {favoritesCount}
                    </Text>
                    <Text
                      style={{ fontFamily: "open-sans-regular" }}
                      size={12}
                      color={yummlyTheme.COLORS.TEXT}
                    >
                      Favoritos
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block row style={{ paddingVertical: 14 }} space="between">
                  <Text bold size={16} color="#525F7F" style={{ marginTop: 3 }}>
                    Mis Recetas
                  </Text>
                  {recipesCount > 6 && (
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 14 }}
                      onPress={() => {
                        navigation.navigate("ProfileRecetas"); // Asegúrate de tener esta pantalla para mostrar todos los favoritos
                      }}
                    >
                      Ver más
                    </Button>
                  )}
                </Block>

                {recipesCount > 0 ? (
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block
                      row
                      space="between"
                      style={styles.favoritesContainer}
                    >
                      {recipes.slice(0, 6).map((recipe) => (
                        <TouchableOpacity
                          key={recipe.id}
                          onPress={() => navigateToRecipe(recipe.id)}
                        >
                          <Image
                            source={{ uri: recipe.media }}
                            style={styles.thumb}
                          />
                        </TouchableOpacity>
                      ))}
                    </Block>
                  </Block>
                ) : (
                  <Text style={{ alignSelf: "center", marginTop: 20 }}>
                    Sin recetas
                  </Text>
                )}
              </Block>

              <Block flex>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block row style={{ paddingVertical: 14 }} space="between">
                  <Text bold size={16} color="#525F7F" style={{ marginTop: 3 }}>
                    Mis Favoritos
                  </Text>
                  {favoritesCount > 6 && (
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 14 }}
                      onPress={() => {
                        navigation.navigate("ProfileFavoritos"); // Asegúrate de tener esta pantalla para mostrar todos los favoritos
                      }}
                    >
                      Ver más
                    </Button>
                  )}
                </Block>

                {favoritesCount > 0 ? (
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block
                      row
                      space="between"
                      style={styles.favoritesContainer}
                    >
                      {favorites.slice(0, 6).map((favorite) => (
                        <TouchableOpacity
                          key={favorite.id}
                          onPress={() => navigateToRecipe(favorite.id)}
                        >
                          <Image
                            source={{ uri: favorite.media[0].data }}
                            style={styles.thumb}
                          />
                        </TouchableOpacity>
                      ))}
                    </Block>
                  </Block>
                ) : (
                  <Text style={{ alignSelf: "center", marginTop: 20 }}>
                    Sin favoritos
                  </Text>
                )}
              </Block>
            </Block>
            <Block style={{ marginBottom: 25 }} />
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 1.5,
    top: height / 10,
  },
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 100,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    backgroundColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  avatarInterno: {
    width: 248,
    height: 248,
    borderRadius: 62,
    borderWidth: 0,
    top: 200,
  },

  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 4,
    marginBottom: 4,
    marginRight: 4,
  },
  // Asegúrate de que el bloque que contiene las miniaturas tenga `flexWrap: 'wrap'`
  favoritesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Ajusta esto para cambiar la alineación si es necesario
    // Otros estilos que puedas necesitar para este contenedor
  },
  container: {
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 120,
    height: 45,
  },
  containerInterno: {
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 140,
    height: 45,
    top: 220,
  },
  editarPerfilPopup: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  editarPerfilPopupInterno: {
    backgroundColor: "000000aa",
    alignItems: "center",
  },
});
