import React from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { Block, Text, Input, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

import { recipes, categories, yummlyTheme } from "../constants/";
import { Icon, Card } from "../components/";

export default class Search extends React.Component {
  state = {
    results: [],
    search: "",
    active: false
  };

  animatedValue = new Animated.Value(0);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  handleSearchChange = search => {
    const results = recipes.filter(
      item => search && item.title.toLowerCase().includes(search)
    );
    this.setState({ results, search });
    this.animate();
  };

  renderSearch = () => {
    const { search } = this.state;
    const iconSearch = search ? (
      <TouchableWithoutFeedback onPress={() => this.setState({ search: "" })}>
        <Icon
          size={16}
          color={theme.COLORS.MUTED}
          name="magnifying-glass"
          family="entypo"
        />
      </TouchableWithoutFeedback>
    ) : (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="magnifying-glass"
        family="entypo"
      />
    );

    return (
      <Input
        right
        color="black"
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        defaultValue={search}
        style={[styles.search, this.state.active ? styles.shadow : null]}
        placeholder="Que estas buscando?"
        onFocus={() => this.setState({ active: true })}
        onBlur={() => this.setState({ active: false })}
        onChangeText={this.handleSearchChange}
      />
    );
  };

  renderNotFound = () => {
    return (
      <Block style={styles.notfound}>
        <Text style={{ fontFamily: 'open-sans-regular' }} size={18} color={yummlyTheme.COLORS.TEXT}>
          We didn’t find "<Text bold>{this.state.search}</Text>" in our store.
        </Text>

        <Text size={18} style={{ marginTop: theme.SIZES.BASE, fontFamily: 'open-sans-regular' }} color={yummlyTheme.COLORS.TEXT}>
          You can see more products from other categories.
        </Text>
      </Block>
    );
  };

  renderResult = result => {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={{ width: width - theme.SIZES.BASE * 2, opacity }}
        key={`result-${result.title}`}
      >
        <Card item={result} horizontal />
      </Animated.View>
    );
  };

  renderResults = () => {
    const { results, search } = this.state;

    if (results.length === 0 && search) {
      return (
        <Block style={{ width: width - 40 }}>
          {this.renderNotFound()}
          <Text style={{ fontFamily: 'open-sans-regular' }} size={18} color={yummlyTheme.COLORS.TEXT}>Daily Deals</Text>
          {this.renderDeals()}
        </Block>
      );
    }

    return (
      <Block style={{ paddingTop: theme.SIZES.BASE * 2 }}>
        {results.map(result => this.renderResult(result))}
      </Block>
    );
  };

  render() {
    return (
      <Block flex center style={styles.searchContainer}>
        <Block center style={styles.header}>
          {this.renderSearch()}
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderResults()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 3
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 2,
    zIndex: 2
  },
  notfound: {
    marginVertical: theme.SIZES.BASE * 2
  },
  suggestion: {
    height: theme.SIZES.BASE * 1.5,
    marginBottom: theme.SIZES.BASE
  },
  result: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0
  },
  resultTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  },
  resultDescription: {
    padding: theme.SIZES.BASE / 2
  },
  image: {
    overflow: "hidden",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4
  },
  dealsContainer: {
    justifyContent: "center",
    paddingTop: theme.SIZES.BASE
  },
  deals: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0
  },
  dealsTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  },
  dealsDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageHorizontal: {
    overflow: "hidden",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4
  },
  imageVertical: {
    overflow: "hidden",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  }
});
