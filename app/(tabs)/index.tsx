import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopEasy 🛍️</Text>
        <Text style={styles.subTitle}>Find your favorite products</Text>
      </View>

      {/* Hero Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Special Offer!</Text>
        <Text style={styles.bannerSubText}>Get up to 50% OFF on Electronics</Text>
      </View>

      {/* Featured Products */}
      <Text style={styles.sectionTitle}>Featured Products</Text>

      <View style={styles.productGrid}>
        {/* Product Card 1 */}
        <View style={styles.card}>
          <Text style={styles.productEmoji}>🎧</Text>
          <Text style={styles.productName}>Wireless Headphones</Text>
          <Text style={styles.productPrice}>$99.99</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Card 2 */}
        <View style={styles.card}>
          <Text style={styles.productEmoji}>⌚</Text>
          <Text style={styles.productName}>Smart Watch</Text>
          <Text style={styles.productPrice}>$149.99</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  banner: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerSubText: {
    color: '#e0e0e0',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});