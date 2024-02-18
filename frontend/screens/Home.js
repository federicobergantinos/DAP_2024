import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, FlatList, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Block, theme } from "galio-framework";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from "../components";
import recipes from "../constants/recipes";
const { width } = Dimensions.get("screen");

const ITEMS_PER_PAGE = 6; 

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null); // Nuevo estado para el tag seleccionado

  const navigation = useNavigation();
  const route = useRoute();
  const tabId = route.params?.tabId;
  
  useEffect(() => {
    // Establece el tag seleccionado basado en el parámetro recibido
    setSelectedTag(tabId);
  }, [tabId]);
  
  useEffect(() => {
    // Filtra las recetas cada vez que cambia el tag seleccionado
    filterRecipesByTag();
  }, [selectedTag]);

  const filterRecipesByTag = () => {
    const filteredData = selectedTag
      ? recipes.filter(recipe => recipe.tags.includes(selectedTag))
      : recipes; // Filtra las recetas basándose en el tag seleccionado

    setData(filteredData.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(0); // Resetea la paginación
  };
  
  const loadMoreItems = () => {
    if (loading) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const nextSetOfItems = recipes.slice(nextPage * ITEMS_PER_PAGE, (nextPage + 1) * ITEMS_PER_PAGE);

    setTimeout(() => {
      if (nextSetOfItems.length > 0) {
        setData([...data, ...nextSetOfItems]);
        setCurrentPage(nextPage);
      }
      setLoading(false);
    }, 1500);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const renderRecipe = ({ item, index }) => {
    const marginRight = (index % 2 === 0) ? theme.SIZES.BASE : 0;


    return (
      <Card
        item={item}
        style={{ marginRight: marginRight, width: (width - theme.SIZES.BASE * 3) / 2 }}
      />
    );
  };

  
  return (
    <Block flex center style={styles.home}>
      <FlatList
        data={data}
        renderItem={renderRecipe}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipes}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        numColumns={2} 
      />
      <TouchableOpacity
        onPress={() => console.log('Botón presionado')}
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </Block>
  );  
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  recipes: {
    justifyContent: 'space-between',
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  fabIcon: {
    fontSize: 24,
    color: '#333',
  },
});


export default Home;
