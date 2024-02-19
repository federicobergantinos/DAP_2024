import * as ImagePicker from 'expo-image-picker';

// Función para abrir la biblioteca de imágenes
export const openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to access camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  if (pickerResult.canceled) { // Cambiado de `cancelled` a `canceled`
    return;
  }

  // Acceder a la URI de la imagen seleccionada a través del arreglo `assets`
  const imageUri = pickerResult.assets ? pickerResult.assets[0].uri : null;
  return imageUri; // Devolver la URI de la imagen seleccionada
};

export const openCameraAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to access camera is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchCameraAsync();
  if (pickerResult.canceled) { // Cambiado de `cancelled` a `canceled`
    return;
  }

  // Acceder a la URI de la imagen capturada a través del arreglo `assets`
  const imageUri = pickerResult.assets ? pickerResult.assets[0].uri : null;
  return imageUri; // Devolver la URI de la imagen capturada
};