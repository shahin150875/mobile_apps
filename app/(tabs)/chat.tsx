import React, { useState } from 'react';
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
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import { useTheme } from '@/hooks/ThemeContext';

interface Message {
  id: string;
  sender: 'other' | 'me';
  text?: string;
  image?: string;
  document?: { name: string; size?: number };
  location?: string;
  audio?: boolean;
  time: string;
}

interface ChatListItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isUnread?: boolean;
  isFavorite?: boolean;
  isMyMessage?: boolean;
  isSeen?: boolean;
  activeStatus?: string;
}

const INITIAL_CHATS: ChatListItem[] = [
  {
    id: '1',
    name: 'Customer Name',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'বিস্তারিত আপনাকে একটু পরেই জানাচ্ছি।',
    time: '16:06 PM',
  },
  {
    id: '2',
    name: 'Hasib Ccn',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Voice message (0:03)',
    time: '17:35 PM',
    isUnread: true,
    isFavorite: false,
    isMyMessage: true,
    isSeen: true,
    activeStatus: 'Active 25m ago',
  },
  {
    id: '3',
    name: 'আশিক c',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    lastMessage: "He isn't available in online and offline also",
    time: '6:07 PM',
    isUnread: false,
    isFavorite: true,
    isMyMessage: false,
    activeStatus: 'Active',
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'other',
    text: "আসসালামু আলাইকুম। বিস্তারিত আপনাকে একটু পরেই জানাচ্ছি।",
    time: '6:05 PM',
  }
];

const CUSTOMER_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop';

