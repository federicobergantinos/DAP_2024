import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
} from "react-native";
import { Block, Text, Button, theme } from "galio-framework";
import yummlyTheme from "../constants/Theme";
import { iPhoneX, HeaderHeight } from "../constants/utils";
import { AirbnbRating } from "react-native-ratings";
import PillContainer from "../components/PillContainer";
import Icon from "../components/Icon";
import backendApi from "../api/backendGateway";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import RecipeContext from "../navigation/RecipeContext";

const tagsTranslations = {
  RAPID_PREPARATION: "Preparación rápida",
  VEGETARIAN: "Vegetariano",
  VEGAN: "Vegano",
  GLUTEN_FREE: "Libre de gluten",
  IMMUNE_SYSTEM: "Sistema inmunológico",
  INTESTINAL_FLORA: "Flora intestinal",
  ANTI_INFLAMMATORY: "Antiinflamatorio",
  LOW_SODIUM: "Bajo en sodio",
  LOW_CARB: "Bajo en carbohidratos",
};

const recipe = {
  userId: 123,
  userName: "Juan Perez",
  userImage:
    "https://www.recetasnestle.com.ar/sites/default/files/2022-06/ingredientes-comida-de-mar-parrilla.jpg",
  title: "Delicious Recipe",
  description: "Esto es una breve descripción de la receta",
  media: [
    "https://www.recetasnestle.com.ar/sites/default/files/2022-06/ingredientes-comida-de-mar-parrilla.jpg",
    "https://static-cse.canva.com/blob/598703/Fotografiadecomida.jpg",
    "https://www.youtube.com/watch?v=zfdzfDGc-1k&ab_channel=PaulinaCocina",
  ],
  preparationTime: "60 minutos",
  servingCount: 4,
  ingredients: ["ingredient1", "ingredient2"],
  steps: ["Step 1", "Step 2"],
  tags: ["VEGETARIAN", "VEGAN"],
  calories: 500,
  proteins: 20.5,
  totalFats: 15.3,
  rating: 4,
};

const { height, width } = Dimensions.get("window");

