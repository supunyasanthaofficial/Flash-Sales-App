import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
  Easing,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

// Create a context for profile data
export const ProfileContext = createContext({
  profile: {},
  updateProfile: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+94 741344312",
    profilePicture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const updateProfile = (newProfile) => {
    console.log("Updating profile:", newProfile);
    setProfile((prev) => ({ ...prev, ...newProfile }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

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

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { profile, updateProfile } = useContext(ProfileContext) || {};
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [profilePicture, setProfilePicture] = useState(
    profile?.profilePicture || ""
  );

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Error",
        "Permission to access the media library is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile picture
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+94\s?[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    if (!email || !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!phone || !validatePhone(phone)) {
      Alert.alert(
        "Error",
        "Please enter a valid phone number (e.g., +94 741344312)"
      );
      return;
    }

    const updatedProfile = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      profilePicture:
        profilePicture ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    if (updateProfile) {
      updateProfile(updatedProfile);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } else {
      console.error("ProfileContext not available");
      Alert.alert("Error", "Unable to save profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FadeInView style={styles.header} delay={100}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go Back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </FadeInView>

      {/* Form */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.formCard} delay={200}>
          <Text style={styles.formTitle}>Update Your Profile</Text>

          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image
              source={{
                uri:
                  profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              }}
              style={styles.profilePicture}
              resizeMode="cover"
              accessibilityLabel="Profile picture"
            />
            <View style={styles.profilePictureButtons}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleImageUpload}
                accessibilityLabel="Upload profile picture"
                accessibilityRole="button"
              >
                <Text style={styles.imageButtonText}>Upload Photo</Text>
              </TouchableOpacity>
              {profilePicture && (
                <TouchableOpacity
                  style={[styles.imageButton, styles.removeButton]}
                  onPress={handleRemoveImage}
                  accessibilityLabel="Remove profile picture"
                  accessibilityRole="button"
                >
                  <Text
                    style={[styles.imageButtonText, styles.removeButtonText]}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Name Input */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#6B7280"
            value={name}
            onChangeText={setName}
            accessibilityLabel="Full name input"
          />

          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            accessibilityLabel="Email input"
          />

          {/* Phone Input */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number (e.g., +94 741344312)"
            placeholderTextColor="#6B7280"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9+ ]/g, ""))} // Allow only numbers, +, and space
            keyboardType="phone-pad"
            accessibilityLabel="Phone number input"
          />

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            accessibilityLabel="Save profile"
            accessibilityRole="button"
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  formCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profilePictureButtons: {
    flexDirection: "row",
    gap: 12,
  },
  imageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
  removeButton: {
    backgroundColor: "#EF4444",
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  removeButtonText: {
    color: "#FFFFFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default EditProfileScreen;
