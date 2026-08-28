import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function TradeScreen() {
  const router = useRouter();

  // অফার সিলেক্ট করার স্টেট
  const [selectedOffer, setSelectedOffer] = useState<'monstera' | 'ceramic' | null>('monstera');

  const handleSendProposal = () => {
    if (!selectedOffer) {
      Alert.alert('Selection Required', 'Please select an item from your offer list before sending a proposal.');
      return;
    }

    Alert.alert('Success', 'Proposal sent successfully!', [
      {
        text: 'Open Chat',
        onPress: () => router.push('/chat'),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Exchange Proposal</Text>

      {/* চাহিদার আইটেম সেকশন */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>YOU ARE REQUESTING</Text>
        <View style={styles.itemRow}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="cafe-outline" size={32} color={Colors.primary} />
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>Vintage Wood Coffee Table</Text>
            <Text style={styles.itemSub}>Solid oak mid-century style coffee table.</Text>
            <Text style={styles.ownerText}>Offered by Sarah M.</Text>
          </View>
        </View>
      </View>

      {/* আপনার অফার সেকশন */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>YOUR OFFER</Text>
        <Text style={styles.subHint}>Select an item from your inventory to trade.</Text>

        <View style={styles.offerRow}>
          {/* Monstera Plant কার্ড */}
          <TouchableOpacity
            style={[
              styles.selectedOfferBox,
              selectedOffer === 'monstera' && styles.activeOfferBox,
            ]}
            onPress={() => setSelectedOffer(selectedOffer === 'monstera' ? null : 'monstera')}
            activeOpacity={0.8}
          >
            <Ionicons name="flower-outline" size={24} color={Colors.primary} />
            <Text style={styles.offerText}>Monstera Plant</Text>
            {selectedOffer === 'monstera' && (
              <Ionicons name="checkmark-circle" size={18} color={Colors.primary} style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          {/* Add Item বাটন */}
          <TouchableOpacity
            style={styles.addOfferBox}
            onPress={() => {
              Alert.alert('Add Item', 'Monstera Plant is selected. You can tap it to deselect.');
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={26} color={Colors.textMuted} />
            <Text style={styles.addText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* প্রপোজাল পাঠাবার বাটন */}
      <TouchableOpacity
        style={styles.brownButton}
        onPress={handleSendProposal}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Send Proposal</Text>
        <Ionicons name="paper-plane-outline" size={18} color="#FFF" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subHint: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 65,
    height: 65,
    backgroundColor: '#E0E4D7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  itemSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginVertical: 2,
  },
  ownerText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedOfferBox: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  activeOfferBox: {
    backgroundColor: '#E0E4D7',
    borderColor: Colors.primary,
  },
  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  offerText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textDark,
    marginTop: 4,
  },
  addOfferBox: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  addText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  brownButton: {
    backgroundColor: Colors.buttonBrown,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});