import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext'; // গ্লোবাল থিম হুক ইম্পোর্ট করা হলো

export default function HomeScreen() {
  const { isDarkMode } = useTheme(); // ডার্ক মোড স্টেট নেওয়া হলো

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>ShopEasy 🛍️</Text>
        <Text style={[styles.subTitle, isDarkMode && styles.subTitleDark]}>Find your favorite products</Text>
      </View>

      {/* Hero Banner */}
      <View style={[styles.banner, isDarkMode && styles.bannerDark]}>
        <Text style={styles.bannerText}>Special Offer!</Text>
        <Text style={styles.bannerSubText}>Get up to 50% OFF on Electronics</Text>
      </View>

      {/* Featured Products */}
      <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Featured Products</Text>

      <View style={styles.productGrid}>
        {/* Product Card 1 */}
        <View style={[styles.card, isDarkMode && styles.cardDark]}>
          <Text style={styles.productEmoji}>🎧</Text>
          <Text style={[styles.productName, isDarkMode && styles.textDark]}>Wireless Headphones</Text>
          <Text style={[styles.productPrice, isDarkMode && styles.priceDark]}>$99.99</Text>
          <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Card 2 */}
        <View style={[styles.card, isDarkMode && styles.cardDark]}>
          <Text style={styles.productEmoji}>⌚</Text>
          <Text style={[styles.productName, isDarkMode && styles.textDark]}>Smart Watch</Text>
          <Text style={[styles.productPrice, isDarkMode && styles.priceDark]}>$149.99</Text>
          <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]}>
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
    backgroundColor: '#FAF7F2', // আপনার অ্যাপের ওয়ার্ম ব্যাকগ্রাউন্ড কালার
    padding: 16,
    paddingTop: 50,
  },
  containerDark: {
    backgroundColor: '#1C1917', // ডার্ক মোড ব্যাকগ্রাউন্ড
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
  subTitleDark: {
    color: '#A8A29E',
  },
  textDark: {
    color: '#FFFFFF',
  },
  banner: {
    backgroundColor: '#143628', // আপনার থিমের সাথে ম্যাচিং ডিপ ফরেস্ট গ্রিন
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  bannerDark: {
    backgroundColor: '#292524', // ডার্ক মোড ব্যানার কালার
    borderWidth: 1,
    borderColor: '#44403C',
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
  cardDark: {
    backgroundColor: '#292524', // ডার্ক মোডে কার্ডের রঙ
    borderWidth: 1,
    borderColor: '#44403C',
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
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#143628',
    marginBottom: 10,
  },
  priceDark: {
    color: '#4ADE80', // ডার্ক মোডে দামের জন্য সুন্দর সবুজ রঙ
  },
  button: {
    backgroundColor: '#143628',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#44403C', // ডার্ক মোডে বাটনের রঙ
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});