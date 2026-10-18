import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as Location from 'expo-location';

export default function SearchScreen() {
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [currentCity, setCurrentCity] = useState('Dhaka');
  
  // ফিল্টার এবং সর্টিং স্টেট
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'priceLowToHigh', 'priceHighToLow'
  const [selectedCondition, setSelectedCondition] = useState('All'); // 'All', 'Brand New', 'Good', 'Lightly Used'

  // রিভিউ এবং ট্রেড বাটনের কার্যকারিতার জন্য স্টেট
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [itemReviews, setItemReviews] = useState<{ [key: string]: { rating: number; text: string }[] }>({
    '1': [{ rating: 5, text: 'Amazing quality table, looks very vintage!' }, { rating: 4, text: 'Good condition as described.' }],
    '2': [{ rating: 5, text: 'Plant was fresh and healthy!' }],
    '3': [{ rating: 4, text: 'Very warm and comfortable sweater.' }],
    '4': [{ rating: 5, text: 'Cute little pot, perfect for my desk.' }],
    '5': [{ rating: 5, text: 'Camera works like a charm. Nostalgic piece!' }],
    '6': [{ rating: 4, text: 'Great collection of old books.' }],
    '7': [{ rating: 4, text: 'Sturdy and antique feel.' }],
    '8': [{ rating: 5, text: 'Healthy snake plant, packaged well.' }],
    '9': [{ rating: 5, text: 'Classic denim jacket style.' }],
    '10': [{ rating: 4, text: 'Beautiful handmade wall hanging.' }],
    '11': [{ rating: 4, text: 'Nice retro sound quality.' }],
    '12': [{ rating: 5, text: 'Loved the poetry selection.' }],
    '13': [{ rating: 5, text: 'Modern and sleek coffee table.' }],
    '14': [{ rating: 5, text: 'Fiddle leaf fig is gorgeous!' }],
    '15': [{ rating: 4, text: 'Cozy and oversized just like I wanted.' }],
    '16': [{ rating: 5, text: 'Good bass and loud speaker.' }]
  });

  const categories = ['All', 'Furniture', 'Plants', 'Clothing', 'Decor', 'Electronics', 'Books'];
  
  const categoryScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const detectedCity = reverseGeocode[0].city || reverseGeocode[0].subregion || reverseGeocode[0].region;
        if (detectedCity) {
          setCurrentCity(detectedCity);
        }
      }
    })();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // প্রতিটি আইটেমের জন্য নির্দিষ্ট ট্রেড ডিল বা অফার বিবরণ
  const itemTradeDetails: { [key: string]: string } = {
    '1': 'Offered by Sarah M. - Exchange offer: Looking to trade for a modern study desk or bookshelf. Current deal: Cash top-up of ৳500 accepted.',
    '2': 'Offered by Maya P. - Exchange offer: Willing to trade for indoor ceramic pots or gardening tools. Active deal: Direct plant swap in progress.',
    '3': 'Offered by Elena R. - Exchange offer: Looking for winter beanies or scarves. Active deal: Open to matching clothing items.',
    '4': 'Offered by Alex T. - Exchange offer: Trading for desk accessories or small stationery items. Active deal: No active counter-offers yet.',
    '5': 'Offered by Tanvir H. - Exchange offer: Looking for vintage lenses or audio gear. Active deal: High demand, 2 pending trade requests.',
    '6': 'Offered by Nusrat J. - Exchange offer: Swap for thriller or mystery novels. Active deal: Book-for-book exchange ongoing.',
    '7': 'Offered by Rahim K. - Exchange offer: Trading for office chairs or stools. Active deal: Inspection pending with a local buyer.',
    '8': 'Offered by Arif R. - Exchange offer: Looking for succulent plants or plant fertilizer. Active deal: Ready for immediate exchange.',
    '9': 'Offered by Sadia S. - Exchange offer: Swap for casual hoodies or oversized t-shirts. Active deal: Size matching in progress.',
    '10': 'Offered by Fahim A. - Exchange offer: Trading for wall art or LED lights. Active deal: Custom trade request active.',
    '11': 'Offered by Rashed K. - Exchange offer: Looking for old cassette tapes or speakers. Active deal: Audio test scheduled.',
    '12': 'Offered by Mumu C. - Exchange offer: Swap for historical fiction or biography books. Active deal: 1 trade offer received.',
    '13': 'Offered by Tanvir Ahmed. - Exchange offer: Trading for living room decor or rugs. Active deal: Price negotiation ongoing.',
    '14': 'Offered by Labiba Akter. - Exchange offer: Looking for large ceramic planters. Active deal: Pickup scheduled for tomorrow.',
    '15': 'Offered by Farhan S. - Exchange offer: Swap for streetwear items. Active deal: Direct trade request under review.',
    '16': 'Offered by Sakib Al Hasan. - Exchange offer: Trading for headphones or tech gadgets. Active deal: 3 active offers available.'
  };

  // View Trade বাটনে ক্লিক করলে নির্দিষ্ট আইটেমের ট্রেড ডিটেইলস দেখাবে
  const handleViewTrade = (item: any) => {
    const details = itemTradeDetails[item.id] || `Opening trade details for ${item.title}. Seeker wants to exchange items or deal with conditions.`;
    Alert.alert(`Trade Details: ${item.title}`, details);
  };

  const handleOpenReviewModal = (item: any) => {
    setSelectedItemForReview(item);
    setRating(5);
    setReviewText('');
    setReviewModalVisible(true);
  };

  const handleSubmitReview = () => {
    if (selectedItemForReview) {
      const itemId = selectedItemForReview.id;
      const newReview = { rating, text: reviewText };
      setItemReviews(prev => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), newReview]
      }));
    }
    setReviewModalVisible(false);
  };

  const allItems = [
    {
      id: '1',
      category: 'FURNITURE',
      title: 'Vintage Wood Table',
      subtitle: 'Offered by Sarah M.',
      icon: 'cafe-outline',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      price: '৳4,500',
      rawPrice: 4500,
      location: `Mirpur, ${currentCity} (Current) - 2.5 km`,
      condition: 'Good',
    },
    {
      id: '2',
      category: 'PLANTS',
      title: 'Monstera Deliciosa',
      subtitle: 'Offered by Maya P.',
      icon: 'leaf-outline',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
      price: '৳1,200',
      rawPrice: 1200,
      location: `Gulshan, ${currentCity} (Current) - 4.1 km`,
      condition: 'Brand New',
    },
    {
      id: '3',
      category: 'CLOTHING',
      title: 'Knit Sweater',
      subtitle: 'Offered by Elena R.',
      icon: 'shirt-outline',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
      price: '৳850',
      rawPrice: 850,
      location: `Banani, ${currentCity} (Current) - 3.0 km`,
      condition: 'Lightly Used',
    },
    {
      id: '4',
      category: 'DECOR',
      title: 'Ceramic Small Pot',
      subtitle: 'Offered by Alex T.',
      icon: 'grid-outline',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      price: '৳600',
      rawPrice: 600,
      location: `Dhanmondi, ${currentCity} (Current) - 5.2 km`,
      condition: 'Brand New',
    },
    {
      id: '5',
      category: 'ELECTRONICS',
      title: 'Classic Film Camera',
      subtitle: 'Offered by Tanvir H.',
      icon: 'camera-outline',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
      price: '৳6,500',
      rawPrice: 6500,
      location: `Uttara, ${currentCity} (Current) - 7.0 km`,
      condition: 'Good',
    },
    {
      id: '6',
      category: 'BOOKS',
      title: 'Old Sci-Fi Novel Collection',
      subtitle: 'Offered by Nusrat J.',
      icon: 'book-outline',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      price: '৳900',
      rawPrice: 900,
      location: `Mohakhali, ${currentCity} (Current) - 1.8 km`,
      condition: 'Lightly Used',
    },
    {
      id: '7',
      category: 'FURNITURE',
      title: 'Antique Wooden Chair',
      subtitle: 'Offered by Rahim K.',
      icon: 'bed-outline',
      image: 'https://images.unsplash.com/photo-1580481077494-e2299ac25e94?auto=format&fit=crop&w=600&q=80',
      price: '৳2,800',
      rawPrice: 2800,
      location: `Tejgaon, ${currentCity} (Current) - 3.5 km`,
      condition: 'Good',
    },
    {
      id: '8',
      category: 'PLANTS',
      title: 'Snake Plant in Terracotta',
      subtitle: 'Offered by Arif R.',
      icon: 'leaf-outline',
      image: 'https://images.unsplash.com/photo-1599598425947-f54261899120?auto=format&fit=crop&w=600&q=80',
      price: '৳750',
      rawPrice: 750,
      location: `Mirpur 10, ${currentCity} (Current) - 1.2 km`,
      condition: 'Brand New',
    },
    {
      id: '9',
      category: 'CLOTHING',
      title: 'Vintage Denim Jacket',
      subtitle: 'Offered by Sadia S.',
      icon: 'shirt-outline',
      image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80',
      price: '৳1,800',
      rawPrice: 1800,
      location: `Farmgate, ${currentCity} (Current) - 4.0 km`,
      condition: 'Lightly Used',
    },
    {
      id: '10',
      category: 'DECOR',
      title: 'Handmade Wall Hanging',
      subtitle: 'Offered by Fahim A.',
      icon: 'images-outline',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      price: '৳1,100',
      rawPrice: 1100,
      location: `Bashundhara, ${currentCity} (Current) - 6.5 km`,
      condition: 'Brand New',
    },
    {
      id: '11',
      category: 'ELECTRONICS',
      title: 'Retro Portable Radio',
      subtitle: 'Offered by Rashed K.',
      icon: 'radio-outline',
      image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80',
      price: '৳2,200',
      rawPrice: 2200,
      location: `Badda, ${currentCity} (Current) - 3.8 km`,
      condition: 'Good',
    },
    {
      id: '12',
      category: 'BOOKS',
      title: 'Classic Poetry Anthology',
      subtitle: 'Offered by Mumu C.',
      icon: 'book-outline',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      price: '৳450',
      rawPrice: 450,
      location: `Lalmatia, ${currentCity} (Current) - 5.0 km`,
      condition: 'Lightly Used',
    },
    {
      id: '13',
      category: 'FURNITURE',
      title: 'Modern Coffee Table',
      subtitle: 'Offered by Tanvir Ahmed.',
      icon: 'cafe-outline',
      image: 'https://images.unsplash.com/photo-1533779283484-8ab4940aa78f?auto=format&fit=crop&w=600&q=80',
      price: '৳3,500',
      rawPrice: 3500,
      location: `Paltan, ${currentCity} (Current) - 6.0 km`,
      condition: 'Brand New',
    },
    {
      id: '14',
      category: 'PLANTS',
      title: 'Fiddle Leaf Fig',
      subtitle: 'Offered by Labiba Akter.',
      icon: 'leaf-outline',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      price: '৳1,500',
      rawPrice: 1500,
      location: `Malibagh, ${currentCity} (Current) - 4.5 km`,
      condition: 'Brand New',
    },
    {
      id: '15',
      category: 'CLOTHING',
      title: 'Oversized Hoodie',
      subtitle: 'Offered by Farhan S.',
      icon: 'shirt-outline',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      price: '৳1,250',
      rawPrice: 1250,
      location: `Khilkhet, ${currentCity} (Current) - 5.5 km`,
      condition: 'Lightly Used',
    },
    {
      id: '16',
      category: 'ELECTRONICS',
      title: 'Wireless Bluetooth Speaker',
      subtitle: 'Offered by Sakib Al Hasan.',
      icon: 'radio-outline',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
      price: '৳2,900',
      rawPrice: 2900,
      location: `Rampura, ${currentCity} (Current) - 3.2 km`,
      condition: 'Good',
    },
  ];

  const scrollToCategory = (cat: string) => {
    const index = categories.findIndex(c => c.toLowerCase() === cat.toLowerCase());
    if (index !== -1 && categoryScrollRef.current) {
      categoryScrollRef.current.scrollTo({ x: Math.max(0, (index - 1) * 110), animated: true });
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === text.trim().toLowerCase()
    );
    if (matchedCategory) {
      setSelectedCategory(matchedCategory);
      scrollToCategory(matchedCategory);
    } else if (text.trim() === '') {
      setSelectedCategory('All');
      scrollToCategory('All');
    }
  };

  // ফিল্টারিং এবং সর্টিং লজিক
  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category.toUpperCase() === selectedCategory.toUpperCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    return matchesCategory && matchesSearch && matchesCondition;
  }).sort((a, b) => {
    if (sortBy === 'priceLowToHigh') return a.rawPrice - b.rawPrice;
    if (sortBy === 'priceHighToLow') return b.rawPrice - a.rawPrice;
    return 0;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Search Items</Text>
        <Text style={styles.itemCountText}>{filteredItems.length} items available</Text>
      </View>

      {/* Search Bar with Filter Icon */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput 
            placeholder="Search items, plants, furniture..." 
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput} 
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
        {/* ফিল্টার আইকনে ক্লিক করলে পপআপ আসবে */}
        <TouchableOpacity 
          style={styles.filterIconButton} 
          onPress={() => setFilterModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryContainerWrapper}>
        <ScrollView 
          ref={categoryScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScrollContent}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity 
                key={cat} 
                style={[styles.pill, isSelected ? styles.pillSelected : styles.pillUnselected]}
                onPress={() => {
                  setSelectedCategory(cat);
                  scrollToCategory(cat);
                }}
              >
                <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Items Grid/List or Not Found View */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isFav = favorites[item.id];
            const reviews = itemReviews[item.id] || [];
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardHeaderLeft}>
                    <View style={styles.iconBox}>
                      <Ionicons name={item.icon as any} size={16} color={Colors.primary} />
                    </View>
                    <Text style={styles.cardCategoryLabel}>{item.category}</Text>
                  </View>
                  
                  {/* Favorite & Condition Badges */}
                  <View style={styles.cardHeaderRight}>
                    <View style={styles.conditionBadge}>
                      <Text style={styles.conditionText}>{item.condition}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
                      <Ionicons 
                        name={isFav ? "heart" : "heart-outline"} 
                        size={18} 
                        color={isFav ? "#E53935" : Colors.textSecondary} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                
                {/* Item Image */}
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                )}

                {/* Price and Location Details */}
                <View style={styles.detailsRow}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Value: </Text>
                    <Text style={styles.priceValue}>{item.price}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={13} color={Colors.textSecondary} style={{ marginRight: 3 }} />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                </View>

                {/* জমা হওয়া রিভিউগুলো কার্ডের নিচে দেখানোর জন্য */}
                {reviews.length > 0 && (
                  <View style={styles.reviewsListContainer}>
                    <Text style={styles.reviewsListTitle}>Reviews ({reviews.length}):</Text>
                    {reviews.map((rev, index) => (
                      <View key={index} style={styles.reviewItemRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons 
                              key={star} 
                              name={star <= rev.rating ? "star" : "star-outline"} 
                              size={12} 
                              color="#FFD700" 
                              style={{ marginRight: 2 }}
                            />
                          ))}
                        </View>
                        {rev.text ? <Text style={styles.reviewItemText}>{rev.text}</Text> : null}
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.actionButtonsRow}>
                  {/* View Trade বাটন */}
                  <TouchableOpacity 
                    style={styles.tradeButton} 
                    onPress={() => handleViewTrade(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.tradeButtonText}>View Trade</Text>
                  </TouchableOpacity>
                  
                  {/* Add Review বাটন */}
                  <TouchableOpacity 
                    style={styles.reviewButton} 
                    onPress={() => handleOpenReviewModal(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="star-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
                    <Text style={styles.reviewButtonText}>Add Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.notFoundContainer}>
            <Ionicons name="search-outline" size={56} color={Colors.textSecondary} style={{ marginBottom: 12 }} />
            <Text style={styles.notFoundTitle}>No items found</Text>
            <Text style={styles.notFoundSubtitle}>Try searching with a different keyword or category.</Text>
          </View>
        )}
      </ScrollView>

      {/* ফিল্টার এবং সর্টিং মোডাল */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter & Sort Items</Text>
            <Text style={styles.modalSubtitle}>Customize your search results</Text>

            <Text style={styles.filterSectionTitle}>Sort By Price</Text>
            <View style={styles.filterOptionsRow}>
              <TouchableOpacity 
                style={[styles.filterChip, sortBy === 'default' && styles.filterChipSelected]}
                onPress={() => setSortBy('default')}
              >
                <Text style={[styles.filterChipText, sortBy === 'default' && styles.filterChipTextSelected]}>Default</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterChip, sortBy === 'priceLowToHigh' && styles.filterChipSelected]}
                onPress={() => setSortBy('priceLowToHigh')}
              >
                <Text style={[styles.filterChipText, sortBy === 'priceLowToHigh' && styles.filterChipTextSelected]}>Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterChip, sortBy === 'priceHighToLow' && styles.filterChipSelected]}
                onPress={() => setSortBy('priceHighToLow')}
              >
                <Text style={[styles.filterChipText, sortBy === 'priceHighToLow' && styles.filterChipTextSelected]}>Price: High to Low</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionTitle}>Item Condition</Text>
            <View style={styles.filterOptionsRow}>
              {['All', 'Brand New', 'Good', 'Lightly Used'].map((cond) => (
                <TouchableOpacity 
                  key={cond}
                  style={[styles.filterChip, selectedCondition === cond && styles.filterChipSelected]}
                  onPress={() => setSelectedCondition(cond)}
                >
                  <Text style={[styles.filterChipText, selectedCondition === cond && styles.filterChipTextSelected]}>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={() => {
                  setSortBy('default');
                  setSelectedCondition('All');
                }}
              >
                <Text style={styles.modalCancelText}>Reset</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSubmitButton} 
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.modalSubmitText}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* রিভিউ লেখার জন্য পপআপ মোডাল */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <Text style={styles.modalSubtitle}>{selectedItemForReview?.title}</Text>

            {/* স্টার রেটিং সিলেকশন */}
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={28} 
                    color="#FFD700" 
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.reviewInput}
              placeholder="Write your experience..."
              placeholderTextColor={Colors.textSecondary}
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={() => setReviewModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSubmitButton} 
                onPress={handleSubmitReview}
              >
                <Text style={styles.modalSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  itemCountText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  filterIconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  categoryContainerWrapper: {
    marginHorizontal: -16,
    marginBottom: 14,
  },
  categoryScroll: {
    maxHeight: 45,
    marginTop: 2,
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillSelected: {
    backgroundColor: Colors.primary,
  },
  pillUnselected: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  pillTextUnselected: {
    color: Colors.textPrimary,
  },
  gridContainer: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  cardCategoryLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  conditionBadge: {
    backgroundColor: '#F0F4F1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
  },
  heartButton: {
    padding: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  itemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  reviewsListContainer: {
    backgroundColor: '#F9FBF9',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewsListTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  reviewItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  reviewItemText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tradeButton: {
    flex: 1,
    backgroundColor: Colors.accentTertiary,
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  tradeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginLeft: 6,
  },
  reviewButtonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  notFoundSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 8,
  },
  filterOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  reviewInput: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    height: 90,
    textAlignVertical: 'top',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalCancelText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  modalSubmitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalSubmitText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});