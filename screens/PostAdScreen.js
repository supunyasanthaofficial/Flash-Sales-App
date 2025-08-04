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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

// Create a context for listings
export const ListingsContext = createContext({
  items: [],
  categories: [],
  addListing: () => {},
  addCategory: () => {},
});

export const ListingsProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "iPhone 14 Pro",
      price: "Rs.300000",
      category: "Electronics",
      image:
        "https://cdn.pixabay.com/photo/2022/05/02/14/28/smartphone-7169689_960_720.jpg",
      phone: "+1234567890",
    },
    {
      id: "2",
      title: "Leather Jacket",
      price: "Rs.10000",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phone: "+1234567891",
    },
    {
      id: "3",
      title: "Coffee Table",
      price: "Rs.50000",
      category: "Home & Garden",
      image:
        "https://cdn.pixabay.com/photo/2017/01/23/06/05/smile-2001662_1280.jpg",
      phone: "+1234567892",
    },
    {
      id: "4",
      title: "Vintage Book",
      price: "Rs.2000",
      category: "Books",
      image:
        "https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_960_720.jpg",
      phone: "+1234567893",
    },
  ]);

  const [categories, setCategories] = useState([
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Garden" },
    { id: "4", name: "Books" },
  ]);

  const addListing = (newListing) => {
    console.log("Adding new listing:", newListing);
    setItems((prevItems) => [...prevItems, newListing]);
  };

  const addCategory = (newCategory) => {
    if (
      !newCategory ||
      categories.some(
        (cat) => cat.name.toLowerCase() === newCategory.toLowerCase()
      )
    ) {
      return;
    }
    console.log("Adding new category:", newCategory);
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: (prevCategories.length + 1).toString(), name: newCategory },
    ]);
  };

  return (
    <ListingsContext.Provider
      value={{ items, categories, addListing, addCategory }}
    >
      {children}
    </ListingsContext.Provider>
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

const PostAdScreen = () => {
  const navigation = useNavigation();
  const context = useContext(ListingsContext);
  const { addListing, addCategory, categories } = context || {};
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [images, setImages] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const handleImageUpload = async () => {
    if (images.length >= 3) {
      alert("You can upload a maximum of 3 images!");
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const finalCategory = showCustomCategory ? customCategory.trim() : category;
    if (
      !title ||
      !price ||
      !description ||
      !finalCategory ||
      images.length === 0
    ) {
      alert("Please fill in all required fields and upload at least one image");
      return;
    }
    if (showCustomCategory && !finalCategory) {
      alert("Please enter a valid custom category");
      return;
    }

    const newListing = {
      id: Date.now().toString(),
      title: title.trim(),
      price: `Rs.${price}`,
      category: finalCategory,
      image: images[0], // Use the first image as the primary image
      phone: "+1234567890", // Placeholder phone number
    };

    if (addListing && addCategory) {
      addListing(newListing);
      if (showCustomCategory) {
        addCategory(finalCategory);
      }
      console.log("New listing added:", newListing);
      alert("Ad posted successfully!");
      navigation.navigate("Home");
      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setCustomCategory("");
      setImages([]);
      setShowCustomCategory(false);
    } else {
      console.error("ListingsContext not available");
      alert("Error: Unable to post ad. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <FadeInView style={styles.header} delay={100}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.backButton}
          accessibilityLabel="Go Back to Search "
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post an Ad</Text>
      </FadeInView>

      {/* Form */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FadeInView style={styles.formCard} delay={200}>
          <Text style={styles.formTitle}>Create Your Listing</Text>

          {/* Title Input */}
          <Text style={styles.label}>Item Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter item title"
            placeholderTextColor="#6B7280"
            value={title}
            onChangeText={setTitle}
            accessibilityLabel="Item title input"
          />

          {/* Price Input */}
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price (e.g., 30000)"
            placeholderTextColor="#6B7280"
            value={price}
            onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))} // Only allow numbers
            keyboardType="numeric"
            accessibilityLabel="Price input"
          />

          {/* Description Input */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe your item"
            placeholderTextColor="#6B7280"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            accessibilityLabel="Description input"
          />

          {/* Category Selection */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.name &&
                    !showCustomCategory &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => {
                  setCategory(cat.name);
                  setShowCustomCategory(false);
                }}
                accessibilityLabel={`Select ${cat.name} category`}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat.name &&
                      !showCustomCategory &&
                      styles.categoryTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.categoryButton,
                showCustomCategory && styles.categoryButtonActive,
              ]}
              onPress={() => {
                setShowCustomCategory(true);
                setCategory("");
              }}
              accessibilityLabel="Add custom category"
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.categoryText,
                  showCustomCategory && styles.categoryTextActive,
                ]}
              >
                Custom
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Category Input */}
          {showCustomCategory && (
            <>
              <Text style={styles.label}>Custom Category</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter custom category"
                placeholderTextColor="#6B7280"
                value={customCategory}
                onChangeText={setCustomCategory}
                accessibilityLabel="Custom category input"
              />
            </>
          )}

          {/* Image Upload */}
          <Text style={styles.label}>Add Images (Max 3)</Text>
          <TouchableOpacity
            style={[
              styles.imageButton,
              images.length >= 3 && styles.imageButtonDisabled,
            ]}
            onPress={handleImageUpload}
            disabled={images.length >= 3}
            accessibilityLabel="Upload image"
            accessibilityRole="button"
          >
            <Ionicons
              name="image-outline"
              size={24}
              color={images.length >= 3 ? "#6B7280" : "#3B82F6"}
            />
            <Text
              style={[
                styles.imageButtonText,
                images.length >= 3 && styles.imageButtonTextDisabled,
              ]}
            >
              {images.length > 0
                ? `${images.length}/3 Images Selected`
                : "Upload Images"}
            </Text>
          </TouchableOpacity>

          {/* Image Previews */}
          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imagePreviewContainer}
            >
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image
                    source={{ uri }}
                    style={styles.imagePreview}
                    resizeMode="cover"
                    accessibilityLabel={`Uploaded image ${index + 1}`}
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                    accessibilityLabel={`Remove image ${index + 1}`}
                    accessibilityRole="button"
                  >
                    <Ionicons name="close-circle" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            accessibilityLabel="Post ad"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Post Ad</Text>
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
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryButton: {
    width: "31%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#3B82F6",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 16,
  },
  imageButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginLeft: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  imageButtonTextDisabled: {
    color: "#6B7280",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imagePreviewWrapper: {
    position: "relative",
    marginRight: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default PostAdScreen;
