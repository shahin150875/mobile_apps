import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';

interface Message {
  id: string;
  sender: 'other' | 'me';
  text?: string;
  image?: string;
  document?: { name: string; size?: number };
  location?: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'other',
    text: "Hi Marcus! Thanks for reaching out. Yes, the coffee grinder is still available. I'm really looking for some good quality terracotta pots for my balcony garden in exchange.",
    time: '10:42 AM',
  },
  {
    id: '2',
    sender: 'me',
    text: "Hey Sarah! That's perfect. I actually have three medium-sized terracotta pots I'm not using anymore. They're in great condition, just need a quick rinse.",
    time: '10:45 AM',
  },
  {
    id: '3',
    sender: 'me',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?q=80&w=600&auto=format&fit=crop',
    text: "Here's a quick photo of them.",
    time: '10:47 AM',
  },
  {
    id: '4',
    sender: 'other',
    text: 'Those look lovely! That seems like a very fair trade to me. Are you free to meet up sometime this weekend?',
    time: '11:05 AM',
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    initialMessage?: string;
    tradedItem?: string;
    requestedItem?: string;
  }>();

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Trade screen থেকে পাঠানো initialMessage থাকলে তা স্বয়ংক্রিয়ভাবে মেসেজ লিস্টে যুক্ত করা
  useEffect(() => {
    if (params.initialMessage) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: 'me',
        text: params.initialMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMsg]);
    }
  }, [params.initialMessage]);

  // 1. Send Text Message
  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  // 2. Camera Button
  const handleCamera = async () => {
    setShowAttachMenu(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Needed', 'Camera permission is required to capture photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      const newImgMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        image: result.assets[0].uri,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newImgMessage]);
    }
  };

  // 3. Gallery Button
  const handleGallery = async () => {
    setShowAttachMenu(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Needed', 'Gallery permission is required to pick photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      const newImgMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        image: result.assets[0].uri,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newImgMessage]);
    }
  };

  // 4. Document Button
  const handleDocument = async () => {
    setShowAttachMenu(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const doc = result.assets[0];
        const newDocMessage: Message = {
          id: Date.now().toString(),
          sender: 'me',
          document: {
            name: doc.name,
            size: doc.size,
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newDocMessage]);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not select document.');
    }
  };

  // 5. Location Button
  const handleSendLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        setLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      let addressStr = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
      
      if (addressResponse && addressResponse.length > 0) {
        const item = addressResponse[0];
        addressStr = `${item.name || ''} ${item.street || ''}, ${item.city || ''}`.trim();
      }

      const locMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        location: `📍 ${addressStr}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, locMessage]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch current location.');
    } finally {
      setLoadingLocation(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';

    return (
      <View style={[styles.messageRow, isMe ? styles.myRow : styles.otherRow]}>
        {!isMe && (
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
            style={styles.chatAvatar}
          />
        )}
        <View style={styles.bubbleContainer}>
          <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
            {/* Image Render */}
            {item.image && (
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedImage(item.image)}>
                <Image source={{ uri: item.image }} style={styles.messageImage} />
              </TouchableOpacity>
            )}

            {/* Document Render */}
            {item.document && (
              <View style={styles.docContainer}>
                <Ionicons name="document-text" size={24} color={isMe ? '#FFFFFF' : '#0F381E'} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.docName, isMe ? styles.myText : styles.otherText]} numberOfLines={1}>
                    {item.document.name}
                  </Text>
                  {item.document.size && (
                    <Text style={styles.docSize}>
                      {(item.document.size / 1024).toFixed(1)} KB
                    </Text>
                  )}
                </View>
              </View>
            )}

            {/* Location Render */}
            {item.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={20} color={isMe ? '#FFFFFF' : '#0F381E'} />
                <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText, { fontWeight: '600' }]}>
                  {item.location}
                </Text>
              </View>
            )}

            {/* Text Message Render */}
            {item.text && (
              <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
                {item.text}
              </Text>
            )}
          </View>
          <View style={[styles.timeRow, isMe ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
            <Text style={styles.timeText}>{item.time}</Text>
            {isMe && <Ionicons name="checkmark-done" size={16} color="#15803D" style={{ marginLeft: 4 }} />}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.userInfo} onPress={() => setShowMoreMenu(true)}>
          <View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
              style={styles.headerAvatar}
            />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.userName}>Sarah M.</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star-outline" size={14} color="#1C1917" />
              <Text style={styles.ratingText}>4.9 (12 trades)</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreButton} onPress={() => setShowMoreMenu(true)}>
          <Ionicons name="ellipsis-vertical" size={22} color="#1C1917" />
        </TouchableOpacity>
      </View>

      {/* Trade Banner (Dynamic with params if available) */}
      <View style={styles.tradeCard}>
        <View style={styles.tradeLeft}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200&auto=format&fit=crop' }}
            style={styles.tradeImage}
          />
          <View>
            <Text style={styles.tradeLabel}>PROPOSED TRADE</Text>
            <Text style={styles.tradeTitle}>
              {params.requestedItem ? params.requestedItem : 'Vintage Coffee Grinder'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() =>
            Alert.alert(
              'Trade Item Details',
              `Requested: ${params.requestedItem || 'Vintage Coffee Grinder'}\nOffered: ${params.tradedItem || 'Terracotta Pots'}`
            )
          }
        >
          <Text style={styles.detailsBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatList}
          ListHeaderComponent={
            <View style={styles.dateChipContainer}>
              <View style={styles.dateChip}>
                <Text style={styles.dateText}>Today</Text>
              </View>
            </View>
          }
        />

        {/* Attachment Options Drawer */}
        {showAttachMenu && (
          <View style={styles.attachMenu}>
            <TouchableOpacity style={styles.attachOption} onPress={handleCamera}>
              <Ionicons name="camera-outline" size={22} color="#0F381E" />
              <Text style={styles.attachText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attachOption} onPress={handleGallery}>
              <Ionicons name="images-outline" size={22} color="#0F381E" />
              <Text style={styles.attachText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.attachOption} onPress={handleDocument}>
              <Ionicons name="document-text-outline" size={22} color="#0F381E" />
              <Text style={styles.attachText}>Document</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowAttachMenu((prev) => !prev)}
          >
            <Ionicons name={showAttachMenu ? 'close-circle-outline' : 'image-outline'} size={24} color="#1C1917" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleSendLocation} disabled={loadingLocation}>
            {loadingLocation ? (
              <ActivityIndicator size="small" color="#0F381E" />
            ) : (
              <Ionicons name="location-outline" size={24} color="#1C1917" />
            )}
          </TouchableOpacity>

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#A8A29E"
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Image Preview Modal */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.imageModalBg}>
          <TouchableOpacity style={styles.closeImageBtn} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close-circle" size={36} color="#FFFFFF" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* Options Menu Modal */}
      <Modal visible={showMoreMenu} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMoreMenu(false)}>
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHandle} />
            <TouchableOpacity style={styles.sheetOption} onPress={() => { setShowMoreMenu(false); Alert.alert('Profile', 'Opening Sarah M. Profile'); }}>
              <Ionicons name="person-outline" size={20} color="#1C1917" />
              <Text style={styles.sheetOptionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetOption} onPress={() => { setShowMoreMenu(false); Alert.alert('Muted', 'Notifications muted'); }}>
              <Ionicons name="notifications-off-outline" size={20} color="#1C1917" />
              <Text style={styles.sheetOptionText}>Mute Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetOption} onPress={() => { setShowMoreMenu(false); Alert.alert('Cleared', 'Chat cleared'); }}>
              <Ionicons name="trash-outline" size={20} color="#1C1917" />
              <Text style={styles.sheetOptionText}>Clear Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sheetOption, { borderBottomWidth: 0 }]} onPress={() => { setShowMoreMenu(false); Alert.alert('Blocked', 'User blocked'); }}>
              <Ionicons name="ban-outline" size={20} color="#DC2626" />
              <Text style={[styles.sheetOptionText, { color: '#DC2626' }]}>Block User</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FAF7EE',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1917',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#44403C',
  },
  moreButton: {
    padding: 4,
  },
  tradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EFE0',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  tradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tradeImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  tradeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#57534E',
    letterSpacing: 0.5,
  },
  tradeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
    marginTop: 2,
  },
  detailsBtn: {
    borderWidth: 1,
    borderColor: '#1C1917',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1917',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dateChipContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateChip: {
    backgroundColor: '#EBE5D5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#57534E',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 20,
  },
  bubbleContainer: {
    maxWidth: '80%',
  },
  bubble: {
    borderRadius: 20,
    padding: 14,
  },
  myBubble: {
    backgroundColor: '#0F381E',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#F0EBDC',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  myText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#1C1917',
  },
  messageImage: {
    width: 180,
    height: 160,
    borderRadius: 12,
  },
  docContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  docName: {
    fontSize: 14,
    fontWeight: '600',
  },
  docSize: {
    fontSize: 11,
    color: '#A8A29E',
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#78716C',
  },
  attachMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EBE5D5',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  attachOption: {
    alignItems: 'center',
    gap: 4,
  },
  attachText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F381E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: '#FAF7EE',
  },
  iconButton: {
    padding: 4,
  },
  textInputWrapper: {
    flex: 1,
    backgroundColor: '#ECE7D8',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    fontSize: 15,
    color: '#1C1917',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F381E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImageBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  fullImage: {
    width: '90%',
    height: '70%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D6D3D1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  sheetOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1917',
  },
});