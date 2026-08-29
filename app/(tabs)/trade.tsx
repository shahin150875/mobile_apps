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

export default function TradeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Create New Listing</Text>

      {/* Upload Box */}
      <TouchableOpacity style={styles.uploadCard}>
        <Ionicons name="camera-outline" size={36} color="#86EFAC" />
        <Text style={styles.uploadText}>Add Photos of Item</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Item Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Vintage Wooden Chair"
          placeholderTextColor="#6B7280"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe condition, size, or what you want to trade for..."
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Post Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50, paddingHorizontal: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  uploadCard: {
    height: 140,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: { color: '#9CA3AF', marginTop: 8, fontSize: 14 },
  formGroup: { marginBottom: 16 },
  label: { color: '#D1D5DB', fontSize: 14, fontWeight: '500', marginBottom: 6 },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: {
    backgroundColor: '#15803D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});