const getAsyncRecipe = async (recipeId) => {
  const { response, statusCode } =
    await backendApi.recipesGateway.getRecipeById(recipeId);
  console.log("STATUS:", statusCode);
  console.log("RESPONSE:", response);
  if (statusCode != 200) {
    //TODO Debe tirar error
  }
  return response;
};
export default function Recipe(props) {
  const { route } = props;
  const navigation = useNavigation();
  const [isStepsAvailable, setIsStepsAvailable] = useState(true);
  const scrollX = new Animated.Value(0);
  const [loading, setLoading] = useState(true);
  const { recipe, setRecipe } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(route.params.recipeId);
        const fetchedRecipe = await getAsyncRecipe(route.params.recipeId);
        setRecipe(fetchedRecipe);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la receta");
        navigation.replace("Home");
      }
    };
    fetchRecipe();
  }, []);

  const buttonStyle1 = isStepsAvailable
    ? styles.buttonSelected
    : styles.buttonUnselected;
  const buttonStyle2 = !isStepsAvailable
    ? styles.buttonSelected
    : styles.buttonUnselected;
  const textColor1 = isStepsAvailable ? "black" : "gray";
  const textColor2 = !isStepsAvailable ? "black" : "gray";

  const renderGallery = () => {
    const { navigation } = props;
    const recipeImages = recipe.media;

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {recipeImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`recipe-image-${index}`}
            onPress={() =>
              navigation.navigate("Gallery", { images: recipeImages, index })
            }
          >
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width, height: iPhoneX ? width + 32 : width }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };
  const toggleStepsAvailability = () => {
    setIsStepsAvailable(!isStepsAvailable);
  };

  const renderProgress = () => {
    const recipeImages = recipe.media;

    const position = Animated.divide(scrollX, width);

    return (
      <Block row>
        {recipeImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const dotWidth = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[styles.dots, { opacity, width: dotWidth }]}
            />
          );
        })}
      </Block>
    );
  };

  if (loading) {
    return <LoadingScreen visible={loading} />;
  } else {
    return (
      <Block flex style={styles.recipe}>
        <Block flex style={{ position: "relative" }}>
          {renderGallery()}
          <Block center style={styles.dotsContainer}>
            {renderProgress()}
          </Block>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE * 2,
              }}
            >
              <Text
                size={28}
                style={{ paddingBottom: 3, fontFamily: "open-sans-regular" }}
                color={yummlyTheme.COLORS.TEXT}
              >
                {recipe.title}
              </Text>
              <Text
                size={18}
                style={{ paddingBottom: 10, fontFamily: "open-sans-regular" }}
                color={yummlyTheme.COLORS.MUTED}
              >
                {recipe.description}
              </Text>
              <Block row>
                <AirbnbRating
                  count={5}
                  defaultRating={1}
                  isDisabled={true}
                  selectedColor={yummlyTheme.COLORS.GRADIENT_START}
                  size={20}
                  showRating={false}
                  style={{ paddingVertical: 10, width: 100 }}
                />
              </Block>
              <Block
                flex
                flexDirection="row"
                flexWrap="wrap"
                style={{ paddingTop: 10, paddingBottom: 10, gap: 5 }}
              >
                {recipe.tags.map((tag, index) => (
                  <PillContainer key={index}>
                    {tagsTranslations[tag]}{" "}
                  </PillContainer>
                ))}
              </Block>
              <Block
                flex
                flexDirection="row"
                style={{ justifyContent: "flex-start", gap: -50 }}
              >
                <Block
                  flex
                  flexDirection="row"
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 5,
                  }}
                >
                  <Icon
                    family="MaterialIcons"
                    name="access-time"
                    size={30}
                    color={yummlyTheme.COLORS.MUTED}
                  />
                  <Text color={yummlyTheme.COLORS.MUTED}>
                    {recipe.preparationTime} minutos
                  </Text>
                </Block>
                <Block
                  flex
                  flexDirection="row"
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 5,
                  }}
                >
                  <Icon
                    family="MaterialIcons"
                    name="people"
                    size={30}
                    color={yummlyTheme.COLORS.MUTED}
                  />
                  <Text color={yummlyTheme.COLORS.MUTED}>
                    {recipe.servingCount} personas
                  </Text>
                </Block>
              </Block>
              <Block style={{ paddingTop: theme.SIZES.BASE }}>
                <Block
                  flex
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: theme.COLORS.GREY,
                    paddingBottom: theme.SIZES.BASE,
                  }}
                >
                  <Block
                    flex
                    flexDirection="row"
                    style={{ padding: 0, margin: 0, gap: 0 }}
                  >
                    <Button
                      disabled={isStepsAvailable}
                      shadowless
                      borderless
                      style={[styles.buttonTab, buttonStyle1]}
                      onPress={toggleStepsAvailability}
                    >
                      <Text size={20} color={textColor1}>
                        Pasos
                      </Text>
                    </Button>
                    <Button
                      disabled={!isStepsAvailable}
                      shadowless
                      borderless
                      style={[styles.buttonTab, buttonStyle2]}
                      onPress={toggleStepsAvailability}
                    >
                      <Text size={20} color={textColor2}>
                        Ingredientes
                      </Text>
                    </Button>
                  </Block>
                  <Text
                    size={15}
                    style={{
                      paddingTop: 10,
                      paddingHorizontal: 10,
                      fontFamily: "open-sans-regular",
                    }}
                    color={yummlyTheme.COLORS.TEXT}
                  >
                    {isStepsAvailable
                      ? recipe.steps.map((step, index) => (
                          <Text key={index}>
                            {index + 1 + ". " + step}
                            {"\n"}
                          </Text>
                        ))
                      : recipe.ingredients.map((ingredient, index) => (
                          <Text key={index}>
                            {index + 1 + ". " + ingredient}
                            {"\n"}
                          </Text>
                        ))}
                  </Text>
                </Block>
                <Block
                  style={{ marginTop: 15, fontFamily: "open-sans-regular" }}
                >
                  <Text
                    size={15}
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 3,
                      fontFamily: "open-sans-regular",
                    }}
                    color={yummlyTheme.COLORS.TEXT}
                  >
                    Calorias: {recipe.calories}
                  </Text>
                  <Text
                    size={15}
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 3,
                      fontFamily: "open-sans-regular",
                    }}
                    color={yummlyTheme.COLORS.TEXT}
                  >
                    Proteinas: {recipe.proteins}
                  </Text>
                  <Text
                    size={15}
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 3,
                      fontFamily: "open-sans-regular",
                    }}
                    color={yummlyTheme.COLORS.TEXT}
                  >
                    Grasas totales: {recipe.totalFats}
                  </Text>
                </Block>
              </Block>
              <Block
                flex
                flexDirection="row"
                style={{ alignItems: "center", justifyContent: "flex-start" }}
              >
                <Image src={recipe.userImage} style={styles.avatar} />
                <Text
                  style={{ fontFamily: "open-sans-regular", height: 40 }}
                  size={14}
                  color={yummlyTheme.COLORS.TEXT}
                >
                  {recipe.userName}
                </Text>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipe: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  buttonSelected: {
    borderBottomWidth: 0,
    backgroundColor: "white",
  },
  buttonUnselected: {
    backgroundColor: theme.COLORS.GREY,
  },
  buttonTab: {
    width: "50%",
    padding: 0,
    margin: 0,
    backgroundColor: "white",
    elevation: 0,
    borderRadius: 0,
  },
  options: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: "white",
  },
  dotsContainer: {
    position: "absolute",
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8,
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: yummlyTheme.COLORS.BORDER_COLOR,
    overflow: "hidden",
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: yummlyTheme.COLORS.PRICE_COLOR,
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0,
  },
});
