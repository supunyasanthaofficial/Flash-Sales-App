// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Platform,
//   Animated,
//   Easing,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const FadeInView = ({ children, style, delay = 0 }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         delay,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 600,
//         delay,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, scaleAnim, delay]);

//   return (
//     <Animated.View
//       style={{ ...style, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
//     >
//       {children}
//     </Animated.View>
//   );
// };

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   const [message, setMessage] = useState("");
//   const scrollViewRef = useRef(null);

//   const messages = [
//     {
//       id: "1",
//       text: "Hi, is the iPhone 14 Pro still available?",
//       sender: "other",
//       timestamp: "10:30 AM",
//     },
//     {
//       id: "2",
//       text: "Yes, it's available! In great condition.",
//       sender: "user",
//       timestamp: "10:32 AM",
//     },
//     {
//       id: "3",
//       text: "Can you share more photos?",
//       sender: "other",
//       timestamp: "10:35 AM",
//     },
//     {
//       id: "4",
//       text: "Sure, I'll send them shortly.",
//       sender: "user",
//       timestamp: "10:36 AM",
//     },
//   ];

//   const handleSend = () => {
//     if (message.trim()) {
//       // Placeholder for sending message (e.g., API call)
//       setMessage("");
//       // Scroll to bottom
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <FadeInView style={styles.header} delay={100}>
//         <TouchableOpacity
//         // onPress={() => navigation.navigate("Home")}
//         // style={styles.backButton}
//         // accessibilityLabel="Go Back to Home"
//         // accessibilityRole="button"
//         ></TouchableOpacity>
//         <Text style={styles.headerTitle}>Chat with Seller</Text>
//       </FadeInView>

//       {/* Chat Messages */}
//       <ScrollView
//         style={styles.chatContainer}
//         contentContainerStyle={styles.chatContent}
//         showsVerticalScrollIndicator={false}
//         ref={scrollViewRef}
//         onContentSizeChange={() =>
//           scrollViewRef.current.scrollToEnd({ animated: true })
//         }
//       >
//         <FadeInView delay={200}>
//           {messages.map((msg) => (
//             <View
//               key={msg.id}
//               style={[
//                 styles.messageBubble,
//                 msg.sender === "user"
//                   ? styles.userMessage
//                   : styles.otherMessage,
//               ]}
//             >
//               <Text style={styles.messageText}>{msg.text}</Text>
//               <Text style={styles.messageTimestamp}>{msg.timestamp}</Text>
//             </View>
//           ))}
//         </FadeInView>
//       </ScrollView>

//       {/* Message Input */}
//       <FadeInView style={styles.inputContainer} delay={300}>
//         <TextInput
//           style={styles.messageInput}
//           placeholder="Type your message..."
//           placeholderTextColor="#6B7280"
//           value={message}
//           onChangeText={setMessage}
//           accessibilityLabel="Message input"
//           accessibilityRole="text"
//         />
//         <TouchableOpacity
//           style={styles.sendButton}
//           onPress={handleSend}
//           accessibilityLabel="Send message"
//           accessibilityRole="button"
//         >
//           <Ionicons name="send" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </FadeInView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     paddingTop: Platform.OS === "ios" ? 50 : 30,
//     backgroundColor: "#1F2937",
//     borderBottomWidth: 1,
//     borderBottomColor: "#4B5563",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: "#FFFFFF",
//     letterSpacing: 0.5,
//     fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
//   },
//   chatContainer: {
//     flex: 1,
//     marginHorizontal: 16,
//     marginTop: 16,
//   },
//   chatContent: {
//     paddingBottom: 16,
//   },
//   messageBubble: {
//     maxWidth: "80%",
//     padding: 12,
//     borderRadius: 12,
//     marginVertical: 8,
//   },
//   userMessage: {
//     backgroundColor: "#3B82F6",
//     alignSelf: "flex-end",
//   },
//   otherMessage: {
//     backgroundColor: "#E5E7EB",
//     alignSelf: "flex-start",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#1F2937",
//     fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
//   },
//   messageTimestamp: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 4,
//     textAlign: "right",
//     fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 16,
//     marginBottom: 24,
//     marginTop: 8,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   messageInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1F2937",
//     paddingVertical: 12,
//     fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
//   },
//   sendButton: {
//     backgroundColor: "#3B82F6",
//     padding: 12,
//     borderRadius: 8,
//   },
// });

// export default ChatScreen;
import { View, Text } from "react-native";
import React from "react";

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;
