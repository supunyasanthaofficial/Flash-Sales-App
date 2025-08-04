import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

const HomeScreen = () => {
  const navigation = useNavigation();

  const featuredListings = [
    {
      id: "1",
      title: "iPhone 14 Pro",
      price: "Rs.300000",
      image:
        "https://cdn.pixabay.com/photo/2022/05/02/14/28/smartphone-7169689_960_720.jpg",
      isNew: true,
    },
    {
      id: "2",
      title: "Leather Jacket",
      price: "Rs.10000",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
    },
    {
      id: "3",
      title: "Coffee Table",
      price: "Rs.50000",
      image:
        "https://cdn.pixabay.com/photo/2017/01/23/06/05/smile-2001662_1280.jpg",
      isNew: false,
    },
    {
      id: "4",
      title: "Vintage Book",
      price: "Rs.2000",
      image:
        "https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_960_720.jpg",
      isFeatured: true,
    },
  ];

  const categories = [
    {
      id: "1",
      name: "Electronics",
      icon: "phone-portrait-outline",
      color: "#EF4444",
    },
    {
      id: "2",
      name: "Fashion",
      icon: "shirt-outline",
      color: "#F59E0B",
    },
    {
      id: "3",
      name: "Home & Garden",
      icon: "home-outline",
      color: "#10B981",
    },
    {
      id: "4",
      name: "Books",
      icon: "book-outline",
      color: "#3B82F6",
    },
    {
      id: "5",
      name: "Vehicles",
      icon: "car-outline",
      color: "#8B5CF6",
    },
    {
      id: "6",
      name: "Property",
      icon: "business-outline",
      color: "#EC4899",
    },
  ];

  const quickActions = [
    {
      id: "1",
      name: "Post Item",
      icon: "add-circle-outline",
      action: () => navigation.navigate("PostAd"),
    },
    {
      id: "2",
      name: "Browse Listings",
      icon: "search-outline",
      action: () => navigation.navigate("Search"),
    },
    {
      id: "3",
      name: "My Ads",
      icon: "list-outline",
      action: () => navigation.navigate("MyAds"),
    },
    {
      id: "4",
      name: "Saved Items",
      icon: "heart-outline",
      action: () => navigation.navigate("SavedItems"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView style={styles.header} delay={100}>
          <Text style={styles.headerTitle}>MarketPlace</Text>
          <TouchableOpacity
            style={styles.profileButton}
            accessibilityLabel="View Profile"
            accessibilityRole="button"
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="person-outline" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </FadeInView>

        {/* Promotional Banner */}
        <FadeInView style={styles.bannerContainer} delay={150}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
            }}
            style={styles.bannerImage}
            resizeMode="cover"
            accessibilityLabel="Promotional banner"
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Big Sale!</Text>
            <Text style={styles.bannerSubtitle}>
              Up to 50% off on Electronics
            </Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() =>
                navigation.navigate("Search", { category: "Electronics" })
              }
              accessibilityLabel="Shop now"
            >
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </FadeInView>

        {/* Featured Listings Card */}
        <FadeInView style={styles.featuredCard} delay={200}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Listings</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              accessibilityLabel="View all listings"
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            {featuredListings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredItem}
                accessibilityRole="button"
                accessibilityLabel={`View ${item.title}`}
                onPress={() => navigation.navigate("Search")}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.featuredImage}
                    resizeMode="cover"
                    accessibilityLabel={`${item.title} image`}
                  />
                  {(item.isNew || item.isFeatured) && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {item.isNew ? "New" : "Featured"}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.featuredDetails}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <Text style={styles.featuredPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </FadeInView>

        {/* Quick Actions Card */}
        <FadeInView style={styles.actionsCard} delay={300}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionButton}
                onPress={action.action}
                accessibilityLabel={action.name}
                accessibilityRole="button"
              >
                <Ionicons name={action.icon} size={28} color="#FFFFFF" />
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </FadeInView>

        {/* Categories Card */}
        <FadeInView style={styles.categoriesCard} delay={400}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  { backgroundColor: `${category.color}10` },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Browse ${category.name}`}
                onPress={() =>
                  navigation.navigate("Search", { category: category.name })
                }
              >
                <Ionicons
                  name={category.icon}
                  size={32}
                  color={category.color}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  profileButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  bannerImage: {
    width: "100%",
    height: 160,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bannerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  bannerButton: {
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  featuredCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  viewAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  featuredScroll: {
    flexDirection: "row",
  },
  featuredItem: {
    width: 180,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F9FAFB",
  },
  imageContainer: {
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: 120,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  featuredDetails: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  actionsCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  categoriesCard: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "30%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 8,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default HomeScreen;
