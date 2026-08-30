import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const ALL_ITEMS = [
  {
    id: '1',
    title: 'Vintage Wood Table',
    offeredBy: 'Sarah M.',
    category: 'Furniture',
    icon: 'cafe-outline',
  },
  {
    id: '2',
    title: 'Monstera Deliciosa',
    offeredBy: 'Maya P.',
    category: 'Plants',
    icon: 'flower-outline',
  },
  {
    id: '3',
    title: 'Knit Sweater',
    offeredBy: 'Elena R.',
    category: 'Clothing',
    icon: 'shirt-outline',
  },
  {
    id: '4',
    title: 'Ceramic Small Pot',
    offeredBy: 'Alex T.',
    category: 'Decor',
    icon: 'grid-outline',
  },
];

const CATEGORIES = ['All', 'Furniture', 'Plants', 'Clothing', 'Decor'];

export default function SearchScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = ALL_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewTrade = (item: typeof ALL_ITEMS[0]) => {
    router.push({
      pathname: '/chat',
      params: {
        requestedItem: item.title,
        tradedItem: item.offeredBy,
        initialMessage: `Hi, I am interested in trading for your ${item.title} offered by ${item.offeredBy}.`,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Results Count */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Search Items</Text>
        <Text style={styles.countText}>{filteredItems.length} items found</Text>
      </View>

      {/* Search Bar with Clear Button */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#78716C" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search items, plants, furniture..."
          placeholderTextColor="#78716C"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#78716C" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Buttons */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Items List or Empty State */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#78716C" />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubText}>Try searching with another keyword</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardIconWrapper}>
                <Ionicons name={item.icon as any} size={24} color="#22C55E" />
              </View>
              <Text style={styles.categoryBadge}>{item.category}</Text>
            </View>

            <View>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>Offered by {item.offeredBy}</Text>
            </View>

            <TouchableOpacity
              style={styles.viewTradeBtn}
              onPress={() => handleViewTrade(item)}
            >
              <Text style={styles.viewTradeText}>View Trade</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  countText: {
    fontSize: 12,
    color: '#78716C',
    fontWeight: '600',
  },
  searchBarContainer: {
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
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  categoriesContainer: {
    marginBottom: 16,
    height: 40,
  },
  categoryBtn: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    height: 38,
    justifyContent: 'center',
  },
  categoryBtnActive: {
    backgroundColor: '#22C55E',
  },
  categoryText: {
    color: '#A8A29E',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#121212',
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '48%',
    borderRadius: 16,
    padding: 14,
    justifyContent: 'space-between',
    height: 190,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIconWrapper: {
    backgroundColor: '#2A2A2A',
    padding: 8,
    borderRadius: 10,
  },
  categoryBadge: {
    fontSize: 10,
    color: '#78716C',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  cardSubtitle: {
    color: '#A8A29E',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  viewTradeBtn: {
    backgroundColor: '#431407',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewTradeText: {
    color: '#FB923C',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  emptySubText: {
    color: '#78716C',
    fontSize: 14,
    marginTop: 4,
  },
});