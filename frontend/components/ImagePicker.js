import * as ImagePicker from "expo-image-picker";

// Función para abrir la biblioteca de imágenes
export const openImagePickerAsync = async () => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permission to access camera roll is required!");
    return;
  }

  // Incluir la opción `base64` en la configuración
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    base64: true,
  });
  if (pickerResult.canceled) {
    return;
  }

  // Acceder a la URI y a la cadena base64 de la imagen seleccionada
  const imageUri = pickerResult.assets ? pickerResult.assets[0].uri : null;
  const imageBase64 = pickerResult.assets
    ? pickerResult.assets[0].base64
    : null;

  // Devolver tanto la URI como la cadena base64 de la imagen seleccionada
  return { uri: imageUri, base64: imageBase64 };
};

export const openCameraAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permission to access camera is required!");
    return;
  }

  // Incluir la opción `base64` en la configuración
  let pickerResult = await ImagePicker.launchCameraAsync({
    base64: true,
  });
  if (pickerResult.canceled) {
    return;
  }

  // Acceder a la URI y a la cadena base64 de la imagen capturada
  const imageUri = pickerResult.assets ? pickerResult.assets[0].uri : null;
  const imageBase64 = pickerResult.assets
    ? pickerResult.assets[0].base64
    : null;

  // Devolver tanto la URI como la cadena base64 de la imagen capturada
  return { uri: imageUri, base64: imageBase64 };
};
