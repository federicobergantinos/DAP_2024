import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";

import { Card } from "../components/";

import deals from "../constants/deals";

const { width } = Dimensions.get("screen");
// import recipes from '../constants/recipes';

export default class Deals extends React.Component {
  renderRecipes = () => {
    const { navigation, route } = this.props;
    // const tabId = navigation.getParam("tabId");
    // const recipes = tabId ? deals[tabId] : deals.shoes;
    const tabId = route.params?.tabId;
    const recipes = tabId ? deals[tabId] : deals.beauty;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipes}
      >
        <Block flex>
          <Card item={recipes[0]} horizontal />
          <Block flex row>
            <Card
              item={recipes[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={recipes[2]} />
          </Block>
          <Card item={recipes[3]} horizontal />
          <Card item={recipes[4]} full />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.deals}>
        {this.renderRecipes()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  deals: {
    width
  },
  recipes: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});
