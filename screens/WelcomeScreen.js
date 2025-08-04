import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Button animation
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Background animation
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  // Button press animation
  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate("Home"));
  };

  // Mount animations
  useEffect(() => {
    // Button entrance animation
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Background gradient animation (looping)
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false, // backgroundColor doesn't support native driver
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [buttonOpacity, buttonScale, backgroundAnim]);

  // Interpolate background color for gradient effect
  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#4B0082", "#1E3A8A"], // Music-themed purple to blue gradient
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title} accessibilityRole="header">
        Welcome to Flash!
      </Text>
      <Text style={styles.subtitle} accessibilityRole="text">
        Your ultimate sales experience awaits
      </Text>

      <Image
        source={require("../assets/logo-transparent.png")} // Placeholder for music player logo
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="Flash sales app logo"
      />

      <View style={styles.buttonContainer}>
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          }}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Home")} // navigate to the Login screen wgen the button is pressed
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Get Started"
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Find. Sell. Succeed. All in one App.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
    ...Platform.select({
      ios: { fontFamily: "System" },
      android: { fontFamily: "Roboto" },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: "#E5E7EB",
    textAlign: "center",
    marginTop: 12,
    opacity: 0.9,
  },
  image: {
    width: "80%",
    height: 250,
    maxWidth: 300,
    borderRadius: 12,
    marginVertical: 40,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#7C3AED", // Vibrant purple for music theme
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    opacity: 0.85,
  },
});
