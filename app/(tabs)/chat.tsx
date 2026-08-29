import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! Thanks for reaching out. Yes, the coffee grinder is still available.', sender: 'other' },
    { id: 2, text: 'Hey Sarah! That’s perfect. I have three medium-sized pots ready for trade.', sender: 'me' },
    { id: 3, text: 'Those look lovely! Would you like to meet up this weekend?', sender: 'other' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputText, sender: 'me' }]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.userName}>Marcus H.</Text>
          <Text style={styles.userStatus}>Active now</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messageList} contentContainerStyle={{ paddingVertical: 16 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userName: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  userStatus: { color: '#10B981', fontSize: 12 },
  messageList: { flex: 1, paddingHorizontal: 16 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  otherMessage: {
    backgroundColor: '#1E1E1E',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  myMessage: {
    backgroundColor: '#14532D',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20 },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#15803D',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});