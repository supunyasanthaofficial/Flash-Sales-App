import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
  Easing,
  Switch,
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

const AccountScreen = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const user = {
    name: "Supun Yasantha",
    email: "supunyasantha057@gmail.com",
    profilePicture:
      "https://media.licdn.com/dms/image/v2/D4D03AQExEh-llI4quw/profile-displayphoto-shrink_200_200/B4DZQqZViUGgAY-/0/1735878076587?e=2147483647&v=beta&t=xfNXy9fnP73nyRFpld_02cSWv3RwQ0facxy0cd1dhyo",
  };

  const currencies = [
    { id: "0", name: "RS" },
    { id: "1", name: "USD" },
    { id: "2", name: "EUR" },
  ];

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleLogout = () => {
    alert("Wait");
    navigation.navigate("Home");
  };

  const handleHelp = () => {
    navigation.navigate("HelpandSupport");
  };

  const handleAbout = () => {
    alert("Wait");
  };

  const handleMyListings = () => {
    navigation.navigate("MyListings");
  };

  const handleSavedItems = () => {
    navigation.navigate("SavedItems");
  };

  const handlePaymentMethods = () => {
    navigation.navigate("PaymentMethods");
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  const handleTermsOfService = () => {
    navigation.navigate("TermsOfService");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FadeInView style={styles.header} delay={100}>
        <Text style={styles.headerTitle}>Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
          accessibilityLabel="Navigate to Home Screen"
          accessibilityRole="button"
        >
          <Ionicons name="home-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </FadeInView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <FadeInView style={styles.profileCard} delay={200}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.profilePicture}
              resizeMode="cover"
              accessibilityLabel="User profile picture"
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
            accessibilityLabel="Edit user profile"
            accessibilityRole="button"
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </FadeInView>

        {/* Settings Section */}
        <FadeInView style={styles.settingsCard} delay={300}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle push notifications"
              accessibilityRole="switch"
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle email notifications"
              accessibilityRole="switch"
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Services</Text>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle location services"
              accessibilityRole="switch"
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle two-factor authentication"
              accessibilityRole="switch"
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Currency</Text>
            <View style={styles.currencyContainer}>
              {currencies.map((curr) => (
                <TouchableOpacity
                  key={curr.id}
                  style={[
                    styles.currencyButton,
                    currency === curr.name && styles.currencyButtonActive,
                  ]}
                  onPress={() => setCurrency(curr.name)}
                  accessibilityLabel={`Select ${curr.name} currency`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.currencyText,
                      currency === curr.name && styles.currencyTextActive,
                    ]}
                  >
                    {curr.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Theme</Text>
            <Switch
              value={darkThemeEnabled}
              onValueChange={setDarkThemeEnabled}
              trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Toggle dark theme"
              accessibilityRole="switch"
            />
          </View>
        </FadeInView>

        {/* More Options Section */}
        <FadeInView style={styles.moreCard} delay={400}>
          <Text style={styles.sectionTitle}>More</Text>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleMyListings}
            accessibilityLabel="View my listings"
            accessibilityRole="button"
          >
            <Ionicons name="list-outline" size={24} color="#1F2937" />
            <Text style={styles.optionText}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleSavedItems}
            accessibilityLabel="View saved items"
            accessibilityRole="button"
          >
            <Ionicons name="heart-outline" size={24} color="#1F2937" />
            <Text style={styles.optionText}>Saved Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handlePaymentMethods}
            accessibilityLabel="Manage payment methods"
            accessibilityRole="button"
          >
            <Ionicons name="card-outline" size={24} color="#1F2937" />
            <Text style={styles.optionText}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleHelp}
            accessibilityLabel="Help and support"
            accessibilityRole="button"
          >
            <Ionicons name="help-circle-outline" size={24} color="#1F2937" />
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handlePrivacyPolicy}
            accessibilityLabel="View privacy policy"
            accessibilityRole="button"
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#1F2937"
            />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleTermsOfService}
            accessibilityLabel="View terms of service"
            accessibilityRole="button"
          >
            <Ionicons name="document-text-outline" size={24} color="#1F2937" />
            <Text style={styles.optionText}>Terms of Service</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleLogout}
            accessibilityLabel="Log out of account"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text style={[styles.optionText, { color: "#EF4444" }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </FadeInView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#1F2937",
    borderBottomWidth: 1,
    borderBottomColor: "#4B5563",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  profileCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profilePicture: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  editButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  settingsCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  currencyContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  currencyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    marginLeft: 8,
  },
  currencyButtonActive: {
    backgroundColor: "#3B82F6",
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  currencyTextActive: {
    color: "#FFFFFF",
  },
  moreCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
});
export default AccountScreen;