export default function AppNavigator() {
  const { isDarkMode } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<'home' | 'chat'>('home');
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favourites'>('all');

  const filteredChats = INITIAL_CHATS.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'unread') {
      return chat.isUnread;
    } else if (activeFilter === 'favourites') {
      return chat.isFavorite;
    }
    return true;
  });

  // Dynamic Theme Variables
  const containerBg = isDarkMode ? '#121212' : '#FFFFFF';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#0F172A';
  const subTextColor = isDarkMode ? '#A8A29E' : '#94A3B8';
  const borderColor = isDarkMode ? '#333333' : '#F1F5F9';
  const primaryBlue = isDarkMode ? '#4ADE80' : '#2563EB';

  if (currentScreen === 'home') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: containerBg }]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={containerBg} />
        
        <View style={[styles.homeHeader, { backgroundColor: containerBg }]}>
          <Text style={[styles.messengerTitle, { color: textColor }]}>Messenger</Text>
        </View>

        <View style={[styles.searchBarWrapper, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F1F5F9' }]}>
          <Ionicons name="search" size={18} color={subTextColor} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search..."
            placeholderTextColor={subTextColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.chip, activeFilter === 'all' && { backgroundColor: primaryBlue }, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F1F5F9' }]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, activeFilter === 'all' && { color: '#FFFFFF' }, { color: subTextColor }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, activeFilter === 'unread' && { backgroundColor: primaryBlue }, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F1F5F9' }]}
            onPress={() => setActiveFilter('unread')}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, activeFilter === 'unread' && { color: '#FFFFFF' }, { color: subTextColor }]}>Unread</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, activeFilter === 'favourites' && { backgroundColor: primaryBlue }, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F1F5F9' }]}
            onPress={() => setActiveFilter('favourites')}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, activeFilter === 'favourites' && { color: '#FFFFFF' }, { color: subTextColor }]}>Favourites</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chatListItem, { borderBottomWidth: 1, borderBottomColor: borderColor }]}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedChat(item);
                setCurrentScreen('chat');
              }}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.chatListAvatar} />
                {item.isFavorite && <View style={[styles.onlineBadge, { borderColor: containerBg }]} />}
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[styles.chatListName, { color: textColor }]}>{item.name}</Text>
                  <Text style={[styles.chatListTime, { color: subTextColor }]}>{item.time}</Text>
                </View>
                <View style={styles.lastMsgRow}>
                  {item.isMyMessage && (
                    <Ionicons
                      name="checkmark-done"
                      size={15}
                      color={item.isSeen ? primaryBlue : subTextColor}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text style={[styles.chatListMsg, { color: subTextColor }]} numberOfLines={1}>{item.lastMessage}</Text>
                </View>
                {item.activeStatus && (
                  <Text style={[styles.activeTimeText, { color: subTextColor }]}>{item.activeStatus}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }

  return <ChatScreen onBack={() => setCurrentScreen('home')} chatData={selectedChat} isDarkMode={isDarkMode} />;
}

function ChatScreen({ onBack, chatData, isDarkMode }: { onBack: () => void; chatData: ChatListItem | null; isDarkMode: boolean }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [activeCall, setActiveCall] = useState<'audio' | 'video' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const containerBg = isDarkMode ? '#121212' : '#FFFFFF';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#0F172A';
  const subTextColor = isDarkMode ? '#A8A29E' : '#94A3B8';
  const borderColor = isDarkMode ? '#333333' : '#F1F5F9';
  const primaryBlue = isDarkMode ? '#4ADE80' : '#2563EB';

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

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      Alert.alert('Recording', 'Voice recording started...');
    } else {
      setIsRecording(false);
      const voiceMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        audio: true,
        text: 'Voice message (0:04)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, voiceMessage]);
    }
  };

  const handleCamera = async () => {
    setShowAttachMenu(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Needed', 'Camera permission is required.');
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

  const handleGallery = async () => {
    setShowAttachMenu(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Needed', 'Gallery permission is required.');
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
          document: { name: doc.name, size: doc.size },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newDocMessage]);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not select document.');
    }
  };

  const handleSendLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission denied');
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
        location: addressStr,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, locMessage]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch location.');
    } finally {
      setLoadingLocation(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageRow, isMe ? styles.myRow : styles.otherRow]}>
        {!isMe && (
          <Image source={{ uri: chatData?.avatar || CUSTOMER_AVATAR }} style={styles.messageAvatar} />
        )}
        <View style={styles.bubbleContainer}>
          <View style={[styles.bubble, isMe ? { backgroundColor: primaryBlue, borderBottomRightRadius: 4 } : { backgroundColor: isDarkMode ? '#252525' : '#F1F5F9', borderBottomLeftRadius: 4 }]}>
            {item.image && (
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedImage(item.image)}>
                <Image source={{ uri: item.image }} style={styles.messageImage} />
              </TouchableOpacity>
            )}
            {item.document && (
              <View style={styles.docContainer}>
                <Ionicons name="document-text" size={24} color={isMe ? '#FFFFFF' : textColor} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.docName, isMe ? styles.myText : { color: textColor }]} numberOfLines={1}>
                    {item.document.name}
                  </Text>
                  {item.document.size && (
                    <Text style={[styles.docSize, isMe ? { color: '#E2E8F0' } : { color: subTextColor }]}>
                      {(item.document.size / 1024).toFixed(1)} KB
                    </Text>
                  )}
                </View>
              </View>
            )}
            {item.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={20} color={isMe ? '#FFFFFF' : textColor} />
                <Text style={[styles.messageText, isMe ? styles.myText : { color: textColor }, { fontWeight: '600' }]}>
                  {item.location}
                </Text>
              </View>
            )}
            {item.text && (
              <Text style={[styles.messageText, isMe ? styles.myText : { color: textColor }]}>
                {item.text}
              </Text>
            )}
          </View>
          <View style={[styles.timeRow, isMe ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
            <Text style={[styles.timeText, { color: subTextColor }]}>{item.time}</Text>
            {isMe && <Ionicons name="checkmark-done" size={14} color={primaryBlue} style={{ marginLeft: 3 }} />}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={cardBg} />
      
      <View style={[styles.header, { backgroundColor: cardBg, borderBottomColor: borderColor }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={textColor} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image source={{ uri: chatData?.avatar || CUSTOMER_AVATAR }} style={styles.headerAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.userName, { color: textColor }]} numberOfLines={1}>{chatData?.name || 'Customer Name'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={styles.activeDot} />
              <Text style={[styles.subText, { color: subTextColor }]}>Active Now</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => setActiveCall('audio')}>
            <Ionicons name="call" size={20} color={primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => setActiveCall('video')}>
            <Ionicons name="videocam" size={20} color={primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton} onPress={() => setShowMoreMenu(true)}>
            <Ionicons name="ellipsis-vertical" size={20} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
        />

        {showAttachMenu && (
          <View style={[styles.attachMenu, { backgroundColor: cardBg }]}>
            <TouchableOpacity style={styles.attachOption} onPress={handleCamera}>
              <View style={[styles.attachIconBg, { backgroundColor: isDarkMode ? '#252525' : '#EFF6FF' }]}>
                <Ionicons name="camera" size={20} color={primaryBlue} />
              </View>
              <Text style={[styles.attachText, { color: textColor }]}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachOption} onPress={handleGallery}>
              <View style={[styles.attachIconBg, { backgroundColor: isDarkMode ? '#252525' : '#EFF6FF' }]}>
                <Ionicons name="image" size={20} color={primaryBlue} />
              </View>
              <Text style={[styles.attachText, { color: textColor }]}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachOption} onPress={handleDocument}>
              <View style={[styles.attachIconBg, { backgroundColor: isDarkMode ? '#252525' : '#EFF6FF' }]}>
                <Ionicons name="document-text" size={20} color={primaryBlue} />
              </View>
              <Text style={[styles.attachText, { color: textColor }]}>Document</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.inputContainer, { backgroundColor: cardBg, borderTopColor: borderColor }]}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowAttachMenu((prev) => !prev)}>
            <Ionicons name="add-circle" size={28} color={primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleGallery}>
            <Ionicons name="image-outline" size={22} color={subTextColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSendLocation} disabled={loadingLocation}>
            {loadingLocation ? (
              <ActivityIndicator size="small" color={primaryBlue} />
            ) : (
              <Ionicons name="location-outline" size={22} color={subTextColor} />
            )}
          </TouchableOpacity>
          <View style={[styles.textInputWrapper, { backgroundColor: isDarkMode ? '#252525' : '#F1F5F9' }]}>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Aa"
              placeholderTextColor={subTextColor}
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={handleVoiceRecord} style={{ padding: 2 }}>
              <Ionicons
                name={isRecording ? "mic" : "mic-outline"}
                size={20}
                color={isRecording ? "#EF4444" : subTextColor}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: inputText.trim() ? primaryBlue : (isDarkMode ? '#252525' : '#E2E8F0') }]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={16}
              color={inputText.trim() ? '#FFFFFF' : subTextColor}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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

      <Modal visible={showMoreMenu} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMoreMenu(false)}>
          <View style={[styles.sheetContainer, { backgroundColor: cardBg }]}>
            <View style={styles.sheetHandle} />
            <Text style={[styles.sheetTitle, { color: textColor }]}>Chat Options</Text>
            <TouchableOpacity
              style={[styles.sheetOption, { borderBottomColor: borderColor }]}
              onPress={() => {
                setShowMoreMenu(false);
                setIsMuted(!isMuted);
                Alert.alert('Notifications', isMuted ? 'Notifications muted.' : 'Notifications unmuted.');
              }}
            >
              <Ionicons name={isMuted ? "notifications-outline" : "notifications-off-outline"} size={20} color={textColor} />
              <Text style={[styles.sheetOptionText, { color: textColor }]}>{isMuted ? 'Unmute Notifications' : 'Mute Notifications'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sheetOption, { borderBottomWidth: 0 }]}
              onPress={() => {
                setShowMoreMenu(false);
                Alert.alert(
                  'Clear Chat',
                  'Are you sure you want to clear messages?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Clear', style: 'destructive', onPress: () => setMessages([]) }
                  ]
                );
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
              <Text style={[styles.sheetOptionText, { color: '#EF4444' }]}>Clear Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={activeCall !== null} animationType="slide">
        <View style={styles.callScreenContainer}>
          <Image source={{ uri: chatData?.avatar || CUSTOMER_AVATAR }} style={styles.callBackgroundAvatar} />
          <View style={styles.callOverlay}>
            <View style={{ alignItems: 'center', marginTop: 100 }}>
              <Image source={{ uri: chatData?.avatar || CUSTOMER_AVATAR }} style={styles.callAvatarLarge} />
              <Text style={styles.callTitle}>{chatData?.name || 'Customer Name'}</Text>
              <Text style={styles.callStatus}>
                {activeCall === 'video' ? 'Video Calling...' : 'Ringing...'}
              </Text>
            </View>
            <View style={styles.callActions}>
              <TouchableOpacity
                style={styles.endCallButton}
                onPress={() => setActiveCall(null)}
              >
                <Ionicons name="call" size={28} color="#FFFFFF" style={{ transform: [{ rotate: '135deg' }] }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  homeHeader: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  messengerTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  searchBarWrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 24, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 15, paddingVertical: 0 },
  filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  chipText: { fontSize: 13, fontWeight: '600' },
  chatListItem: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center' },
  avatarContainer: { position: 'relative' },
  chatListAvatar: { width: 54, height: 54, borderRadius: 27 },
  onlineBadge: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E', borderWidth: 2 },
  chatListName: { fontSize: 16, fontWeight: '700' },
  chatListTime: { fontSize: 12, fontWeight: '500' },
  lastMsgRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  chatListMsg: { fontSize: 14, flex: 1 },
  activeTimeText: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'space-between', borderBottomWidth: 1 },
  backButton: { padding: 6 },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginLeft: 4 },
  headerAvatar: { width: 38, height: 38, borderRadius: 19 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  userName: { fontSize: 16, fontWeight: '700' },
  subText: { fontSize: 11 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  headerIconBtn: { padding: 8 },
  moreButton: { padding: 8 },
  chatList: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 10 },
  messageRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  myRow: { justifyContent: 'flex-end' },
  otherRow: { justifyContent: 'flex-start', gap: 8 },
  messageAvatar: { width: 28, height: 28, borderRadius: 14, marginBottom: 2 },
  bubbleContainer: { maxWidth: '75%' },
  bubble: { borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  myText: { color: '#FFFFFF' },
  messageText: { fontSize: 15, lineHeight: 20 },
  messageImage: { width: 180, height: 160, borderRadius: 12 },
  docContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  docName: { fontSize: 14, fontWeight: '600' },
  docSize: { fontSize: 11, marginTop: 2 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, paddingHorizontal: 2 },
  timeText: { fontSize: 10, fontWeight: '500' },
  attachMenu: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 16, paddingVertical: 14, borderRadius: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  attachOption: { alignItems: 'center', gap: 6 },
  attachIconBg: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  attachText: { fontSize: 12, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, gap: 8, borderTopWidth: 1 },
  iconButton: { padding: 4 },
  textInputWrapper: { flex: 1, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 15, paddingVertical: 4 },
  sendButton: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  imageModalBg: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' },
  closeImageBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  fullImage: { width: '90%', height: '70%' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheetContainer: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#CBD5E1', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  sheetOption: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1 },
  sheetOptionText: { fontSize: 15, fontWeight: '600' },
  callScreenContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  callBackgroundAvatar: { position: 'absolute', width: '100%', height: '100%', opacity: 0.15, resizeMode: 'cover' },
  callOverlay: { flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 80 },
  callAvatarLarge: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 16 },
  callTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  callStatus: { fontSize: 16, color: '#94A3B8' },
  callActions: { marginBottom: 40 },
  endCallButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center' },
});