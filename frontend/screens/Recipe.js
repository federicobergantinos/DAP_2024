import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import { Icon } from "../components";
import yummlyTheme from "../constants/Theme";
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";

const { height, width } = Dimensions.get("window");

export default class Recipe extends React.Component {
  state = {
    selectedSize: null
  };

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const recipe = params.recipe;
    const recipe = route.params?.recipe;
    const recipeImages = [
      recipe.image,
      recipe.image,
      recipe.image,
      recipe.image
    ];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }}}],
          {useNativeDriver: false}
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

  renderProgress = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const recipe = params.recipe;
    const recipe = route.params?.recipe;
    const recipeImages = [
      recipe.image,
      recipe.image,
      recipe.image,
      recipe.image
    ];

    const position = Animated.divide(this.scrollX, width);

    return (
      <Block row>
        {recipeImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp"
          });

          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: "clamp"
          });

          return (
            <Animated.View key={i} style={[styles.dots, { opacity, width }]} />
          );
        })}
      </Block>
    );
  };

  renderSize = label => {
    const active = this.state.selectedSize === label;

    return (
      <TouchableHighlight
        style={styles.sizeButton}
        underlayColor={yummlyTheme.COLORS.PRICE_COLOR}
        onPress={() => this.setState({ selectedSize: label })}
      >
        <Text style={{ fontFamily: 'open-sans-regular' }} color={active ? theme.COLORS.PRIMARY : yummlyTheme.COLORS.TEXT}>{label}</Text>
      </TouchableHighlight>
    );
  };

  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const recipe = params.recipe;
    const recipe = route.params?.recipe;

    return (
      <Block flex style={styles.recipe}>
        <Block flex style={{ position: "relative" }}>
          {this.renderGallery()}
          <Block center style={styles.dotsContainer}>
            {this.renderProgress()}
          </Block>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE * 2
              }}
            >
              <Text  size={28} style={{ paddingBottom: 24, fontFamily: 'open-sans-regular' }} color={yummlyTheme.COLORS.TEXT}>
                {recipe.title}
              </Text>
              <Block row space="between">
                <Block row>
                  <Image
                    source={Images.ProfilePicture }
                    style={styles.avatar}
                  />
                  <Block style={{ marginTop: 2 }}>
                    <Text style={{ fontFamily: 'open-sans-regular' }} size={14} color={yummlyTheme.COLORS.TEXT}>Jessica Jones</Text>
                    <Text style={{ fontFamily: 'open-sans-light' }} size={14} color={yummlyTheme.COLORS.TEXT} style={{ fontWeight: '100' }}>
                      Pro Seller
                    </Text>
                  </Block>
                </Block>
                <Text style={{ fontFamily: 'open-sans-bold' }} size={18} color={yummlyTheme.COLORS.TEXT}>
                  $899
                </Text>
              </Block>
            </Block>
            <Block style={{ padding: theme.SIZES.BASE }}>
              <Text style={{ fontFamily: 'open-sans-regular' }} size={16} color={yummlyTheme.COLORS.TEXT}>Size</Text>
              <Block card style={{ marginTop: 16 }}>
                <Block row>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      styles.roundTopLeft,
                      selectedSize === "XS" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("XS")}
                  </Block>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      selectedSize === "S" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("S")}
                  </Block>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      styles.roundTopRight,
                      selectedSize === "M" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("M")}
                  </Block>
                </Block>
                <Block row>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      styles.roundBottomLeft,
                      selectedSize === "L" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("L")}
                  </Block>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      { borderBottomWidth: 0 },
                      selectedSize === "XL" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("XL")}
                  </Block>
                  <Block
                    flex
                    middle
                    style={[
                      styles.size,
                      styles.roundBottomRight,
                      selectedSize === "2XL" ? styles.active : null
                    ]}
                  >
                    {this.renderSize("2XL")}
                  </Block>
                </Block>
              </Block>
              <Button
                shadowless
                style={styles.addToCart}
                color={yummlyTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate("Cart")}

              >
                <Text style={{ fontFamily: 'open-sans-bold' }} color={yummlyTheme.COLORS.WHITE}>ADD TO CART</Text>
              </Button>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipe: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0
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
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: "white"
  },
  dotsContainer: {
    position: "absolute",
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 10
  },
  addToCart: {
    width: width - theme.SIZES.BASE * 4,
    marginTop: theme.SIZES.BASE * 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    marginRight: 8
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: yummlyTheme.COLORS.BORDER_COLOR,
    overflow: "hidden"
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundColor: yummlyTheme.COLORS.PRICE_COLOR
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: yummlyTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0
  }
});
