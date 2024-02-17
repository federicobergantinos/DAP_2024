import React from "react";
import { useNavigation } from '@react-navigation/native';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { yummlyTheme } from "../constants";
import {Rating} from "react-native-ratings";
const Card = (props) => {
  const navigation = useNavigation();
  const {
    item,
    horizontal,
    full,
    style,
    ctaColor,
    imageStyle,
    ctaRight
  } = props;

  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow
  ];

  return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
        >
          <Block flex style={imgContainer}>
            <Image source={{ uri: item.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                  style={{ fontFamily: 'open-sans-regular' }}
                  size={14}
                  style={styles.cardTitle}
                  color={yummlyTheme.COLORS.TEXT}
              >
                {item.title}
              </Text>
              {item.body ? (
                  <Block flex left>
                    <Text style={{ fontFamily: 'open-sans-regular' }} size={12} color={yummlyTheme.COLORS.TEXT}>
                      {item.body}
                    </Text>
                  </Block>
              ) : (
                  <Block />
              )}
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                  style={{ fontFamily: 'open-sans-bold' }}
                  size={12}
                  muted={!ctaColor}
                  color={ctaColor || yummlyTheme.COLORS.ACTIVE}
                  bold
              >
                Ver receta
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    // flex: 1,
    // flexWrap: "wrap",
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden"
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto"
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: "#8898AA",
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
export default Card;
