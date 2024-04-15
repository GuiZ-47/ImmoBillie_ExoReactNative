import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { NativeBaseProvider} from "native-base";

import { FontAwesome5 } from '@expo/vector-icons';

import { Properties } from "./src/Components/Properties";
import { Agents } from "./src/Components/Agents";
import { Profile } from "./src/Components/Profile";
import PropertiesReducer from "./src/Reducers/PropertiesReducer";
import AgentsReducer from "./src/Reducers/AgentsReducer";
import GLOBALS from './src/Components/Common/Globals';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: GLOBALS.SENTRY_DSN,
  enableInExpoDevelopment : true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// 2 possibilités pour la barre de nav : fichier externe ou on la laisse dans App.js
//Pour des raisons de simplicité on le met ici

const Tab = createBottomTabNavigator(); // Create a bottom tab navigator

function MainMenu() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle : {
                    height : 50,
                    paddingTop : 0,
                    paddingHorizontal : 0,
                    position : 'absolute',
                    borderTopWidth : 0,
                },
                tabBarIcone :  ({ focused, color, size }) => {
                    let iconName;
                        if(route.name === "PROPERTIES") {
                        iconName = focused ? "home" : "home";
                        } else if (route.name === "PROFILE") {
                        iconName = focused ? "user" : "user";
                        } else if (route.name === "AGENTS") {
                        iconName = focused ? "id-card" : "id-card";
                        }

                        return  <FontAwesome5 name={iconName} size={size} color={color} />;

                },
                tabBarActiveTintColor : "white",
                tabBarInactiveTintColor : "gray",
                tabBarActiveBackgroundColor : "gray",
            })}
        >
          <Tab.Screen
          name="PROPERTIES"
          component={Properties}
           options={{ headerShown : false}}
           />
           <Tab.Screen
          name="AGENTS"
          component={Agents}
           options={{ headerShown : false}}
           />
           <Tab.Screen
          name="PROFILE"
          component={Profile}
           options={{ headerShown : false}}
           />
        </Tab.Navigator>
      );
}

const store = (preloadedState) =>
    configureStore({
        reducer : {
            properties : PropertiesReducer,
            agents : AgentsReducer,
        }, preloadedState,
    });

export default function App() {
    setTimeout(() => {
        SplashScreen.hideAsync();
        }, 3000);
    return (
        <Provider store={store()}>
            <NavigationContainer>
                <NativeBaseProvider>
                    <MainMenu />
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
        );
}