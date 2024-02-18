import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { openImagePickerAsync, openCameraAsync } from '../components/ImagePicker.js';
import MultiSelect from 'react-native-multiple-select';
 
import { Images, yummlyTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import tags from "../constants/tabs";
import Icon from '../components/Icon';
import Input from '../components/Input';
import Button from '../components/Button';


const { width, height } = Dimensions.get("screen");

class CreateRecipe extends React.Component {
  state = {
    selectedTags: [],
    isMultiSelectOpen: false,
  };

  onSelectedItemsChange = selectedTags => {
    this.setState({ selectedTags });
  };
  
  toggleMultiSelect = (isOpen) => {
    this.setState({ isMultiSelectOpen: isOpen });
  }

  renderMainInformation = () => {
    return (
      <Block flex style={styles.CreateRecipeCard}>
        <Block style={styles.info}>
          <TouchableOpacity style={styles.uploadButton} onPress={openImagePickerAsync}>
            <Block middle row space="evenly" style={styles.uploadContainer}>
              <Icon name="camera" family="Entypo" size={30} color={yummlyTheme.COLORS.ICON} />
            </Block>
              <Text bold size={14} color={yummlyTheme.COLORS.HEADER}>
                Añade una foto de tu receta hecha por ti
              </Text>
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
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="Mi sopa favorita de calabaza"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Descripción
          </Text>
          <Input
            right
            multiline
            color="black"
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={<Block />}
            style={{
              alignItems: "start",
              padding: 5, 
              height: 100
            }}
            placeholder="Comparte un poco más acerca de este plato. Qué o quién te inspiró a cocinarlo? Qué lo hace especial para ti?"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Video
          </Text>
          <Input
            right
            color="black"
            autoFocus={true}
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
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="3 personas"
          />
          <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
            Tiempo de elaboración
          </Text>
          <Input
            right
            color="black"
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder="12 minutos"
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
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
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
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
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
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={<Block />}
            style={[styles.search, this.state.active ? styles.shadow : null]}
            placeholder=""
          />
        </Block>
    </Block>
  );
  };

    renderIngredientes = () => {
      return (
        <Block flex style={styles.CreateRecipeCard}>
          <Block>
            <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
              Ingredientes
            </Text>
            <Input
              right
              multiline
              color="black"
              autoFocus={true}
              autoCorrect={false}
              autoCapitalize="none"
              iconContent={<Block />}
              style={{
                alignItems: "start",
                padding: 5, 
                height: 100
              }}
              placeholder={"1 puerro chico\n2 dientes de ajo\n2 huevos\nAl gusto sal y pimienta"}

            />

            <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
              Pasos
            </Text>
            <Input
              right
              multiline
              color="black"
              autoFocus={true}
              autoCorrect={false}
              autoCapitalize="none"
              iconContent={<Block />}
              style={{
                alignItems: "start",
                padding: 5, 
                height: 250
              }}
              placeholder={"1. Lavar muy bien el puerro y cortar en rodajas finas la parte blanca y verde clara.\n2. En la sartén con una cucharada de aceite, saltear los ajos. Agregar el puerro y revolver cada tanto, hasta que ablanden.\n3. Agregar el sofrito e inmediatamente volver a volcar en sartén, aceitada con la otra cucharada de aceite, si lo necesitara\n4. Agregar el sofrito e inmediatamente volver a volcar en sartén, aceitada con la otra cucharada de aceite, si lo necesitara"}
            />
          </Block>
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
          searchInputStyle={{ color: '#CCC' }}
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
            onPress={() => this.props.navigation.navigate('HomeDrawer')}
          >
            Cancelar
          </Button>
          <Button
            center
            textStyle={{ color: yummlyTheme.COLORS.BLACK }} 
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('HomeDrawer')}
          >
            Confirmar
          </Button>
        </Block>
    );
  };

  renderItem = ({ item }) => {
    if (typeof item.render === 'function') {
      return item.render();
    } else {
      console.error(`No render method found for item with key ${item.key}`);
      return null; 
    }
  };

  sections = [
    { key: 'mainInformation', render: () => this.renderMainInformation() },
    { key: 'ingredientes', render: () => this.renderIngredientes() },
    { key: 'descripcionPlato', render: () => this.renderDescripcionPlato() },
    { key: 'descripcionNutricional', render: () => this.renderDescripcionNutricional() },
    { key: 'tags', render: () => this.renderTags() },
    { key: 'buttons', render: () => this.renderButtons() },
  ];
  
  renderSelectedTags() {
    return (
      <View style={styles.tagsContainer}>
        {this.state.selectedTags.map(id => (
          <View key={id} style={styles.tag}>
            <Text style={styles.tagText}>{tags.tags.find(tag => tag.id === id).title}</Text>
            <TouchableOpacity onPress={() => this.removeTag(id)}>
              <Icon name="cross" family="Entypo" size={20} color={yummlyTheme.COLORS.ICON} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
  
  removeTag = (id) => {
    this.setState(prevState => ({
      selectedTags: prevState.selectedTags.filter(tagId => tagId !== id)
    }));
  }
  
  render() {
    return (
      <Block flex style={styles.CreateRecipe}>
        <Block flex>
          <ImageBackground
            source={Images.Background}
            style={styles.Container}
            imageStyle={styles.Background}
          >
          <Block style={{marginTop: Platform.OS === "android" ? HeaderHeight + 100 : 100}} />
          <FlatList
            data={this.sections}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
            ListHeaderComponent={<View style={{ height: 20 }} />} // Add space on top
            ListFooterComponent={<View style={{ height: 20 }} />} // Add space at the bottom
            showsVerticalScrollIndicator={false}
          />
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  CreateRecipe: {
    marginTop: 0,
  },
  Container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  Background: {
    width: width,
    height: height * 1.1
  },
  CreateRecipeCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  image: {
    paddingHorizontal: 40,
  },
  uploadButton: {
    backgroundColor: '#EFEFEF', 
    borderRadius: 4,
    height: height / 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center',
    padding: 15
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    padding: theme.SIZES.BASE, 
  },
  buttonStyle: {
    backgroundColor: yummlyTheme.COLORS.WHITE, 
    color: yummlyTheme.COLORS.PRIMARY, 
    marginRight: 10,
    marginLeft: 10, 
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 2, 
  },
  tagText: {
    fontSize: 12, 
    marginRight: 4,
  },
});

export default CreateRecipe;