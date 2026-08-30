import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

interface InventoryItem {
  id: string;
  title: string;
  image: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    title: 'Large Monstera Plant',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Ceramic Bowl Set',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop',
  },
];

export default function TradeScreen() {
  const router = useRouter();

  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [selectedItemId, setSelectedItemId] = useState<string>('1');
  const [addCash, setAddCash] = useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<string>('15');
  const [message, setMessage] = useState<string>(
    'Hi Sarah! I have a healthy Monstera that might look great on that table...'
  );

  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState<boolean>(false);
  const [newItemTitle, setNewItemTitle] = useState<string>('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  const requestedItem = {
    title: 'Vintage Wood Coffee Table',
    category: 'Furniture',
    description: 'Solid oak mid-century style coffee table. Minor wear on one leg, but otherwise in excellent condition.',
    owner: 'Sarah M.',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800&auto=format&fit=crop',
  };

  const selectedItem = inventory.find((item) => item.id === selectedItemId);

  const handleAddNewItem = () => {
    if (!newItemTitle || newItemTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the new item.');
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      title: newItemTitle.trim(),
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500&auto=format&fit=crop',
    };

    setInventory((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    setNewItemTitle('');
    setIsAddItemModalVisible(false);
  };

  const handleSendProposal = () => {
    if (!selectedItem) {
      Alert.alert('Error', 'Please select an item to trade.');
      return;
    }
    setIsSuccessModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0F381E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EcoTrade</Text>
        <Image source={{ uri: requestedItem.ownerAvatar }} style={styles.headerProfileImg} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>You are requesting</Text>
        <Text style={styles.sectionSubHeading}>Review the item details before sending your proposal.</Text>

        <View style={styles.requestedCard}>
          <Image source={{ uri: requestedItem.image }} style={styles.requestedImage} />
          <View style={styles.requestedInfo}>
            <View style={styles.titleCategoryRow}>
              <Text style={styles.requestedTitle}>{requestedItem.title}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{requestedItem.category}</Text>
              </View>
            </View>
            <Text style={styles.requestedDesc} numberOfLines={2}>
              {requestedItem.description}
            </Text>
            <View style={styles.ownerRow}>
              <Image source={{ uri: requestedItem.ownerAvatar }} style={styles.ownerAvatar} />
              <Text style={styles.ownerText}>
                Offered by <Text style={{ fontWeight: '700', color: '#1C1917' }}>{requestedItem.owner}</Text>
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { marginTop: 24 }]}>Your Offer</Text>
        <Text style={styles.sectionSubHeading}>Select an item from your inventory to trade.</Text>

        <View style={styles.inventoryGrid}>
          {inventory.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.inventoryCard, isSelected && styles.selectedInventoryCard]}
                onPress={() => setSelectedItemId(item.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: item.image }} style={styles.inventoryImage} />
                {isSelected && (
                  <View style={styles.checkmarkBadge}>
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                )}
                <View style={styles.inventoryTitleBox}>
                  <Text style={styles.inventoryTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.addNewCard}
            onPress={() => {
              setNewItemTitle('');
              setIsAddItemModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={28} color="#0F381E" />
            <Text style={styles.addNewText}>Add New Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cashTopUpContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAddCash(!addCash)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={addCash ? 'checkbox' : 'square-outline'}
              size={22}
              color="#0F381E"
            />
            <Text style={styles.cashTopUpLabel}>Add cash to balance the trade</Text>
          </TouchableOpacity>

          {addCash && (
            <View style={styles.cashInputRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.cashInput}
                keyboardType="numeric"
                value={cashAmount}
                onChangeText={setCashAmount}
                placeholder="0"
              />
            </View>
          )}
        </View>

        <Text style={styles.inputLabel}>MESSAGE TO OWNER (OPTIONAL)</Text>
        <View style={styles.messageBox}>
          <TextInput
            style={styles.messageInput}
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
            placeholderTextColor="#A8A29E"
          />
        </View>

        <View style={styles.previewContainer}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Trade Preview</Text>
            <Ionicons name="swap-horizontal" size={20} color="#0F381E" />
          </View>

          <View style={styles.previewCardRow}>
            <View style={styles.previewPill}>
              <Ionicons name="leaf-outline" size={16} color="#0F381E" />
              <Text style={styles.previewPillText} numberOfLines={1}>
                {selectedItem ? selectedItem.title : 'Select Item'}
                {addCash && cashAmount ? ` + $${cashAmount}` : ''}
              </Text>
            </View>

            <Text style={styles.forText}>for</Text>

            <View style={styles.previewPill}>
              <Text style={styles.previewPillText} numberOfLines={1}>
                {requestedItem.title}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendProposal} activeOpacity={0.85}>
            <Text style={styles.sendButtonText}>Send Proposal</Text>
            <Ionicons name="caret-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add New Item Modal */}
      <Modal visible={isAddItemModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Enter item name (e.g. Vintage Lamp)"
              placeholderTextColor="#A8A29E"
              value={newItemTitle}
              onChangeText={(text) => setNewItemTitle(text)}
              autoFocus={true}
            />

            <TouchableOpacity style={styles.modalBtnPrimary} onPress={handleAddNewItem} activeOpacity={0.85}>
              <Text style={styles.modalBtnPrimaryText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalBtnSecondary} 
              onPress={() => setIsAddItemModalVisible(false)} 
              activeOpacity={0.7}
            >
              <Text style={styles.modalBtnSecondaryText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={isSuccessModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#15803D" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Proposal Sent!</Text>
            <Text style={styles.modalSub}>
              Your offer has been sent to {requestedItem.owner}.
            </Text>
            <TouchableOpacity
              style={styles.modalBtnPrimary}
              onPress={() => {
                setIsSuccessModalVisible(false);
                router.push({
                  pathname: '/(tabs)/chat',
                  params: {
                    initialMessage: message,
                    tradedItem: selectedItem?.title,
                    requestedItem: requestedItem.title,
                  },
                });
              }}
            >
              <Text style={styles.modalBtnPrimaryText}>Go to Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F381E',
  },
  headerProfileImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1917',
    marginTop: 8,
  },
  sectionSubHeading: {
    fontSize: 13,
    color: '#78716C',
    marginTop: 2,
    marginBottom: 14,
  },
  requestedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEBE0',
  },
  requestedImage: {
    width: '100%',
    height: 180,
  },
  requestedInfo: {
    padding: 14,
  },
  titleCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1917',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#E2EFE0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  requestedDesc: {
    fontSize: 13,
    color: '#57534E',
    marginTop: 6,
    lineHeight: 18,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  ownerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  ownerText: {
    fontSize: 13,
    color: '#78716C',
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  inventoryCard: {
    width: '48%',
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E5DFD0',
    backgroundColor: '#FFFFFF',
  },
  selectedInventoryCard: {
    borderColor: '#0F381E',
    borderWidth: 2,
  },
  inventoryImage: {
    width: '100%',
    height: '72%',
  },
  checkmarkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#0F381E',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inventoryTitleBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
  },
  inventoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
  },
  addNewCard: {
    width: '48%',
    height: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D8D2C2',
    borderStyle: 'dashed',
    backgroundColor: '#F3EFE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F381E',
    marginTop: 2,
  },
  cashTopUpContainer: {
    marginTop: 14,
    backgroundColor: '#F3EFE3',
    borderRadius: 12,
    padding: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cashTopUpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1917',
  },
  cashInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D8D2C2',
    width: 100,
  },
  currencySymbol: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
  },
  cashInput: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1917',
    paddingVertical: 4,
    paddingHorizontal: 6,
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#57534E',
    marginTop: 18,
    letterSpacing: 0.5,
  },
  messageBox: {
    backgroundColor: '#E2EFE0',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
  },
  messageInput: {
    fontSize: 14,
    color: '#1C1917',
    minHeight: 50,
    textAlignVertical: 'top',
  },
  previewContainer: {
    backgroundColor: '#EBE5D5',
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
  },
  previewCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 6,
  },
  previewPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCD5C3',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  previewPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
    flex: 1,
  },
  forText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78716C',
  },
  sendButton: {
    backgroundColor: '#501708',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1917',
    marginBottom: 16,
  },
  modalSub: {
    fontSize: 14,
    color: '#78716C',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F5F5F4',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: '#1C1917',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E7E2D0',
  },
  modalBtnPrimary: {
    backgroundColor: '#0F381E',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalBtnSecondary: {
    paddingVertical: 12,
    marginTop: 6,
    width: '100%',
    alignItems: 'center',
  },
  modalBtnSecondaryText: {
    color: '#78716C',
    fontSize: 14,
    fontWeight: '600',
  },
});