import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Last Updated: July 12, 2025</Text>

          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information that you provide directly to us, including
            your name, email address, and any other information you choose to
            provide.
          </Text>

          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide and maintain our services
          </Text>
          <Text style={styles.bulletPoint}>
            • Send you updates and marketing communications
          </Text>
          <Text style={styles.bulletPoint}>
            • Respond to your comments and questions
          </Text>
          <Text style={styles.bulletPoint}>• Improve our services</Text>

          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized or unlawful
            processing, accidental loss, destruction, or damage.
          </Text>

          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.paragraph}>You have the right to:</Text>
          <Text style={styles.bulletPoint}>• Access your personal data</Text>
          <Text style={styles.bulletPoint}>
            • Request correction of your data
          </Text>
          <Text style={styles.bulletPoint}>
            • Request deletion of your data
          </Text>
          <Text style={styles.bulletPoint}>
            • Withdraw your consent at any time
          </Text>

          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact
            us at: support@flashapp.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ...existing code...
  lastUpdated: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  bulletPoint: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    marginLeft: 16,
    lineHeight: 24,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  // ...existing code...
});

export default PrivacyPolicyScreen;
