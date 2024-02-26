import { Animated, Dimensions, Easing } from "react-native";
// header for screens
import { Header, Icon } from "../components";
import { yummlyTheme, tabs } from "../constants";
// drawer
import Gallery from "../screens/Gallery";
// screens
import Home from "../screens/Home";
// Notifications
import Recipe from "../screens/Recipe";
import Profile from "../screens/Profile";
import ProfileFavoritos from "../screens/ProfileFavoritos";
import ProfileRecetas from "../screens/ProfileRecetas";
import CreateRecipe from "../screens/CreateRecipe";
import React from "react";
import Login from "../screens/Login";
import Search from "../screens/Search";
// settings
import Settings from "../screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
            headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              tabs={tabs.tags}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={Recipe}
        options={({ route }) => ({
          header: ({ navigation }) => (
            <Header
              title="Recipe"
              white
              back
              recipeId={route.params.recipeId}
              transparent
              navigation={navigation}
            />
          ),
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Search" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Crear receta"
              back
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              back
              title="Perfil"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Configuracion"
              back
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="ProfileFavoritos"
        component={ProfileFavoritos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Favoritos"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="ProfileRecetas"
        component={ProfileRecetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Recetas"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={HomeStack} />
    </Stack.Navigator>
  );
}
