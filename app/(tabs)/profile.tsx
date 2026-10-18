import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Profile States
  const [name, setName] = useState('Sarah Jenkins');
  const [location, setLocation] = useState('Portland, OR');
  const [bio, setBio] = useState('Avid gardener, vintage clothing enthusiast, and believer in the circular economy.');
  
  // Profile Picture State
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
  );

  const handleSafeNavigate = (routePath: string, fallbackMessage: string) => {
    try {
      if (routePath === '/impact') {
        router.push('/(tabs)/impact' as any);
      } else {
        router.push(routePath as any);
      }
    } catch (error) {
      Alert.alert('Notice', fallbackMessage);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Gallery permission is required to change profile picture!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => handleSafeNavigate('/login', 'Redirecting to login...'), style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && { backgroundColor: '#121212' }]} edges={['top']}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.topBarIconBtn}
          onPress={() => {
            try {
              Alert.alert('Location', 'Checking device location...');
            } catch (error) {
              Alert.alert('Notice', 'Please check location settings.');
            }
          }}
        >
          <Ionicons name="location-outline" size={18} color="#104A27" />
        </TouchableOpacity>
        <Text style={[styles.appTitle, isDarkMode && { color: '#4ADE80' }]}>EcoTrade</Text>
        <Image source={{ uri: profileImage }} style={styles.topAvatar} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Info Section */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.85}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <View style={styles.nameRow}>
            <Text style={[styles.nameText, isDarkMode && { color: '#FFFFFF' }]}>{name}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={13} color="#104A27" />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={13} color="#78716C" />
            <Text style={styles.locationText}>{location}</Text>
          </View>

          <Text style={styles.bioText}>{bio}</Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => setIsEditModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="pencil" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Pro Achievement Badges Row */}
        <View style={{ marginTop: 8, marginBottom: 12 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Badges & Achievements</Text>
          <View style={styles.badgesRow}>
            <View style={[styles.badgeCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}>
              <Ionicons name="shield-checkmark" size={22} color="#104A27" />
              <Text style={[styles.badgeCardText, isDarkMode && { color: '#FFF' }]}>Trusted Trader</Text>
            </View>
            <View style={[styles.badgeCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}>
              <Ionicons name="flash" size={22} color="#D97706" />
              <Text style={[styles.badgeCardText, isDarkMode && { color: '#FFF' }]}>Fast Responder</Text>
            </View>
            <View style={[styles.badgeCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}>
              <Ionicons name="earth" size={22} color="#2563EB" />
              <Text style={[styles.badgeCardText, isDarkMode && { color: '#FFF' }]}>Eco Hero</Text>
            </View>
          </View>
        </View>

        {/* Sustainability Impact Section */}
        <View style={{ marginTop: 8 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Sustainability Impact</Text>
          
          <TouchableOpacity 
            style={[styles.impactMainCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}
            onPress={() => handleSafeNavigate('/impact', 'Navigating to full impact report...')}
            activeOpacity={0.9}
          >
            <View style={styles.impactHeaderRow}>
              <Ionicons name="leaf-outline" size={16} color="#104A27" style={{ marginRight: 6 }} />
              <Text style={styles.impactCardTitle}>LANDFILL DIVERTED</Text>
            </View>
            <Text style={[styles.impactCountText, isDarkMode && { color: '#FFFFFF' }]}>12 items</Text>

            <View style={styles.progressCircleContainer}>
              <View style={styles.progressOuterRing}>
                <View style={styles.leafInnerIconBox}>
                  <Ionicons name="leaf" size={20} color="#104A27" />
                </View>
              </View>
            </View>

            <View style={styles.impactSubMetricsRow}>
              <View style={[styles.subMetricBox, isDarkMode && { backgroundColor: '#252525', borderColor: '#333' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Ionicons name="stats-chart-outline" size={14} color="#104A27" style={{ marginRight: 4 }} />
                  <Text style={styles.subMetricLabel}>CO2 Offset</Text>
                </View>
                <Text style={[styles.subMetricValue, isDarkMode && { color: '#FFFFFF' }]}>45 <Text style={{ fontSize: 12, fontWeight: 'normal' }}>kg</Text></Text>
                <View style={styles.co2BarBackground}>
                  <View style={styles.co2BarFill} />
                </View>
              </View>

              <View style={[styles.subMetricBox, isDarkMode && { backgroundColor: '#252525', borderColor: '#333' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Ionicons name="swap-horizontal-outline" size={14} color="#991B1B" style={{ marginRight: 4 }} />
                  <Text style={[styles.subMetricLabel, { color: '#991B1B' }]}>Swaps</Text>
                </View>
                <Text style={[styles.subMetricValue, isDarkMode && { color: '#FFFFFF' }]}>8</Text>
                <Text style={styles.subMetricSubtext}>Total completed</Text>
              </View>
            </View>

            <View style={styles.topContributorCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.topContributorTitle}>Top Contributor</Text>
                <Text style={styles.topContributorSubtitle}>Top 5% in your neighborhood</Text>
              </View>
              <Ionicons name="ribbon" size={24} color="#104A27" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Active Listings Section */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }, isDarkMode && { color: '#FFFFFF' }]}>Active Listings</Text>
            <TouchableOpacity onPress={() => handleSafeNavigate('/listings', 'Opening all listings...')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listingsGrid}>
            <TouchableOpacity 
              style={[styles.listingCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}
              onPress={() => handleSafeNavigate('/item/123', 'Opening Vintage Ceramic Planter details...')}
              activeOpacity={0.9}
            >
              <Image source={{ uri: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300' }} style={styles.listingImage} />
              <View style={styles.listingTagBadge}>
                <Text style={styles.listingTagText}>Garden</Text>
              </View>
              <View style={styles.listingDetails}>
                <Text style={[styles.listingItemTitle, isDarkMode && { color: '#FFFFFF' }]} numberOfLines={1}>Vintage Ceramic Planter</Text>
                <Text style={styles.listingItemDesc} numberOfLines={1}>Excellent condition.</Text>
                <TouchableOpacity style={styles.itemEditBtn} onPress={(e) => { e.stopPropagation(); handleSafeNavigate('/item/edit/123', 'Opening edit page...'); }}>
                  <Text style={styles.itemEditBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.listingCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}
              onPress={() => handleSafeNavigate('/item/124', 'Opening Hand-Knit Sweater details...')}
              activeOpacity={0.9}
            >
              <Image source={{ uri: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300' }} style={styles.listingImage} />
              <View style={styles.listingTagBadge}>
                <Text style={styles.listingTagText}>Clothing</Text>
              </View>
              <View style={styles.listingDetails}>
                <Text style={[styles.listingItemTitle, isDarkMode && { color: '#FFFFFF' }]} numberOfLines={1}>Hand-Knit Sweater</Text>
                <Text style={styles.listingItemDesc} numberOfLines={1}>Size M, wool blend.</Text>
                <TouchableOpacity style={styles.itemEditBtn} onPress={(e) => { e.stopPropagation(); handleSafeNavigate('/item/edit/124', 'Opening edit page...'); }}>
                  <Text style={styles.itemEditBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.listNewCard, isDarkMode && { borderColor: '#444' }]}
              onPress={() => handleSafeNavigate('/item/create', 'Opening new item creation form...')}
              activeOpacity={0.8}
            >
              <View style={styles.plusIconCircle}>
                <Ionicons name="add" size={20} color="#104A27" />
              </View>
              <Text style={styles.listNewText}>List New Item</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Swapped Section */}
        <View style={{ marginTop: 16 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Recently Swapped</Text>
          <TouchableOpacity 
            style={[styles.swappedCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]} 
            onPress={() => handleSafeNavigate('/swap/99', 'Viewing Modern Desk Lamp swap details.')}
            activeOpacity={0.9}
          >
            <Image source={{ uri: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150' }} style={styles.swappedImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.swappedTitle, isDarkMode && { color: '#FFFFFF' }]}>Modern Desk Lamp</Text>
              <Text style={styles.swappedSubtitle}>Traded with @mark_t</Text>
            </View>
            <View style={styles.completedInfoBox}>
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Completed</Text>
              </View>
              <Text style={styles.swappedTimeText}>2 days ago</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account & Settings Section */}
        <View style={{ marginTop: 16, marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Account & Settings</Text>
          <View style={[styles.accountCard, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}>
            
            <View style={styles.accountRow}>
              <View style={styles.accountRowLeft}>
                <Ionicons name="moon-outline" size={18} color="#104A27" style={{ marginRight: 12 }} />
                <Text style={[styles.accountRowText, isDarkMode && { color: '#FFFFFF' }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#D6D3D1', true: '#104A27' }}
                thumbColor={'#FFFFFF'}
              />
            </View>

            <View style={[styles.accountRow, styles.accountRowBorder, isDarkMode && { borderTopColor: '#333' }]}>
              <View style={styles.accountRowLeft}>
                <Ionicons name="notifications-outline" size={18} color="#104A27" style={{ marginRight: 12 }} />
                <Text style={[styles.accountRowText, isDarkMode && { color: '#FFFFFF' }]}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D6D3D1', true: '#104A27' }}
                thumbColor={'#FFFFFF'}
              />
            </View>

            <TouchableOpacity 
              style={[styles.accountRow, styles.accountRowBorder, isDarkMode && { borderTopColor: '#333' }]} 
              onPress={() => handleSafeNavigate('/settings', 'Opening settings page...')}
            >
              <View style={styles.accountRowLeft}>
                <Ionicons name="settings-outline" size={18} color="#104A27" style={{ marginRight: 12 }} />
                <Text style={[styles.accountRowText, isDarkMode && { color: '#FFFFFF' }]}>Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#78716C" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.accountRow, styles.accountRowBorder, isDarkMode && { borderTopColor: '#333' }]} 
              onPress={handleLogout}
            >
              <View style={styles.accountRowLeft}>
                <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 12 }} />
                <Text style={[styles.accountRowText, { color: '#DC2626' }]}>Logout</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#DC2626" />
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && { backgroundColor: '#1E1E1E' }]}>
            <Text style={[styles.modalTitle, isDarkMode && { color: '#4ADE80' }]}>Edit Profile</Text>
            
            <TextInput
              style={[styles.modalInput, isDarkMode && { backgroundColor: '#2D2D2D', color: '#FFF', borderColor: '#444' }]}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[styles.modalInput, isDarkMode && { backgroundColor: '#2D2D2D', color: '#FFF', borderColor: '#444' }]}
              placeholder="Location"
              placeholderTextColor="#888"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={[styles.modalInput, { height: 80, textAlignVertical: 'top' }, isDarkMode && { backgroundColor: '#2D2D2D', color: '#FFF', borderColor: '#444' }]}
              placeholder="Bio"
              placeholderTextColor="#888"
              multiline
              value={bio}
              onChangeText={setBio}
            />

            <TouchableOpacity 
              style={styles.submitModalBtn} 
              onPress={() => {
                Alert.alert('Success', 'Profile updated successfully!');
                setIsEditModalVisible(false);
              }}
            >
              <Text style={styles.submitModalBtnText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.cancelModalBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F6F0' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  topBarIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EAE6DF', justifyContent: 'center', alignItems: 'center' },
  appTitle: { fontSize: 18, fontWeight: 'bold', color: '#104A27', letterSpacing: 0.3 },
  topAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: '#104A27' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 100 },
  profileHeader: { alignItems: 'center', marginTop: 8, marginBottom: 16 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 92, height: 92, borderRadius: 46, borderWidth: 3, borderColor: '#104A27' },
  cameraBadge: { position: 'absolute', bottom: 2, right: 2, backgroundColor: '#104A27', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F8F6F0' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  nameText: { fontSize: 22, fontWeight: 'bold', color: '#1C1917', marginRight: 8 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E2EEE5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  verifiedText: { fontSize: 10, fontWeight: 'bold', color: '#104A27', marginLeft: 3 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationText: { fontSize: 13, color: '#78716C', marginLeft: 3, fontWeight: '500' },
  bioText: { fontSize: 13, color: '#57534E', textAlign: 'center', paddingHorizontal: 16, marginBottom: 16, lineHeight: 19 },
  editProfileBtn: { flexDirection: 'row', backgroundColor: '#104A27', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 22, alignItems: 'center', shadowColor: '#104A27', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  editProfileBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1C1917', marginBottom: 10, marginTop: 8 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  viewAllText: { fontSize: 13, fontWeight: '600', color: '#104A27' },
  
  badgesRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  badgeCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: '#EBE7E1', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  badgeCardText: { fontSize: 11, fontWeight: '600', color: '#1C1917', marginTop: 6, textAlign: 'center' },

  impactMainCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#EBE7E1', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  impactHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  impactCardTitle: { fontSize: 11, fontWeight: 'bold', color: '#104A27', letterSpacing: 0.8 },
  impactCountText: { fontSize: 24, fontWeight: 'bold', color: '#1C1917', marginBottom: 10 },
  progressCircleContainer: { alignItems: 'center', marginVertical: 8 },
  progressOuterRing: { width: 94, height: 94, borderRadius: 47, borderWidth: 6, borderColor: '#E2EEE5', borderTopColor: '#104A27', borderRightColor: '#104A27', justifyContent: 'center', alignItems: 'center' },
  leafInnerIconBox: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#E2EEE5', justifyContent: 'center', alignItems: 'center' },
  impactSubMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 14 },
  subMetricBox: { flex: 1, backgroundColor: '#F9F8F6', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#EFECE6' },
  subMetricLabel: { fontSize: 12, fontWeight: '600', color: '#104A27' },
  subMetricValue: { fontSize: 18, fontWeight: 'bold', color: '#1C1917', marginBottom: 6 },
  subMetricSubtext: { fontSize: 11, color: '#78716C' },
  co2BarBackground: { height: 4, backgroundColor: '#E2E0DD', borderRadius: 2, overflow: 'hidden' },
  co2BarFill: { width: '65%', height: '100%', backgroundColor: '#104A27', borderRadius: 2 },
  topContributorCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E2EEE5', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#CDE4D6' },
  topContributorTitle: { fontSize: 13, fontWeight: 'bold', color: '#104A27', marginBottom: 2 },
  topContributorSubtitle: { fontSize: 11, color: '#4B5563' },

  listingsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  listingCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: '#EBE7E1', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  listingImage: { width: '100%', height: 115 },
  listingTagBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.92)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  listingTagText: { fontSize: 10, fontWeight: 'bold', color: '#104A27' },
  listingDetails: { padding: 10 },
  listingItemTitle: { fontSize: 13, fontWeight: 'bold', color: '#1C1917', marginBottom: 2 },
  listingItemDesc: { fontSize: 11, color: '#78716C', marginBottom: 8 },
  itemEditBtn: { backgroundColor: '#F3F4F6', borderRadius: 8, paddingVertical: 6, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  itemEditBtnText: { fontSize: 11, fontWeight: '600', color: '#374151' },
  listNewCard: { width: '48%', height: 190, backgroundColor: 'transparent', borderRadius: 14, borderWidth: 1.5, borderColor: '#CBD5E1', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  plusIconCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E2EEE5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  listNewText: { fontSize: 12, fontWeight: '600', color: '#104A27' },

  swappedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#EBE7E1', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  swappedImage: { width: 48, height: 48, borderRadius: 10 },
  swappedTitle: { fontSize: 13, fontWeight: 'bold', color: '#1C1917', marginBottom: 2 },
  swappedSubtitle: { fontSize: 11, color: '#78716C' },
  completedInfoBox: { alignItems: 'flex-end' },
  completedBadge: { backgroundColor: '#E2EEE5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginBottom: 4 },
  completedBadgeText: { fontSize: 9, fontWeight: 'bold', color: '#104A27' },
  swappedTimeText: { fontSize: 10, color: '#9CA3AF' },

  accountCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 4, borderWidth: 1, borderColor: '#EBE7E1', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13 },
  accountRowBorder: { borderTopWidth: 1, borderTopColor: '#EBE7E1' },
  accountRowLeft: { flexDirection: 'row', alignItems: 'center' },
  accountRowText: { fontSize: 14, fontWeight: '600', color: '#1C1917' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#F8F6F0', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#104A27', marginBottom: 14 },
  modalInput: { width: '100%', borderWidth: 1, borderColor: '#D6D3D1', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, color: '#1C1917', marginBottom: 12 },
  submitModalBtn: { width: '100%', backgroundColor: '#104A27', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  submitModalBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  cancelModalBtn: { marginTop: 10, paddingVertical: 6 },
  cancelModalBtnText: { color: '#78716C', fontSize: 13, fontWeight: '600' },
});