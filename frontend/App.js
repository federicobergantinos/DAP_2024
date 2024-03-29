import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

SplashScreen.preventAutoHideAsync();

import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { yummlyTheme } from "./constants";
import { RecipeProvider } from "./navigation/RecipeContext";

const assetImages = [];

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "open-sans-regular": require("./assets/font/OpenSans-Regular.ttf"),
          "open-sans-light": require("./assets/font/OpenSans-Light.ttf"),
          "open-sans-bold": require("./assets/font/OpenSans-Bold.ttf"),
        });
        // //Load Resources
        await _loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <RecipeProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <GalioProvider theme={yummlyTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    </RecipeProvider>
  );
}
