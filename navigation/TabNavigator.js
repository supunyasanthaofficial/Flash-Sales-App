import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import PostAdScreen from "../screens/PostAdScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#ccc",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "PostAd") {
            iconName = focused ? "add-circle" : "add-circle-outline"; // valid Ionicons
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline"; //  valid Ionicons
          }

          return (
            <Animatable.View
              animation={focused ? "rubberBand" : "fadeInDown"}
              duration={500}
              easing="ease-in-out"
              style={{ alignItems: "center" }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </Animatable.View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PostAd"
        component={PostAdScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
