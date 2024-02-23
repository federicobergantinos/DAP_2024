import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { openImagePickerAsync } from "../components/ImagePicker.js";
import MultiSelect from "react-native-multiple-select";

import { Images, yummlyTheme } from "../constants";
import backendApi from "../api/backendGateway";
import tags from "../constants/tabs";
import Icon from "../components/Icon";
import Input from "../components/Input";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const { width, height } = Dimensions.get("screen");

class CreateRecipe extends React.Component {
  // state = {
  //   selectedTags: [],
  //   isMultiSelectOpen: false,
  //   ingredientes: [""],
  //   pasos: [""],
  //   title: "",
  //   description: "",
  //   preparationTime: null,
  //   images: [],
  //   servingCount: null,
  //   calories: null,
  //   proteins: null,
  //   totalFats: null,
  //   video: "",
  // };
  // TODO
  state = {
    selectedTags: ["RAPID_PREPARATION"], // Asume que "1" es un ID válido para un tag existente
    isMultiSelectOpen: false,
    ingredientes: ["Pan de papa", "Carne picada", "Chedar"],
    pasos: ["Cortar el pan", "Cocinar las hamburgesas", "Poner el chedar"],
    title: "Hamburgesa Crispy",
    description: "Una de las hambursas mas ricas que hay, una delicia.",
    preparationTime: "20",
    images: [],
    servingCount: 1,
    calories: 500,
    proteins: 30.5,
    totalFats: 20.5,
    video:
      "https://www.youtube.com/watch?v=zfdzfDGc-1k&ab_channel=PaulinaCocina",
  };

  onSelectedItemsChange = (selectedTags) => {
    this.setState({ selectedTags });
  };

  toggleMultiSelect = (isOpen) => {
    this.setState({ isMultiSelectOpen: isOpen });
  };

