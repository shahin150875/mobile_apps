import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const CATEGORIES = ['All', 'Furniture', 'Plants', 'Clothing', 'Decor'];

const ALL_ITEMS = [
  { id: '1', title: 'Vintage Wood Table', category: 'Furniture', owner: 'Sarah M.', icon: 'cafe-outline' },
  { id: '2', title: 'Monstera Deliciosa', category: 'Plants', owner: 'Maya P.', icon: 'flower-outline' },
  { id: '3', title: 'Knit Sweater', category: 'Clothing', owner: 'Elena R.', icon: 'shirt-outline' },
  { id: '4', title: 'Ceramic Small Pot', category: 'Decor', owner: 'Alex T.', icon: 'grid-outline' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // সার্চ এবং ক্যাটাগরি অনুযায়ী ডাটা ফিল্টার
  const filteredItems = ALL_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* হেডার */}
      <Text style={styles.headerTitle}>Search Items</Text>

      {/* সার্চ ইনপুট বার */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search items, plants, furniture..."
          placeholderTextColor={Colors.textMuted}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* ক্যাটাগরি ফিল্টার ট্যাগ (ক্লিক করলে কালার চেঞ্জ হবে ও ফিল্টার হবে) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.chip, isActive && styles.activeChip]}>
              <Text style={[styles.chipText, isActive && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* সার্চ রেজাল্ট গ্রিড */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.imagePlaceholder}>
                <Ionicons name={item.icon as any} size={36} color={Colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardOwner}>Offered by {item.owner}</Text>

              {/* View Trade বাটনে ক্লিক করলে Trade পেজে চলে যাবে */}
              <TouchableOpacity 
                style={styles.tradeButton}
                onPress={() => router.push('/trade')}
              >
                <Text style={styles.tradeButtonText}>View Trade</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noResultText}>No items found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textDark,
  },
  categoryContainer: {
    maxHeight: 40,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFF',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#E0E4D7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  cardOwner: {
    fontSize: 11,
    color: Colors.textMuted,
    marginVertical: 4,
  },
  tradeButton: {
    backgroundColor: Colors.buttonBrown,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  tradeButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  noResultText: {
    color: Colors.textMuted,
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
  },
});