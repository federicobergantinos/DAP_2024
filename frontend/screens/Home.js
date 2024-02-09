import React, { useState } from "react";
import { StyleSheet, Dimensions, FlatList, View, ActivityIndicator, Text } from "react-native";
import { Block, theme } from "galio-framework";

import { Card } from "../components";
import recipes from "../constants/recipes";
const { width } = Dimensions.get("screen");

// Ajustamos la cantidad de elementos por página a 6 ya que queremos 2 tarjetas por fila y 3 filas por página
const ITEMS_PER_PAGE = 4; 

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState(recipes.slice(0, ITEMS_PER_PAGE));
  const [loading, setLoading] = useState(false);
  
  const loadMoreItems = () => {
    if (loading) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const nextSetOfItems = recipes.slice(nextPage * ITEMS_PER_PAGE, (nextPage + 1) * ITEMS_PER_PAGE);
    console.log(nextSetOfItems.length)

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

  // Actualizamos el renderRecipe para manejar correctamente los elementos por fila
  const renderRecipe = ({ item, index }) => {
    // Calculamos si el elemento debe tener un margen a la derecha
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
        numColumns={2} // Aquí configuramos FlatList para usar dos columnas
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  recipes: {
    justifyContent: 'space-between', // Asegura que las tarjetas estén distribuidas uniformemente
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
