import { openImagePickerAsync } from "../../components/ImagePicker.js";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Block, Text } from "galio-framework";

import { yummlyTheme } from "../../constants/index.js";
import Icon from "../../components/Icon.js";
import Input from "../../components/Input.js";
import styles from "./CreateRecipeStyles.js";

renderPasos = ({ steps, onUpdate }) => {
  addPaso = () => {
    onUpdate((prevState) => ({
      steps: [...prevState.steps, ""],
    }));
  };

  removePaso = (indexToRemove) => {
    onUpdate((prevState) => ({
      steps: prevState.steps.filter((_, index) => index !== indexToRemove),
    }));
  };

  handlePasoChange = (text, index) => {
    const newPasos = [...steps];
    newPasos[index] = text;
    onUpdate({ steps: newPasos });
  };

  return (
    <Block flex style={styles.CreateRecipeCard}>
      <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
        Pasos
      </Text>
      {steps.map((paso, index) => (
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
            onChangeText={(text) => handlePasoChange(text, index)}
            placeholder={`Paso ${index + 1}`}
          />
          <TouchableOpacity
            style={styles.addButton} // Reutiliza o ajusta según sea necesario
            onPress={() => removePaso(index)}
          >
            <Icon
              name="minus"
              family="AntDesign"
              size={24}
              color={yummlyTheme.COLORS.ICON}
            />
          </TouchableOpacity>
          {index === steps.length - 1 && (
            <TouchableOpacity style={styles.addButton} onPress={addPaso}>
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

export default renderPasos;
