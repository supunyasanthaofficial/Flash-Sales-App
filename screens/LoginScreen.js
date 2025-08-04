import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FadeInView = ({ children, style, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, delay]);

  return (
    <Animated.View
      style={{ ...style, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
    >
      {children}
    </Animated.View>
  );
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Logo animation
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoScale, logoRotate]);

  const logoRotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate("Home");
    } else {
      alert("Please enter both email and password");
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login not implemented`); // Placeholder
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FadeInView style={styles.header} delay={100}>
        <TouchableOpacity
        //   onPress={() => navigation.goBack()}
        //   style={styles.backButton}
        //   accessibilityLabel="Go Back to Welcome Screen"
        //   accessibilityRole="button"
        >
          {/* <Ionicons name="arrow-back" size={26} color="#FFFFFF" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Login</Text>
      </FadeInView>

      {/* Logo */}
      <FadeInView style={styles.logoContainer} delay={150}>
        <Animated.Image
          source={require("../assets/logo-transparent.png")}
          style={[
            styles.logo,
            { transform: [{ scale: logoScale }, { rotate: logoRotation }] },
          ]}
          resizeMode="contain"
          accessibilityLabel="Flash logo"
        />
      </FadeInView>

      {/* Login Form Card */}
      <FadeInView style={styles.formCard} delay={200}>
        <Text style={styles.formTitle}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E5E7EB"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
          accessibilityRole="text"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#E5E7EB"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
          accessibilityRole="text"
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Home")} // navigate to the Home screen when the login button is presssed
          accessibilityLabel="Login to Flash"
          accessibilityRole="button"
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </FadeInView>

      {/* Social Login Buttons */}
      <FadeInView style={styles.socialContainer} delay={250}>
        <Text style={styles.socialTitle}>Or sign in with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#DB4437" }]}
            onPress={() => handleSocialLogin("Google")}
            accessibilityLabel="Sign in with Google"
            accessibilityRole="button"
          >
            <Ionicons name="logo-google" size={24} color="#FFFFFF" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#4267B2" }]}
            onPress={() => handleSocialLogin("Facebook")}
            accessibilityLabel="Sign in with Facebook"
            accessibilityRole="button"
          >
            <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>

      {/* Footer */}
      <FadeInView style={styles.footer} delay={300}>
        <TouchableOpacity
          onPress={() => alert("😂😂😂😂")}
          accessibilityLabel="Sign up for Flash"
          accessibilityRole="button"
        >
          <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </FadeInView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#4B0082",
    borderBottomWidth: 1,
    borderBottomColor: "#6B7280",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formCard: {
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  loginButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  socialContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 16,
    color: "#E5E7EB",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "48%",
    justifyContent: "center",
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  footerText: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default LoginScreen;
