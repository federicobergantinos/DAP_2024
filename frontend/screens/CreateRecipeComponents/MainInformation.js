import { openImagePickerAsync } from "../../components/ImagePicker.js";
import React from "react";
import { TouchableOpacity, FlatList, View, Image } from "react-native";
import { Block, Text } from "galio-framework";

import { yummlyTheme } from "../../constants/index.js";
import Icon from "../../components/Icon.js";
import Input from "../../components/Input.js";
import styles from "./CreateRecipeStyles.js";

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

  const renderThumbnailItem = ({ item, index }) => (
    <View style={{ marginRight: 10, position: "relative", marginTop: 10 }}>
      <Image
        source={{ uri: item.uri }}
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

  handleImagePicked = async () => {
    try {
      const newImage = await openImagePickerAsync();
      if (newImage) {
        onUpdate((prevState) => {
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