  handleImagePicked = async () => {
    try {
      const newImage = await openImagePickerAsync();
      if (newImage) {
        this.setState((prevState) => {
          // Verificar si la imagen ya está en el array comparando la cadena base64
          const imageAlreadyExists = prevState.images.some(
            (image) => image.base64 === newImage.base64
          );

          if (!imageAlreadyExists) {
            // Si la imagen no existe, añadirla al array
            return { images: [...prevState.images, newImage] };
          } else {
            // Opcional: Mostrar un mensaje indicando que la imagen ya está seleccionada
            alert("Esta imagen ya ha sido seleccionada.");
            return {}; // No actualizar el estado si la imagen ya existe
          }
        });
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
      alert("No se pudo seleccionar la imagen.");
    }
  };

  renderMainInformation = () => {
    const { images } = this.state;

    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Block style={styles.info}>
          <TouchableOpacity
            style={[
              styles.uploadButton,
              images && images.length > 0 ? styles.uploadContainerSuccess : {},
            ]} // Se aplica el estilo de éxito si hay imágenes seleccionadas
            onPress={() => this.handleImagePicked(true)} // Asegúrate de llamar a handleImagePicked correctamente para la selección múltiple
          >
            <Block
              middle
              row
              space="evenly"
              style={[
                styles.uploadContainer,
                images && images.length > 0
                  ? styles.uploadContainerSuccess
                  : {},
              ]}
            >
              {images && images.length > 0 ? (
                <>
                  <Icon
                    name="check"
                    family="AntDesign"
                    size={30}
                    color={yummlyTheme.COLORS.SUCCESS}
                  />
                  <Text bold size={14} style={[styles.textWhite]}>
                    {images.length} Imagen(es) seleccionada(s)
                  </Text>
                </>
              ) : (
                <>
                  <Icon
                    name="camera"
                    family="Entypo"
                    size={30}
                    color={yummlyTheme.COLORS.ICON}
                    padding={10}
                  />
                  <Text bold size={14} color={yummlyTheme.COLORS.HEADER}>
                    Añade una foto
                  </Text>
                </>
              )}
            </Block>
          </TouchableOpacity>
        </Block>
        <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
          <Block style={styles.divider} />
        </Block>

        <Block>
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Titulo
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.title}
            onChangeText={(text) => this.setState({ title: text })}
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="Agrega un titulo que llame la atención!"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Descripción
          </Text>
          <Input
            right
            multiline
            color="black"
            autoFocus={false}
            autoCorrect={false}
            value={this.state.description}
            onChangeText={(text) => this.setState({ description: text })}
            autoCapitalize="none"
            iconContent={<Block />}
            style={{
              alignItems: "start",
              padding: 5,
              height: 100,
            }}
            placeholder="Comparte un poco más acerca de este plato. Qué o quién te inspiró a cocinarlo? Qué lo hace especial para ti?"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Video
          </Text>
          <Input
            right
            color="black"
            value={this.state.video}
            onChangeText={(text) => this.setState({ video: text })}
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="www.youtube.com"
          />
        </Block>
      </Block>
    );
  };

  renderDescripcionPlato = () => {
    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Block>
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Porciones
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={
              this.state.servingCount ? this.state.servingCount.toString() : ""
            }
            onChangeText={(text) =>
              this.setState({ servingCount: text ? parseInt(text) : null })
            }
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="Cuantas personas pueden comer?"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Tiempo de elaboración
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={
              this.state.preparationTime
                ? this.state.preparationTime.toString()
                : ""
            }
            onChangeText={(text) =>
              this.setState({ preparationTime: text ? parseInt(text) : null })
            }
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="Agrega el tiempo en minutos!"
          />
        </Block>
      </Block>
    );
  };

  renderDescripcionNutricional = () => {
    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Block>
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Calorias
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={this.state.calories ? this.state.calories.toString() : ""}
            onChangeText={(text) =>
              this.setState({ calories: text ? parseInt(text) : null })
            }
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder=""
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Proteinas
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={this.state.proteins ? this.state.proteins.toString() : ""}
            onChangeText={(text) =>
              this.setState({ proteins: text ? parseInt(text) : null })
            }
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder=""
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Grasas totales
          </Text>
          <Input
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={this.state.totalFats ? this.state.totalFats.toString() : ""}
            onChangeText={(text) =>
              this.setState({ totalFats: text ? parseInt(text) : null })
            }
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder=""
          />
        </Block>
      </Block>
    );
  };

  addIngrediente = () => {
    this.setState((prevState) => ({
      ingredientes: [...prevState.ingredientes, ""], // Añade un nuevo ingrediente vacío
    }));
  };

  handleIngredienteChange = (text, index) => {
    const newIngredientes = [...this.state.ingredientes];
    newIngredientes[index] = text;
    this.setState({ ingredientes: newIngredientes });
  };

  removeIngrediente = (indexToRemove) => {
    this.setState((prevState) => ({
      ingredientes: prevState.ingredientes.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  renderIngredientes = () => {
    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Ingredientes
        </Text>
        {this.state.ingredientes.map((ingrediente, index) => (
          <Block
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Input
              right
              color="black"
              autoFocus={false}
              autoCorrect={false}
              autoCapitalize="none"
              iconContent={<Block />}
              style={styles.input}
              value={ingrediente}
              onChangeText={(text) => this.handleIngredienteChange(text, index)}
              placeholder="Ingresa un ingrediente"
            />
            <TouchableOpacity
              style={styles.addButton} // Asegúrate de definir este estilo
              onPress={() => this.removeIngrediente(index)}
            >
              <Icon
                name="minus"
                family="AntDesign"
                size={24}
                color={yummlyTheme.COLORS.ICON}
              />
            </TouchableOpacity>
            {index === this.state.ingredientes.length - 1 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={this.addIngrediente}
              >
                <Icon
                  name="plus"
                  family="AntDesign"
                  size={24}
                  color={yummlyTheme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
          </Block>
        ))}
      </Block>
    );
  };

  addPaso = () => {
    this.setState((prevState) => ({
      pasos: [...prevState.pasos, ""],
    }));
  };

  removePaso = (indexToRemove) => {
    this.setState((prevState) => ({
      pasos: prevState.pasos.filter((_, index) => index !== indexToRemove),
    }));
  };

  handlePasoChange = (text, index) => {
    const newPasos = [...this.state.pasos];
    newPasos[index] = text;
    this.setState({ pasos: newPasos });
  };

  submitRecipe = async () => {
    // const userId = await AsyncStorage.getItem("userId");
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
      images.length === 0 ||
      video === null ||
      ingredientes.some((i) => !i.trim()) ||
      pasos.some((p) => !p.trim())
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

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

    try {
      const response = await backendApi.recipesGateway.createRecipe(recipeData);

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
    }
  };

  renderPasos = () => {
    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Pasos
        </Text>
        {this.state.pasos.map((paso, index) => (
          <Block
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Input
              right
              color="black"
              autoFocus={false}
              autoCorrect={false}
              iconContent={<Block />}
              autoCapitalize="none"
              style={styles.input}
              value={paso}
              onChangeText={(text) => this.handlePasoChange(text, index)}
              placeholder={`Paso ${index + 1}`}
            />
            <TouchableOpacity
              style={styles.addButton} // Reutiliza o ajusta según sea necesario
              onPress={() => this.removePaso(index)}
            >
              <Icon
                name="minus"
                family="AntDesign"
                size={24}
                color={yummlyTheme.COLORS.ICON}
              />
            </TouchableOpacity>
            {index === this.state.pasos.length - 1 && (
              <TouchableOpacity style={styles.addButton} onPress={this.addPaso}>
                <Icon
                  name="plus"
                  family="AntDesign"
                  size={24}
                  color={yummlyTheme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
          </Block>
        ))}
      </Block>
    );
  };

  renderTags = () => {
    const { selectedTags } = this.state;

    return (
      <Block style={styles.CreateRecipeCard}>
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Tags
        </Text>
        <MultiSelect
          hideTags
          items={tags.tags}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedTags}
          selectText="Aplicá los Tags"
          searchInputPlaceholderText="Buscar los Tags..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="title"
          onToggleList={this.toggleMultiSelect}
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Confirmar"
        />
        {this.renderSelectedTags()}
      </Block>
    );
  };

  renderButtons = () => {
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

  sections = [
    { key: "mainInformation", render: () => this.renderMainInformation() },
    { key: "ingredientes", render: () => this.renderIngredientes() },
    { key: "pasos", render: () => this.renderPasos() },
    { key: "descripcionPlato", render: () => this.renderDescripcionPlato() },
    {
      key: "descripcionNutricional",
      render: () => this.renderDescripcionNutricional(),
    },
    { key: "tags", render: () => this.renderTags() },
    { key: "buttons", render: () => this.renderButtons() },
  ];

  renderSelectedTags() {
    return (
      <View style={styles.tagsContainer}>
        {this.state.selectedTags.map((id) => (
          <View key={id} style={styles.tag}>
            <Text style={styles.tagText}>
              {tags.tags.find((tag) => tag.id === id).title}
            </Text>
            <TouchableOpacity onPress={() => this.removeTag(id)}>
              <Icon
                name="cross"
                family="Entypo"
                size={20}
                color={yummlyTheme.COLORS.ICON}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  removeTag = (id) => {
    this.setState((prevState) => ({
      selectedTags: prevState.selectedTags.filter((tagId) => tagId !== id),
    }));
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  CreateRecipe: {
    marginTop: 0,
  },
  Background: {
    width: width,
    height: height * 1.1,
  },
  CreateRecipeCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  image: {
    paddingHorizontal: 40,
  },
  uploadButton: {
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
    height: height / 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 15,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: theme.SIZES.BASE,
  },
  buttonStyle: {
    backgroundColor: yummlyTheme.COLORS.WHITE,
    color: yummlyTheme.COLORS.PRIMARY,
    marginRight: 10,
    marginLeft: 10,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
  },
  tagText: {
    fontSize: 12,
    marginRight: 4,
  },
  input: {
    flex: 1,
    padding: 5,
    width: width * 0.61,
    height: 40,
  },
  addButton: {
    borderWidth: 1,
    borderColor: yummlyTheme.COLORS.INPUT,
    alignItems: "center",
    marginLeft: 5,
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: yummlyTheme.COLORS.WHITE,
    borderRadius: 5,
  },
});

export default CreateRecipe;
