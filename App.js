import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";

import SearchScreen from "./screens/SearchScreen";
import PostAdScreen from "./screens/PostAdScreen";
import ChatScreen from "./screens/ChatScreen";
import AccountScreen from "./screens/AccountScreen";

import TabNavigator from "./navigation/TabNavigator";
import EditProfileScreen from "./screens/EditProfileScreen";
import HelpandSupportScreen from "./screens/HelpandSupportScreen";
import TermsOfServiceScreen from "./screens/TermsOfServiceScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import MyListingsScreen from "./screens/MyListingsScreen";
import SavedItemsScreen from "./screens/SavedItemsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="PostAd" component={PostAdScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="HelpandSupport" component={HelpandSupportScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="MyListings" component={MyListingsScreen} />
        <Stack.Screen name="SavedItems" component={SavedItemsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
