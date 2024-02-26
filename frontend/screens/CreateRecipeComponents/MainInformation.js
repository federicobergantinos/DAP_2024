import { openImagePickerAsync } from "../../components/ImagePicker.js";
import React from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from "react-native";
import { Block, Text } from "galio-framework";

import { yummlyTheme } from "../../constants/index.js";
import Icon from "../../components/Icon.js";
import Input from "../../components/Input.js";
import styles from "./CreateRecipeStyles.js";
import backendApi from "../../api/backendGateway";

export default renderMainInformation = ({
  images,
  title,
  description,
  video,
  active,
  onUpdate,
}) => {
  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onUpdate({ images: newImages });
  };

  const getImageSource = (item) => {
    // Intenta acceder a item.uri, si falla (porque item no es un objeto o no tiene .uri), usa item directamente
    try {
      if (item.uri && typeof item.uri === "string") {
        return { uri: item.uri };
      }
    } catch (error) {}
    return { uri: item };
  };

  const renderThumbnailItem = ({ item, index }) => {
    const imageSource = getImageSource(item);

    return (
      <View style={{ marginRight: 10, position: "relative", marginTop: 10 }}>
        <Image
          source={imageSource}
          style={{ width: 75, height: 75, borderRadius: 5 }}
        />
        <TouchableOpacity
          onPress={() => handleDeleteImage(index)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "grey",
            borderRadius: 15,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="cross"
            family="Entypo"
            size={20}
            color={yummlyTheme.COLORS.ICON}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleImagePicked = async () => {
    try {
      const newImage = await openImagePickerAsync();
      if (newImage) {
        try {
          const response = await backendApi.recipesGateway.uploadImage({
            image: newImage.base64,
          });
          if (response.statusCode === 200) {
            onUpdate((prevState) => {
              const imageUrl = response.response.images;
              const imageAlreadyExists = prevState.images.some(
                (image) => image === imageUrl
              );
              if (!imageAlreadyExists) {
                // Aquí actualizamos el estado para incluir la URL en lugar de la base64
                return { images: [...prevState.images, imageUrl] };
              } else {
                alert("Esta imagen ya ha sido seleccionada.");
                return {};
              }
            });
          }
        } catch (error) {
          console.error("Error al subir la imagen:", error);
        }
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
      alert("No se pudo seleccionar la imagen.");
    }
  };

  return (
    <Block flex style={styles.CreateRecipeCard}>
      <Block style={styles.info}>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            images && images.length > 0 ? styles.uploadContainerSuccess : {},
          ]} // Se aplica el estilo de éxito si hay imágenes seleccionadas
          onPress={() => handleImagePicked()}
        >
          <Block
            middle
            row
            space="evenly"
            style={[
              styles.uploadContainer,
              images && images.length > 0 ? styles.uploadContainerSuccess : {},
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
        <FlatList
          data={images}
          horizontal
          renderItem={renderThumbnailItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
          value={title}
          onChangeText={(text) => onUpdate({ title: text })}
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
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
          value={description}
          onChangeText={(text) => onUpdate({ description: text })}
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
          value={video}
          onChangeText={(text) => onUpdate({ video: text })}
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.search, active ? styles.shadow : null]}
          placeholder="www.youtube.com"
        />
      </Block>
    </Block>
  );
};
