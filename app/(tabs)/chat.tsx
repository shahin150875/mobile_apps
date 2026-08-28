import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! Thanks for reaching out. Yes, the coffee grinder is still available.', sender: 'other' },
    { id: '2', text: 'Hey Sarah! That’s perfect. I have three medium-sized pots ready for trade.', sender: 'me' },
    { id: '3', text: 'Those look lovely! Would you like to meet up this weekend?', sender: 'other' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    // নতুন মেসেজ পাঠালে স্ক্রিন নিচে স্ক্রোল হবে
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* হেডার */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={36} color={Colors.primary} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.chatName}>Marcus H.</Text>
          <Text style={styles.statusText}>Active now</Text>
        </View>
      </View>

      {/* চ্যাট মেসেজ এলাকা */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={msg.sender === 'me' ? styles.sentBubble : styles.receivedBubble}
          >
            <Text style={msg.sender === 'me' ? styles.sentText : styles.receivedText}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* ইনপুট বার */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          multiline={false}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} activeOpacity={0.7}>
          <Ionicons name="send" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  chatName: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  statusText: { fontSize: 11, color: Colors.primary },
  chatArea: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  receivedBubble: { backgroundColor: '#E0E4D7', padding: 12, borderRadius: 16, borderBottomLeftRadius: 4, alignSelf: 'flex-start', maxWidth: '80%', marginBottom: 12 },
  receivedText: { color: Colors.textDark, fontSize: 14 },
  sentBubble: { backgroundColor: Colors.primary, padding: 12, borderRadius: 16, borderBottomRightRadius: 4, alignSelf: 'flex-end', maxWidth: '80%', marginBottom: 12 },
  sentText: { color: '#FFF', fontSize: 14 },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: Colors.cardBg, borderTopWidth: 1, borderTopColor: Colors.border, marginBottom: 10 },
  input: { flex: 1, fontSize: 14, color: Colors.textDark, paddingHorizontal: 12, height: 40 },
  sendBtn: { backgroundColor: Colors.primary, padding: 10, borderRadius: 20, marginLeft: 8, justifyContent: 'center', alignItems: 'center' },
});
