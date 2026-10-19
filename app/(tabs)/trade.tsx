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
import { useTheme } from '@/hooks/ThemeContext';

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
    value: '\$45',
  },
  {
    id: '2',
    title: 'Ceramic Bowl Set',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop',
    value: '\$60',
  },
];

export default function TradeScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

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
    value: '\$180',
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
    
    if (combinedText.includes('samsung') || combinedText.includes('galaxy')) {
      return [
        'Samsung Galaxy S10, 128GB, Prism White (2019)',
        'Samsung Galaxy Note 10+, 256GB, Aura Glow (2019)',
        'Samsung Galaxy S20 Ultra, 128GB, Cosmic Gray (2020)',
        'Samsung Galaxy S21 Ultra, 256GB, Phantom Black (2021)',
        'Samsung Galaxy S22 Ultra, 256GB, Burgundy (2022)',
        'Samsung Galaxy S23 Ultra, 512GB, Green (2023)',
        'Samsung Galaxy S24 Ultra, 512GB, Titanium Gray (2024)'
      ];
    }
    if (combinedText.includes('redmi') || combinedText.includes('xiaomi')) {
      return [
        'Xiaomi Redmi Note 9 Pro, 128GB, Interstellar Gray (2020)',
        'Xiaomi Redmi Note 10 Pro, 128GB, Glacier Blue (2021)',
        'Xiaomi Redmi Note 12 Pro+, 256GB, Midnight Black (2023)',
        'Xiaomi Redmi Note 13 Pro+, 512GB, Midnight Black (2024)'
      ];
    }
    if (combinedText.includes('iphone') || combinedText.includes('apple')) {
      return [
        'Apple iPhone 11 Pro, 256GB, Midnight Green (2019)',
        'Apple iPhone 12, 128GB, Blue (2020)',
        'Apple iPhone 13, 128GB, Starlight (2021)',
        'Apple iPhone 14 Pro Max, 256GB, Deep Purple (2022)',
        'Apple iPhone 15 Pro Max, 256GB, Natural Titanium (2023)',
        'Apple iPhone 16 Pro, 256GB, Desert Titanium (2024/Current)'
      ];
    }
    if (combinedText.includes('pixel') || combinedText.includes('google')) {
      return [
        'Google Pixel 5, 128GB, Just Black (2020)',
        'Google Pixel 7 Pro, 128GB, Obsidian (2022)',
        'Google Pixel 8 Pro, 128GB, Bay (2023)',
        'Google Pixel 9 Pro XL, 256GB, Porcelain (2024/Current)'
      ];
    }
    if (combinedText.includes('laptop') || combinedText.includes('macbook') || combinedText.includes('pc')) {
      return [
        'Apple MacBook Air 13", M1 Chip, 8GB RAM, 256GB SSD (2020)',
        'Dell XPS 15, Intel Core i7 11th Gen, RTX 3050 Ti (2021)',
        'Apple MacBook Pro 14", M2 Pro, 16GB RAM, 512GB SSD (2023)',
        'Apple MacBook Pro 16", M3 Max, 36GB RAM, 1TB SSD (2024/Current)'
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
      ? (newItemValue.startsWith('\$') ? newItemValue.trim() : `$${newItemValue.trim()}`) 
      : '\$50';
    const matchedImage = getSmartImageForTitle(`${newItemTitle} ${newItemDetailInput}`);
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      title: `${newItemTitle.trim()}${newItemDetailInput ? ` (\${newItemDetailInput.trim()})` : ''}`,
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

  // Dynamic Theme Variables
  const containerBg = isDarkMode ? '#121212' : '#FAF7EE';
  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#1C1917';
  const subTextColor = isDarkMode ? '#A8A29E' : '#78716C';
  const borderColor = isDarkMode ? '#333333' : '#F0ECE1';
  const primaryGreen = isDarkMode ? '#4ADE80' : '#0F381E';
  const accentCardBg = isDarkMode ? '#1A2E22' : '#E2EFE0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBg }]}>
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity style={[styles.headerBtn, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F3EFE3' }]} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={primaryGreen} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: primaryGreen }]}>EcoTrade</Text>
        <Image source={{ uri: requestedItem.ownerAvatar }} style={[styles.headerProfileImg, { borderColor: primaryGreen }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionHeading, { color: textColor }]}>You are requesting</Text>
        <Text style={[styles.sectionSubHeading, { color: subTextColor }]}>Review the item details before sending your proposal.</Text>
        
        <View style={[styles.requestedCard, { backgroundColor: cardBg, borderColor }]}>
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
              <Text style={[styles.requestedTitle, { color: textColor }]}>{requestedItem.title}</Text>
              <View style={[styles.categoryBadge, { backgroundColor: accentCardBg }]}>
                <Text style={[styles.categoryText, { color: primaryGreen }]}>{requestedItem.category}</Text>
              </View>
            </View>
            <Text style={[styles.requestedDesc, { color: subTextColor }]} numberOfLines={2}>
              {requestedItem.description}
            </Text>
            <View style={[styles.ownerRow, { borderTopColor: isDarkMode ? '#333' : '#F5F2E9' }]}>
              <Image source={{ uri: requestedItem.ownerAvatar }} style={styles.ownerAvatar} />
              <Text style={[styles.ownerText, { color: subTextColor }]}>
                Offered by <Text style={{ fontWeight: '700', color: textColor }}>{requestedItem.owner}</Text>
              </Text>
              <Ionicons name="checkmark-circle" size={14} color={primaryGreen} style={{ marginLeft: -2 }} />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { marginTop: 28, color: textColor }]}>Your Offer</Text>
        <Text style={[styles.sectionSubHeading, { color: subTextColor }]}>Select an item from your inventory to trade.</Text>
        
        <View style={styles.inventoryGrid}>
          {inventory.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.inventoryCard, 
                  { backgroundColor: cardBg, borderColor: isSelected ? primaryGreen : (isDarkMode ? '#333' : '#EFEBE0') },
                  isSelected && { backgroundColor: isDarkMode ? '#1A2E22' : '#F7FBF6', borderWidth: 2 }
                ]}
                onPress={() => setSelectedItemId(item.id)}
                activeOpacity={0.85}
              >
                <View style={styles.inventoryImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.inventoryImage} />
                  <View style={styles.itemValTag}>
                    <Text style={styles.itemValText}>{item.value}</Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkmarkBadge, { backgroundColor: primaryGreen }]}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <View style={[styles.inventoryTitleBox, { backgroundColor: cardBg }]}>
                  <Text style={[styles.inventoryTitle, { color: textColor }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.addNewCard, 
              { backgroundColor: isDarkMode ? '#1E1E1E' : '#F3EFE3', borderColor: isDarkMode ? '#444' : '#D8D2C2' }
            ]}
            onPress={() => {
              setNewItemTitle('');
              setNewItemDetailInput('');
              setNewItemValue('');
              setSelectedDetailOption('');
              setIsAddItemModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.addIconCircle, { backgroundColor: accentCardBg }]}>
              <Ionicons name="add" size={22} color={primaryGreen} />
            </View>
            <Text style={[styles.addNewText, { color: primaryGreen }]}>Add New Item</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.cashTopUpContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F3EFE3', borderColor: isDarkMode ? '#333' : '#EBE5D5' }]}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAddCash(!addCash)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={addCash ? 'checkbox' : 'square-outline'}
              size={22}
              color={primaryGreen}
            />
            <Text style={[styles.cashTopUpLabel, { color: textColor }]}>Add cash to balance the trade</Text>
          </TouchableOpacity>
          {addCash && (
            <View style={[styles.cashInputRow, { backgroundColor: isDarkMode ? '#2D2D2D' : '#FFFFFF', borderColor: isDarkMode ? '#444' : '#D8D2C2' }]}>
              <Text style={[styles.currencySymbol, { color: textColor }]}>\$</Text>
              <TextInput
                style={[styles.cashInput, { color: textColor }]}
                keyboardType="numeric"
                value={cashAmount}
                onChangeText={setCashAmount}
                placeholder="0"
                placeholderTextColor={subTextColor}
              />
            </View>
          )}
        </View>

        <View style={styles.quickChipsRow}>
          <TouchableOpacity 
            style={[styles.chipBtn, { backgroundColor: accentCardBg, borderColor: isDarkMode ? '#254E32' : '#CBE4C6' }]} 
            onPress={() => setMessage('Hi! Is this item still available for trade?')}
          >
            <Text style={[styles.chipText, { color: primaryGreen }]}>💬 Still available?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.chipBtn, { backgroundColor: accentCardBg, borderColor: isDarkMode ? '#254E32' : '#CBE4C6' }]} 
            onPress={() => setMessage('Hi! Can we meet locally for this swap?')}
          >
            <Text style={[styles.chipText, { color: primaryGreen }]}>🤝 Local meet?</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.inputLabel, { color: subTextColor }]}>MESSAGE TO OWNER (OPTIONAL)</Text>
        <View style={[styles.messageBox, { backgroundColor: accentCardBg, borderColor: isDarkMode ? '#254E32' : '#CBE4C6' }]}>
          <TextInput
            style={[styles.messageInput, { color: textColor }]}
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
            placeholderTextColor={subTextColor}
          />
        </View>

        <View style={[styles.previewContainer, { backgroundColor: isDarkMode ? '#1A1A1A' : '#EBE5D5', borderColor: isDarkMode ? '#333' : '#DFD8C5' }]}>
          <View style={styles.previewHeader}>
            <Text style={[styles.previewTitle, { color: textColor }]}>Trade Summary Preview</Text>
            <Ionicons name="shield-checkmark-outline" size={18} color={primaryGreen} />
          </View>
          <View style={styles.previewCardRow}>
            <View style={[styles.previewPill, { backgroundColor: cardBg, borderColor: isDarkMode ? '#333' : '#E2DBCA' }]}>
              <Ionicons name="leaf-outline" size={14} color={primaryGreen} />
              <Text style={[styles.previewPillText, { color: textColor }]} numberOfLines={1}>
                {selectedItem ? selectedItem.title : 'Select Item'}
                {addCash && cashAmount ? ` + $${cashAmount}` : ''}
              </Text>
            </View>
            <Text style={[styles.forText, { color: subTextColor }]}>for</Text>
            <View style={[styles.previewPill, { backgroundColor: cardBg, borderColor: isDarkMode ? '#333' : '#E2DBCA' }]}>
              <Text style={[styles.previewPillText, { color: textColor }]} numberOfLines={1}>
                {requestedItem.title}
              </Text>
            </View>
          </View>
          <View style={[styles.fairTradeBar, { backgroundColor: accentCardBg }]}>
            <Ionicons name="flash" size={12} color={primaryGreen} />
            <Text style={[styles.fairTradeText, { color: primaryGreen }]}>Estimated Match: <Text style={{fontWeight: '800'}}>Great Balance</Text></Text>
          </View>
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: primaryGreen }]} onPress={handleSendProposal} activeOpacity={0.85}>
            <Text style={styles.sendButtonText}>Send Secure Proposal</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
          <View style={styles.secureFooterNote}>
            <Ionicons name="lock-closed-outline" size={12} color={subTextColor} />
            <Text style={[styles.secureFooterText, { color: subTextColor }]}>Protected by EcoTrade Escrow Guarantee</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add New Item Modal */}
      <Modal visible={isAddItemModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <Text style={[styles.modalTitle, { color: textColor }]}>Add New Item</Text>
            <Text style={[styles.modalSub, { color: subTextColor }]}>Search or select any item (Mobile, Laptop, Watch, House, Plant, etc.) — Old, Recent & Current models supported.</Text>
            
            <TextInput
              style={[styles.modalInput, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F5F5F4', color: textColor, borderColor: isDarkMode ? '#444' : '#E7E2D0' }]}
              placeholder="Item Category (e.g. Mobile, Laptop, Watch, House)"
              placeholderTextColor={subTextColor}
              value={newItemTitle}
              onChangeText={(text) => setNewItemTitle(text)}
              autoFocus={true}
            />
            <TextInput
              style={[styles.modalInput, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F5F5F4', color: textColor, borderColor: isDarkMode ? '#444' : '#E7E2D0' }]}
              placeholder={getExtraBoxPlaceholder()}
              placeholderTextColor={subTextColor}
              value={newItemDetailInput}
              onChangeText={(text) => setNewItemDetailInput(text)}
            />
            <TextInput
              style={[styles.modalInput, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F5F5F4', color: textColor, borderColor: isDarkMode ? '#444' : '#E7E2D0' }]}
              placeholder="Estimated Price (e.g. 12000)"
              placeholderTextColor={subTextColor}
              keyboardType="numeric"
              value={newItemValue}
              onChangeText={(text) => setNewItemValue(text)}
            />
            <Text style={[styles.dropdownLabel, { color: subTextColor }]}>Select Model (Old, Recent & Current):</Text>
            <ScrollView style={[styles.suggestionsContainer, { backgroundColor: isDarkMode ? '#252525' : '#FBF9F4', borderColor: isDarkMode ? '#444' : '#E7E2D0' }]} nestedScrollEnabled={true}>
              {getDynamicSuggestions().map((option, index) => {
                const isSelected = selectedDetailOption === option || newItemDetailInput === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.suggestionItem, isSelected && { backgroundColor: accentCardBg }, { borderBottomColor: isDarkMode ? '#333' : '#F0ECE1' }]}
                    onPress={() => {
                      setSelectedDetailOption(option);
                      setNewItemDetailInput(option);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons 
                      name={isSelected ? "radio-button-on" : "radio-button-off"} 
                      size={16} 
                      color={isSelected ? primaryGreen : subTextColor} 
                    />
                    <Text style={[styles.suggestionText, { color: subTextColor }, isSelected && { color: primaryGreen, fontWeight: '700' }]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={[styles.modalBtnPrimary, { backgroundColor: primaryGreen }]} onPress={handleAddNewItem} activeOpacity={0.85}>
              <Text style={styles.modalBtnPrimaryText}>Save Item</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalBtnSecondary} 
              onPress={() => setIsAddItemModalVisible(false)} 
              activeOpacity={0.7}
            >
              <Text style={[styles.modalBtnSecondaryText, { color: subTextColor }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={isSuccessModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <View style={[styles.successIconWrapper, { backgroundColor: primaryGreen }]}>
              <Ionicons name="checkmark" size={36} color="#FFFFFF" />
            </View>
            <Text style={[styles.modalTitle, { color: textColor }]}>Proposal Sent!</Text>
            <Text style={[styles.modalSub, { color: subTextColor }]}>
              Your trade offer has been securely sent to {requestedItem.owner}.
            </Text>
            <TouchableOpacity
              style={[styles.modalBtnPrimary, { backgroundColor: primaryGreen }]}
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
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerBtn: {
    padding: 6,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerProfileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionSubHeading: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },
  requestedCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
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
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  requestedDesc: {
    fontSize: 13,
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
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  ownerText: {
    fontSize: 13,
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
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
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
  },
  inventoryTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  addNewCard: {
    width: '48%',
    height: 142,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  addNewText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cashTopUpContainer: {
    marginTop: 18,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cashTopUpLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  cashInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    width: 110,
  },
  currencySymbol: {
    fontSize: 15,
    fontWeight: '700',
  },
  cashInput: {
    fontSize: 14,
    fontWeight: '700',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  messageBox: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  messageInput: {
    fontSize: 14,
    minHeight: 55,
    textAlignVertical: 'top',
  },
  previewContainer: {
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '700',
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
  },
  previewPillText: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  forText: {
    fontSize: 12,
    fontWeight: '700',
  },
  fairTradeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    gap: 4,
  },
  fairTradeText: {
    fontSize: 12,
  },
  sendButton: {
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  modalInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  dropdownLabel: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  suggestionsContainer: {
    width: '100%',
    maxHeight: 120,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    gap: 8,
  },
  suggestionText: {
    fontSize: 13,
    flex: 1,
  },
  modalBtnPrimary: {
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
    fontSize: 14,
    fontWeight: '600',
  },
});