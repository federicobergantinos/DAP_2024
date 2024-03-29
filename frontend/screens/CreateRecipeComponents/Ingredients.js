import { openImagePickerAsync } from "../../components/ImagePicker.js";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Block, Text } from "galio-framework";

import { yummlyTheme } from "../../constants/index.js";
import Icon from "../../components/Icon.js";
import Input from "../../components/Input.js";
import styles from "./CreateRecipeStyles.js";

export default renderIngredientes = ({ ingredients, onUpdate }) => {
  addIngrediente = () => {
    onUpdate((prevState) => ({
      ingredients: [...prevState.ingredients, ""],
    }));
  };

  handleIngredienteChange = (text, index) => {
    const newIngredientes = [...ingredients];
    newIngredientes[index] = text;
    onUpdate({ ingredients: newIngredientes });
  };

  removeIngrediente = (indexToRemove) => {
    onUpdate((prevState) => ({
      ingredients: prevState.ingredients.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  return (
    <Block flex style={styles.CreateRecipeCard}>
      <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
        Ingredientes
      </Text>
      {ingredients.map((ingrediente, index) => (
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
            onChangeText={(text) => handleIngredienteChange(text, index)}
            placeholder="Ingresa un ingrediente"
          />
          <TouchableOpacity
            style={styles.addButton} // Asegúrate de definir este estilo
            onPress={() => removeIngrediente(index)}
          >
            <Icon
              name="minus"
              family="AntDesign"
              size={24}
              color={yummlyTheme.COLORS.ICON}
            />
          </TouchableOpacity>
          {index === ingredients.length - 1 && (
            <TouchableOpacity style={styles.addButton} onPress={addIngrediente}>
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
