import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Block, theme } from "galio-framework";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card } from "../components";
import backendApi from "../api/backendGateway";

const { width } = Dimensions.get("screen");
const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [endReachedThreshold, setEndReachedThreshold] = useState(0.1); // Valor inicial

  const navigation = useNavigation();
  const route = useRoute();
  const tabId = route.params?.tabId;

  useEffect(() => {
    setSelectedTag(tabId);
    // Resetea los estados para manejar el nuevo tag
    setData([]);
    setCurrentPage(0);
    setAllItemsLoaded(false);
    // Asegúrate de llamar a fetchRecipes aquí si es necesario para cargar inmediatamente después de cambiar el tag
  }, [tabId]);

  useEffect(() => {
    fetchRecipes();
  }, [selectedTag, currentPage]);

  const fetchRecipes = async () => {
    if (loading || allItemsLoaded) return;

    setLoading(true);
    try {
      const page = currentPage;
      const tag = selectedTag !== "ALL" ? selectedTag : undefined;
      const { response: recipes } = await backendApi.recipesGateway.getAll(
        page,
        tag,
      );

      if (recipes.length > 0) {
        setData((prevData) => [...prevData, ...recipes]);
      } else {
        setAllItemsLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = () => {
    if (!loading && !allItemsLoaded) {
      setCurrentPage(currentPage + 1); // Prepara para cargar la siguiente página
    }
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
    const marginRight = index % 2 === 0 ? theme.SIZES.BASE : 0;
    return (
      <Card
        item={item}
        style={{
          marginRight: marginRight,
          width: (width - theme.SIZES.BASE * 3) / 2,
        }}
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
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        numColumns={2}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateRecipe")}
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
    justifyContent: "space-between",
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: "white",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  fabIcon: {
    fontSize: 24,
    color: "#333",
  },
});

export default Home;
