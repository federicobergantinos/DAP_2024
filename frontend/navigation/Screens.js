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
import React from "react";
import Login from "../screens/Login";
import Search from "../screens/Search";
// settings
import SettingsScreen from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function SettingsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Settings" scene={scene} navigation={navigation} />
        ),
        cardStyle: { backgroundColor: "#F8F9FE" },
      }}
    />
    </Stack.Navigator>
  );
}



function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Profile"
              back
              black
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileRecetasStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileRecetas"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="ProfileRecetas"
        component={ProfileRecetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Profile" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileFavoritosStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileFavoritos"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="ProfileFavoritos"
        component={ProfileFavoritos}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Profile" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

/*function ProfileRecetasStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileRecetas"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="ProfileRecetas"
        component={ProfileRecetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              Header
              title="Profile"
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

function ProfileFavoritosStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileFavoritos"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="ProfileFavoritos"
        component={ProfileFavoritos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              Header
              title="Profile"
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
*/

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="LoginDrawer"
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
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
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
    </Stack.Navigator>
  );
}

function CreateRecipeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="CreateRecipe"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title="Crear Receta"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="HomeDrawer"
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ProfileRecetasDrawer"
        component={ProfileRecetasStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ProfileFavoritosDrawer"
        component={ProfileFavoritosStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="LoginDrawer"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CreateRecipeDrawer"
        component={CreateRecipeStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
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
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}