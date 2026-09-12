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
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

interface InventoryItem {
  id: string;
  title: string;
  image: string;
  value: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    title: 'Large Monstera Plant',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500&auto=format&fit=crop',
    value: '$45',
  },
  {
    id: '2',
    title: 'Ceramic Bowl Set',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop',
    value: '$60',
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
  const [newItemDetailInput, setNewItemDetailInput] = useState<string>('');
  const [newItemValue, setNewItemValue] = useState<string>('');
  const [selectedDetailOption, setSelectedDetailOption] = useState<string>('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  const requestedItem = {
    title: 'Vintage Wood Coffee Table',
    category: 'Furniture',
    description: 'Solid oak mid-century style coffee table. Minor wear on one leg, but otherwise in excellent condition.',
    owner: 'Sarah M.',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    value: '$180',
  };

  const selectedItem = inventory.find((item) => item.id === selectedItemId);

  const getSmartImageForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('laptop') || t.includes('macbook') || t.includes('pc')) {
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&auto=format&fit=crop';
    }
    if (t.includes('phone') || t.includes('mobile') || t.includes('iphone') || t.includes('samsung') || t.includes('pixel') || t.includes('redmi') || t.includes('xiaomi')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop';
    }
    if (t.includes('house') || t.includes('home') || t.includes('room') || t.includes('building')) {
      return 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500&auto=format&fit=crop';
    }
    if (t.includes('watch') || t.includes('clock')) {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop';
    }
    if (t.includes('shoe') || t.includes('sneaker')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500&auto=format&fit=crop';
  };

  const getExtraBoxPlaceholder = () => {
    const t = newItemTitle.toLowerCase();
    if (t.includes('mobile') || t.includes('phone') || t.includes('iphone') || t.includes('redmi') || t.includes('samsung')) {
      return 'Enter Model or Brand (e.g. Samsung, Apple, Redmi)';
    }
    if (t.includes('laptop') || t.includes('pc')) {
      return 'Enter Brand or Series (e.g. Apple MacBook, Dell XPS)';
    }
    if (t.includes('watch')) {
      return 'Enter Brand (e.g. Rolex, Apple Watch, Omega)';
    }
    if (t.includes('shoe') || t.includes('sneaker')) {
      return 'Enter Brand (e.g. Nike, Adidas, New Balance)';
    }
    if (t.includes('house') || t.includes('home')) {
      return 'Enter Type (e.g. Villa, Apartment, Cottage)';
    }
    if (t.includes('plant') || t.includes('flower')) {
      return 'Enter Species (e.g. Monstera, Orchid, Fern)';
    }
    return 'Enter specific details (e.g. Model, Brand, Series)';
  };

  const getDynamicSuggestions = () => {
    const combinedText = `${newItemTitle} ${newItemDetailInput}`.toLowerCase();
    
    // --- SAMSUNG ---
    if (combinedText.includes('samsung') || combinedText.includes('galaxy')) {
      return [
        'Samsung Galaxy S10, 128GB, Prism White (2019)',
        'Samsung Galaxy Note 10+, 256GB, Aura Glow (2019)',
        'Samsung Galaxy S20 Ultra, 128GB, Cosmic Gray (2020)',
        'Samsung Galaxy Note 20 Ultra, 256GB, Mystic Bronze (2020)',
        'Samsung Galaxy S21 Ultra, 256GB, Phantom Black (2021)',
        'Samsung Galaxy S22 Ultra, 256GB, Burgundy (2022)',
        'Samsung Galaxy S23 Ultra, 512GB, Green (2023)',
        'Samsung Galaxy A54 5G, 128GB, Awesome Graphite (2023)',
        'Samsung Galaxy S24 Ultra, 512GB, Titanium Gray (2024)',
        'Samsung Galaxy S24+, 256GB, Amber Yellow (2024)',
        'Samsung Galaxy Z Fold6, 512GB, Silver Shadow (2024/2025)',
        'Samsung Galaxy A55 5G, 256GB, Awesome Iceblue (2024)'
      ];
    }

    // --- XIAOMI / REDMI ---
    if (combinedText.includes('redmi') || combinedText.includes('xiaomi')) {
      return [
        'Xiaomi Redmi Note 7, 64GB, Space Black (2019)',
        'Xiaomi Redmi Note 9 Pro, 128GB, Interstellar Gray (2020)',
        'Xiaomi Redmi Note 10 Pro, 128GB, Glacier Blue (2021)',
        'Xiaomi Redmi Note 11 Pro+, 256GB, Forest Green (2022)',
        'Xiaomi Redmi Note 12 Pro+, 256GB, Midnight Black (2023)',
        'Xiaomi Redmi Note 13 Pro+, 512GB, Midnight Black (2024)',
        'Xiaomi 14 Ultra, 512GB, Black (2024)',
        'Xiaomi Redmi Note 14 Pro+, 512GB, Frost White (Current/New)'
      ];
    }

    // --- APPLE IPHONE ---
    if (combinedText.includes('iphone') || combinedText.includes('apple')) {
      return [
        'Apple iPhone X, 64GB, Space Gray (2017)',
        'Apple iPhone 11 Pro, 256GB, Midnight Green (2019)',
        'Apple iPhone 12, 128GB, Blue (2020)',
        'Apple iPhone 13, 128GB, Starlight (2021)',
        'Apple iPhone 14 Pro Max, 256GB, Deep Purple (2022)',
        'Apple iPhone 15 Pro Max, 256GB, Natural Titanium (2023)',
        'Apple iPhone 16 Pro, 256GB, Desert Titanium (2024/Current)'
      ];
    }

    // --- GOOGLE PIXEL ---
    if (combinedText.includes('pixel') || combinedText.includes('google')) {
      return [
        'Google Pixel 3 XL, 64GB, Clearly White (2018)',
        'Google Pixel 5, 128GB, Just Black (2020)',
        'Google Pixel 6 Pro, 128GB, Stormy Black (2021)',
        'Google Pixel 7 Pro, 128GB, Obsidian (2022)',
        'Google Pixel 8 Pro, 128GB, Bay (2023)',
        'Google Pixel 9 Pro XL, 256GB, Porcelain (2024/Current)'
      ];
    }

    // --- LAPTOPS / MACBOOKS ---
    if (combinedText.includes('laptop') || combinedText.includes('macbook') || combinedText.includes('pc')) {
      return [
        'Apple MacBook Pro 15", Intel i7, 16GB RAM (2018 - Older)',
        'Apple MacBook Air 13", M1 Chip, 8GB RAM, 256GB SSD (2020)',
        'Dell XPS 15, Intel Core i7 11th Gen, RTX 3050 Ti (2021)',
        'ASUS ROG Zephyrus G14, Ryzen 9, RTX 3060 (2022)',
        'Apple MacBook Pro 14", M2 Pro, 16GB RAM, 512GB SSD (2023)',
        'Apple MacBook Pro 16", M3 Max, 36GB RAM, 1TB SSD (2024/Current)',
        'Dell XPS 16, Core Ultra 7, RTX 4070 (2024/Current)'
      ];
    }

    // --- WATCHES ---
    if (combinedText.includes('watch')) {
      return [
        'Rolex Submariner Date, Stainless Steel, Black Dial (Vintage/Classic)',
        'Apple Watch Series 4, 44mm, Space Gray Aluminum (2018)',
        'Apple Watch Series 8, 41mm, Midnight Aluminum (2022)',
        'Omega Seamaster Diver 300M, Blue Wave Dial (2023)',
        'Apple Watch Ultra 2, Titanium Case, Alpine Loop (2023/2024)',
        'Rolex GMT-Master II "Pepsi", Oystersteel (Current/New)'
      ];
    }

    // --- SHOES / SNEAKERS ---
    if (combinedText.includes('shoe') || combinedText.includes('sneaker')) {
      return [
        'Nike Air Jordan 1 Retro High "Bred", Size 10 (Classic)',
        'Adidas Yeezy Boost 350 V2 "Zebra", Size 9.5 (2017/Retocked)',
        "Nike Air Force 1 '07, All White, Size 10 (Evergreen)",
        'New Balance 990v5, Grey, Size 10.5 (2019)',
        'Nike Air Jordan 1 Retro High OG "Lost & Found", Size 10 (2022)',
        'New Balance 990v6, Grey, Size 10.5 (Current/New)'
      ];
    }

    // --- HOUSES / REAL ESTATE ---
    if (combinedText.includes('house') || combinedText.includes('home') || combinedText.includes('apartment')) {
      return [
        'Classic Suburban Family Home, Red Bricks, 3 Beds (Older Build)',
        'Mid-Century Modern House, Wooden Interior, 4 Beds (Renovated)',
        'Luxury City Penthouse Apartment, Floor-to-Ceiling Windows (Modern)',
        'Smart Eco-Villa, Solar Powered, 4 Bedrooms, Swimming Pool (Current/New)'
      ];
    }

    // --- PLANTS ---
    if (combinedText.includes('plant') || combinedText.includes('flower') || combinedText.includes('monstera')) {
      return [
        'Classic Mature Golden Pothos in Ceramic Pot (Established)',
        'Large Monstera Deliciosa, 5 Fenestrated Leaves, 10" Pot',
        'Rare Monstera Albo Variegated, Cutting with Active Node',
        'Fiddle Leaf Fig Tree, 5ft Tall, Premium Planter (Current/New)'
      ];
    }

    if (combinedText.trim() === '') {
      return [
        'Type any item above (e.g. Mobile, Laptop, Watch, Plant) to explore old, recent & current models'
      ];
    }

    return [
      'Older Classic Edition, Well Preserved, Original Box',
      'Popular Mid-Generation Release, Excellent Working Order',
      'Brand New Current Release, Sealed Box, Full Warranty'
    ];
  };

  const handleAddNewItem = () => {
    if (!newItemTitle || newItemTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the new item.');
      return;
    }

    const formattedValue = newItemValue.trim() 
      ? (newItemValue.startsWith('$') ? newItemValue.trim() : `$${newItemValue.trim()}`) 
      : '$50';

    const matchedImage = getSmartImageForTitle(`${newItemTitle} ${newItemDetailInput}`);

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      title: `${newItemTitle.trim()}${newItemDetailInput ? ` (${newItemDetailInput.trim()})` : ''}`,
      image: matchedImage,
      value: formattedValue,
    };

    setInventory((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    setNewItemTitle('');
    setNewItemDetailInput('');
    setNewItemValue('');
    setSelectedDetailOption('');
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
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#0F381E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EcoTrade</Text>
        <Image source={{ uri: requestedItem.ownerAvatar }} style={styles.headerProfileImg} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>You are requesting</Text>
        <Text style={styles.sectionSubHeading}>Review the item details before sending your proposal.</Text>

        <View style={styles.requestedCard}>
          <View style={styles.requestedImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.requestedImage} 
            />
            <View style={styles.valueBadge}>
              <Text style={styles.valueBadgeText}>{requestedItem.value}</Text>
            </View>
          </View>

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
              <Ionicons name="checkmark-circle" size={14} color="#166534" style={{ marginLeft: -2 }} />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { marginTop: 28 }]}>Your Offer</Text>
        <Text style={styles.sectionSubHeading}>Select an item from your inventory to trade.</Text>

        <View style={styles.inventoryGrid}>
          {inventory.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.inventoryCard, isSelected && styles.selectedInventoryCard]}
                onPress={() => setSelectedItemId(item.id)}
                activeOpacity={0.85}
              >
                <View style={styles.inventoryImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.inventoryImage} />
                  <View style={styles.itemValTag}>
                    <Text style={styles.itemValText}>{item.value}</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkmarkBadge}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
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
              setNewItemDetailInput('');
              setNewItemValue('');
              setSelectedDetailOption('');
              setIsAddItemModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.addIconCircle}>
              <Ionicons name="add" size={22} color="#0F381E" />
            </View>
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

        <View style={styles.quickChipsRow}>
          <TouchableOpacity 
            style={styles.chipBtn} 
            onPress={() => setMessage('Hi! Is this item still available for trade?')}
          >
            <Text style={styles.chipText}>💬 Still available?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.chipBtn} 
            onPress={() => setMessage('Hi! Can we meet locally for this swap?')}
          >
            <Text style={styles.chipText}>🤝 Local meet?</Text>
          </TouchableOpacity>
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
            <Text style={styles.previewTitle}>Trade Summary Preview</Text>
            <Ionicons name="shield-checkmark-outline" size={18} color="#0F381E" />
          </View>

          <View style={styles.previewCardRow}>
            <View style={styles.previewPill}>
              <Ionicons name="leaf-outline" size={14} color="#0F381E" />
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

          <View style={styles.fairTradeBar}>
            <Ionicons name="flash" size={12} color="#166534" />
            <Text style={styles.fairTradeText}>Estimated Match: <Text style={{fontWeight: '800'}}>Great Balance</Text></Text>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendProposal} activeOpacity={0.85}>
            <Text style={styles.sendButtonText}>Send Secure Proposal</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <View style={styles.secureFooterNote}>
            <Ionicons name="lock-closed-outline" size={12} color="#78716C" />
            <Text style={styles.secureFooterText}>Protected by EcoTrade Escrow Guarantee</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add New Item Modal */}
      <Modal visible={isAddItemModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <Text style={styles.modalSub}>Search or select any item (Mobile, Laptop, Watch, House, Plant, etc.) — Old, Recent & Current models supported.</Text>
            
            {/* 1st Box: Item Category/Name */}
            <TextInput
              style={styles.modalInput}
              placeholder="Item Category (e.g. Mobile, Laptop, Watch, House)"
              placeholderTextColor="#A8A29E"
              value={newItemTitle}
              onChangeText={(text) => setNewItemTitle(text)}
              autoFocus={true}
            />

            {/* 2nd Box: Brand / Model Spec Input */}
            <TextInput
              style={styles.modalInput}
              placeholder={getExtraBoxPlaceholder()}
              placeholderTextColor="#A8A29E"
              value={newItemDetailInput}
              onChangeText={(text) => setNewItemDetailInput(text)}
            />

            {/* Estimated Price Box */}
            <TextInput
              style={styles.modalInput}
              placeholder="Estimated Price (e.g. 12000)"
              placeholderTextColor="#A8A29E"
              keyboardType="numeric"
              value={newItemValue}
              onChangeText={(text) => setNewItemValue(text)}
            />

            <Text style={styles.dropdownLabel}>Select Model (Old, Recent & Current):</Text>
            <ScrollView style={styles.suggestionsContainer} nestedScrollEnabled={true}>
              {getDynamicSuggestions().map((option, index) => {
                const isSelected = selectedDetailOption === option || newItemDetailInput === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.suggestionItem, isSelected && styles.selectedSuggestionItem]}
                    onPress={() => {
                      setSelectedDetailOption(option);
                      setNewItemDetailInput(option);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons 
                      name={isSelected ? "radio-button-on" : "radio-button-off"} 
                      size={16} 
                      color={isSelected ? "#166534" : "#78716C"} 
                    />
                    <Text style={[styles.suggestionText, isSelected && styles.selectedSuggestionText]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.modalBtnPrimary} onPress={handleAddNewItem} activeOpacity={0.85}>
              <Text style={styles.modalBtnPrimaryText}>Save Item</Text>
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
            <View style={styles.successIconWrapper}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.modalTitle}>Proposal Sent!</Text>
            <Text style={styles.modalSub}>
              Your trade offer has been securely sent to {requestedItem.owner}.
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
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE1',
  },
  headerBtn: {
    padding: 6,
    backgroundColor: '#F3EFE3',
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F381E',
    letterSpacing: 0.3,
  },
  headerProfileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#0F381E',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1917',
    letterSpacing: -0.2,
  },
  sectionSubHeading: {
    fontSize: 13,
    color: '#78716C',
    marginTop: 2,
    marginBottom: 16,
  },
  requestedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0ECE1',
  },
  requestedImageContainer: {
    position: 'relative',
  },
  requestedImage: {
    width: '100%',
    height: 190,
  },
  valueBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(15, 56, 30, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  valueBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  requestedInfo: {
    padding: 16,
  },
  titleCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestedTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1917',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#E2EFE0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
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
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F2E9',
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  ownerText: {
    fontSize: 13,
    color: '#78716C',
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  inventoryCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#EFEBE0',
  },
  selectedInventoryCard: {
    borderColor: '#0F381E',
    borderWidth: 2,
    backgroundColor: '#F7FBF6',
  },
  inventoryImageWrapper: {
    position: 'relative',
    height: 110,
  },
  inventoryImage: {
    width: '100%',
    height: '100%',
  },
  itemValTag: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemValText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  checkmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#0F381E',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  inventoryTitleBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  inventoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
  },
  addNewCard: {
    width: '48%',
    height: 142,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#D8D2C2',
    borderStyle: 'dashed',
    backgroundColor: '#F3EFE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2EFE0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  addNewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F381E',
  },
  cashTopUpContainer: {
    marginTop: 18,
    backgroundColor: '#F3EFE3',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EBE5D5',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cashTopUpLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1917',
  },
  cashInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D8D2C2',
    width: 110,
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
    paddingVertical: 6,
    paddingHorizontal: 6,
    flex: 1,
  },
  quickChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  chipBtn: {
    backgroundColor: '#E2EFE0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBE4C6',
  },
  chipTest: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#78716C',
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  messageBox: {
    backgroundColor: '#E2EFE0',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBE4C6',
  },
  messageInput: {
    fontSize: 14,
    color: '#1C1917',
    minHeight: 55,
    textAlignVertical: 'top',
  },
  previewContainer: {
    backgroundColor: '#EBE5D5',
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#DFD8C5',
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
    marginVertical: 14,
    gap: 8,
  },
  previewPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7EE',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2DBCA',
  },
  previewPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1917',
    flex: 1,
  },
  forText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716C',
  },
  fairTradeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2EFE0',
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    gap: 4,
  },
  fairTradeText: {
    fontSize: 12,
    color: '#166534',
  },
  sendButton: {
    backgroundColor: '#0F381E',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F381E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secureFooterNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 4,
  },
  secureFooterText: {
    fontSize: 11,
    color: '#78716C',
    fontWeight: '600',
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
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  successIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#166534',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1917',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    color: '#78716C',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F5F5F4',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    fontSize: 14,
    color: '#1C1917',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7E2D0',
  },
  dropdownLabel: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    color: '#57534E',
    marginBottom: 6,
  },
  suggestionsContainer: {
    width: '100%',
    maxHeight: 120,
    backgroundColor: '#FBF9F4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E2D0',
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE1',
    gap: 8,
  },
  selectedSuggestionItem: {
    backgroundColor: '#E2EFE0',
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 13,
    color: '#57534E',
    flex: 1,
  },
  selectedSuggestionText: {
    color: '#166534',
    fontWeight: '700',
  },
  modalBtnPrimary: {
    backgroundColor: '#0F381E',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
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