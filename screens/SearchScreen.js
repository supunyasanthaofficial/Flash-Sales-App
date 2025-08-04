import React, { useRef, useEffect, useState } from "react";
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
  Linking,
  Alert,
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

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          accessibilityLabel={`Rate ${star} stars`}
        >
          <Ionicons
            name={star <= (hoverRating || rating) ? "star" : "star-outline"}
            size={16}
            color={star <= (hoverRating || rating) ? "#FBBF24" : "#6B7280"}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [ratings, setRatings] = useState({});

  const items = [
    {
      id: "1",
      title: "iPhone 14 Pro",
      price: "Rs.300000",
      category: "Electronics",
      image:
        "https://cdn.pixabay.com/photo/2022/05/02/14/28/smartphone-7169689_960_720.jpg",
      phone: "+94 741344312",
    },
    {
      id: "2",
      title: "Leather Jacket",
      price: "Rs.10000",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phone: "+94 741344312",
    },
    {
      id: "3",
      title: "Coffee Table",
      price: "Rs.50000",
      category: "Home & Garden",
      image:
        "https://cdn.pixabay.com/photo/2017/01/23/06/05/smile-2001662_1280.jpg",
      phone: "+94 741344312",
    },
    {
      id: "4",
      title: "Vintage Book",
      price: "Rs.2000",
      category: "Books",
      image:
        "https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_960_720.jpg",
      phone: "+94 741344312",
    },
    {
      id: "5",
      title: "Msi G62 Laptop",
      price: "Rs.350000",
      category: "Electronics",
      image:
        "https://storage-asset.msi.com/global/picture/image/feature/nb/2025_ARL/venture-a16-ai-a3hmg/kv/venture-a16-ai-plus-a3hm-nb.webp",
      phone: "+94 741344312",
    },
    {
      id: "6",
      title: "Nike Air Max 95",
      price: "Rs.10000",
      category: "Fashion",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f1d8b7ad-581c-4328-be64-3be58f8dcbdb/NIKE+AIR+MAX+95+BIG+BUBBLE.png",
      phone: "+94 741344312",
    },
    {
      id: "7",
      title: "Sofa",
      price: "Rs.65000",
      category: "Home & Garden",
      image:
        "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
      phone: "+94 741344312",
    },
    {
      id: "8",
      title: "A Game of Thrones-1996 Book",
      price: "Rs.6500",
      category: "Books",
      image:
        "https://th.bing.com/th/id/OSK.bd98f82f5b595bdc33d673b1395270e2?w=120&h=168&c=7&rs=1&qlt=80&o=6&dpr=1.3&pid=SANGAM",
      phone: "+94 741344312",
    },
    {
      id: "9",
      title: "2017 Yamaha FZ-10/MT-10",
      price: "Rs.850000", // Fixed capitalization
      category: "Vehicles",
      image:
        "https://s3.paultan.org/image/2016/07/2017-Yamaha-FZ-10-US-spec-MT-10-34-e1469080370611.jpg",
      phone: "+94 741344312",
    },
    {
      id: "10",
      title: "BMW M3 G81 Touring Competition",
      price: "Rs.23000000",
      category: "Vehicles",
      image: "https://www.autoblog.nl/files/2025/07/1DSC_6936-2-1600x1099.jpg",
      phone: "+94 741344312",
    },
  ];

  const filters = [
    { id: "1", name: "All", value: null },
    { id: "2", name: "Electronics", value: "Electronics" },
    { id: "3", name: "Fashion", value: "Fashion" },
    { id: "4", name: "Home & Garden", value: "Home & Garden" },
    { id: "5", name: "Books", value: "Books" },
    { id: "6", name: "Vehicles", value: "Vehicles" },
  ];

  const filteredItems = searchQuery
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!selectedFilter || item.category === selectedFilter)
      )
    : selectedFilter
    ? items.filter((item) => item.category === selectedFilter)
    : items;

  const handleBuyNow = (item) => {
    Alert.alert(
      "Confirm Purchase",
      `Are you sure you want to buy ${item.title} for ${item.price}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => Alert.alert("Success", "Purchase completed!"),
        },
      ]
    );
  };

  const handleCallSeller = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Error", "Unable to make call");
    });
  };

  const handleWhatsApp = (phone, itemTitle) => {
    const message = encodeURIComponent(`I'm interested in ${itemTitle}`);
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`).catch(
      () => {
        Alert.alert("Error", "WhatsApp is not installed");
      }
    );
  };

  const handleRating = (itemId, rating) => {
    setRatings((prev) => ({ ...prev, [itemId]: rating }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FadeInView style={styles.header} delay={100}>
        <Text style={styles.headerTitle}>Search MarketPlace</Text>
        <TouchableOpacity
          style={styles.profileButton}
          accessibilityLabel="View Profile"
          accessibilityRole="button"
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </FadeInView>

      {/* Search Bar */}
      <FadeInView style={styles.searchBarContainer} delay={200}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search items input"
          accessibilityRole="search"
        />
        <Ionicons
          name="search-outline"
          size={24}
          color="#6B7280"
          style={styles.searchIcon}
        />
      </FadeInView>

      {/* Filters */}
      <FadeInView style={styles.filterContainer} delay={300}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.value)}
              accessibilityLabel={`Filter by ${filter.name}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.value && styles.filterTextActive,
                ]}
              >
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </FadeInView>

      {/* Search Results */}
      <FadeInView style={styles.resultsContainer} delay={400}>
        <Text style={styles.sectionTitle}>
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "Result" : "Results"} Found
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FadeInView key={item.id} style={styles.resultItem} delay={500}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.resultImage}
                  resizeMode="cover"
                  accessibilityLabel={`${item.title} image`}
                />
                <View style={styles.resultDetails}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultPrice}>{item.price}</Text>
                  <Text style={styles.resultCategory}>{item.category}</Text>
                  <StarRating
                    rating={ratings[item.id] || 0}
                    setRating={(rating) => handleRating(item.id, rating)}
                  />
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.buyButton]}
                      onPress={() => handleBuyNow(item)}
                      accessibilityLabel={`Buy ${item.title}`}
                    >
                      <Text style={styles.actionButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.callButton]}
                      onPress={() => handleCallSeller(item.phone)}
                      accessibilityLabel={`Call seller for ${item.title}`}
                    >
                      <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.whatsappButton]}
                      onPress={() => handleWhatsApp(item.phone, item.title)}
                      accessibilityLabel={`Message seller on WhatsApp for ${item.title}`}
                    >
                      <Ionicons
                        name="logo-whatsapp"
                        size={16}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </FadeInView>
            ))
          ) : (
            <Text style={styles.noResultsText}>No items found</Text>
          )}
        </ScrollView>
      </FadeInView>
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
  searchBarContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  searchIcon: {
    marginLeft: 8,
  },
  filterContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#3B82F6",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  resultsContainer: {
    flex: 1,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  resultItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    alignItems: "center",
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  resultDetails: {
    flex: 1,
    justifyContent: "center",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  resultCategory: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    marginRight: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buyButton: {
    backgroundColor: "#10B981",
    flex: 1,
  },
  callButton: {
    backgroundColor: "#3B82F6",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  noResultsText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default SearchScreen;
