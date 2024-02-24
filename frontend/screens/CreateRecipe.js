import React from "react";
import {
  FlatList,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Block, Text } from "galio-framework";
import { Images, yummlyTheme } from "../constants";
import backendApi from "../api/backendGateway";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  renderMainInformation,
  styles,
  renderDescripcionNutricional,
  renderDescripcionPlato,
  renderPasos,
  renderTags,
  renderIngredientes,
} from "./CreateRecipeComponents/index.js";

class CreateRecipe extends React.Component {
  state = {
    selectedTags: [],
    isMultiSelectOpen: false,
    ingredientes: [""],
    pasos: [""],
    title: "",
    description: "",
    preparationTime: null,
    images: [],
    servingCount: null,
    calories: null,
    proteins: null,
    totalFats: null,
    video: "",
    isLoading: false,
    recipeId: null,
  };
  // TODO
  // state = {
  //   selectedTags: ["RAPID_PREPARATION"], // Asume que "1" es un ID válido para un tag existente
  //   isMultiSelectOpen: false,
  //   ingredientes: ["Pan de papa", "Carne picada", "Chedar"],
  //   pasos: ["Cortar el pan", "Cocinar las hamburgesas", "Poner el chedar"],
  //   title: "Hamburgesa Crispy",
  //   description: "Una de las hambursas mas ricas que hay, una delicia.",
  //   preparationTime: "20",
  //   images: [],
  //   servingCount: 1,
  //   calories: 500,
  //   proteins: 30.5,
  //   totalFats: 20.5,
  //   video:
  //     "https://www.youtube.com/watch?v=zfdzfDGc-1k&ab_channel=PaulinaCocina",
  //   recipeId: null,
  //   isLoading: false,
  // };

  componentDidMount() {
    const { route } = this.props;
    if (route.params && route.params.recipeId) {
      this.loadRecipe(route.params.recipeId);
      console.log("route.params.recipeId", route.params.recipeId);
    }
  }

  getAsyncRecipe = async (recipeId) => {
    const { response, statusCode } =
      await backendApi.recipesGateway.getRecipeById(recipeId);
    console.log("STATUS:", statusCode);
    console.log("RESPONSE:", response);
    if (statusCode != 200) {
    }
    return response;
  };

  loadRecipe = async (recipeId) => {
    try {
      const fetchedRecipe = await this.getAsyncRecipe(recipeId);
      if (fetchedRecipe) {
        this.setState({
          ...fetchedRecipe,
          recipeId: recipeId,
        });
      }
      console.log(state);
    } catch (error) {
      console.error("Error al cargar la receta:", error);
      // Manejar el error, por ejemplo, redirigiendo al usuario
    }
  };

  submitRecipe = async () => {
    this.setState({ isLoading: true });
    const userId = await AsyncStorage.getItem("userId");

    const {
      selectedTags,
      ingredientes,
      pasos,
      title,
      description,
      preparationTime,
      servingCount,
      calories,
      proteins,
      totalFats,
      video,
      images,
    } = this.state;

    if (
      !title.trim() ||
      !description.trim() ||
      preparationTime === null ||
      servingCount === null ||
      calories === null ||
      proteins === null ||
      totalFats === null ||
      // images.length === 0 ||
      video === null ||
      ingredientes.some((i) => !i.trim()) ||
      pasos.some((p) => !p.trim())
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const isEditing = !!this.state.recipeId;
    const recipeData = {
      userId: userId,
      title: title,
      description: description,
      ingredients: ingredientes,
      steps: pasos,
      tags: selectedTags,
      video: video,
      images:
        images.length > 0
          ? images.map((img) => `data:image/jpeg;base64,${img.base64}`)
          : [],
      preparationTime: preparationTime,
      servingCount: servingCount,
      calories: calories,
      proteins: proteins,
      totalFats: totalFats,
    };

    if (!isEditing) {
      try {
        const response =
          await backendApi.recipesGateway.createRecipe(recipeData);

        if (response.statusCode === 201) {
          this.props.navigation.replace("Recipe", {
            recipeId: response.response.id,
          });
        } else {
          alert("No se pudo crear la receta. Por favor, inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error al crear la receta:", error);
        alert("Ocurrió un error al intentar crear la receta.");
      } finally {
        this.setState({ isLoading: false }); // Asegura que isLoading se establezca en false después de la operación
      }
    } else {
      // Lógica para crear una nueva receta
    }
  };

  renderButtons = () => {
    if (this.state.isLoading) {
      // Envolver el ActivityIndicator en un View para centrarlo
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size="large" color="#7FFFD4" />
        </View>
      );
    }

    return (
      <Block style={styles.buttonContainer}>
        <Button
          center
          textStyle={{ color: yummlyTheme.COLORS.BLACK }}
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          Cancelar
        </Button>
        <Button
          center
          textStyle={{ color: yummlyTheme.COLORS.BLACK }}
          style={styles.buttonStyle}
          onPress={this.submitRecipe}
        >
          Confirmar
        </Button>
      </Block>
    );
  };

  renderItem = ({ item }) => {
    if (typeof item.render === "function") {
      return item.render();
    } else {
      console.error(`No render method found for item with key ${item.key}`);
      return null;
    }
  };

  updateState = (newState) => {
    this.setState(newState);
  };

  sections = [
    {
      key: "mainInformation",
      render: () =>
        renderMainInformation({
          images: this.state.images,
          title: this.state.title,
          description: this.state.description,
          video: this.state.video,
          active: this.state.active,
          onUpdate: this.updateState,
        }),
    },
    {
      key: "ingredientes",
      render: () =>
        renderIngredientes({
          ingredientes: this.state.ingredientes,
          onUpdate: this.updateState,
        }),
    },
    {
      key: "pasos",
      render: () =>
        renderPasos({
          pasos: this.state.pasos,
          onUpdate: this.updateState,
        }),
    },
    {
      key: "descripcionPlato",
      render: () =>
        renderDescripcionPlato({
          preparationTime: this.state.preparationTime,
          servingCount: this.state.servingCount,
          active: this.state.active,
          onUpdate: this.updateState,
        }),
    },
    {
      key: "descripcionNutricional",
      render: () =>
        renderDescripcionNutricional({
          totalFats: this.state.totalFats,
          proteins: this.state.proteins,
          calories: this.state.calories,
          active: this.state.active,
          onUpdate: this.updateState,
        }),
    },
    {
      key: "tags",
      render: () =>
        renderTags({
          selectedTags: this.state.selectedTags,
          active: this.state.active,
          onUpdate: this.updateState,
        }),
    },
    { key: "buttons", render: () => this.renderButtons() },
  ];

  render() {
    return (
      <Block flex style={styles.CreateRecipe}>
        <Block flex>
          <ImageBackground
            source={Images.Background}
            imageStyle={styles.Background}
          >
            <FlatList
              data={[...this.sections]}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.key}
              ListHeaderComponent={<View style={{ height: 20 }} />}
              ListFooterComponent={<View style={{ height: 20 }} />}
              showsVerticalScrollIndicator={false}
            />
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

export default CreateRecipe;
