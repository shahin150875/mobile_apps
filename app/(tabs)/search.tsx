import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const CATEGORIES = ['All', 'Furniture', 'Plants', 'Clothing', 'Decor'];

const PRODUCTS = [
  { id: '1', title: 'Vintage Wood Table', seller: 'Sarah M.', icon: 'cafe-outline' },
  { id: '2', title: 'Monstera Deliciosa', seller: 'Maya P.', icon: 'flower-outline' },
  { id: '3', title: 'Knit Sweater', seller: 'Elena R.', icon: 'shirt-outline' },
  { id: '4', title: 'Ceramic Small Pot', seller: 'Alex T.', icon: 'grid-outline' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Search Items</Text>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search items, plants, furniture..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter Chips */}
      <View style={{ height: 45, marginBottom: 12 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.chip,
                selectedCategory === category && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === category && styles.activeChipText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name={item.icon as any} size={36} color="#86EFAC" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>Offered by {item.seller}</Text>
              
              {/* Click Event Added Here */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/modal')}
              >
                <Text style={styles.actionButtonText}>View Trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  categoryContainer: {
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
  },
  activeChip: {
    backgroundColor: '#15803D',
  },
  chipText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 12,
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 10,
    margin: 4,
    justify: 'space-between',
  },
  imagePlaceholder: {
    height: 80,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  cardSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#451A03',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  actionButtonText: {
    color: '#FDBA74',
    fontWeight: '600',
    fontSize: 12,
  },
});