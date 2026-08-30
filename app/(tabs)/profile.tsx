import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  // Profile States
  const [name, setName] = useState('Sarah Jenkins');
  const [location, setLocation] = useState('Portland, OR');
  const [bio, setBio] = useState('Avid gardener, vintage clothing enthusiast, and believer in the circular economy.');
  
  // Profile Picture State
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
  );

  // Safe navigation handler to prevent "Unmatched Route" crashes (Updated for tabs)
  const handleSafeNavigate = (routePath: string, fallbackMessage: string) => {
    try {
      if (routePath === '/impact') {
        router.push('/(tabs)/impact' as any);
      } else {
        router.push(routePath as any);
      }
    } catch (error) {
      try {
        router.push('/(tabs)/impact' as any);
      } catch (err) {
        Alert.alert('Notice', fallbackMessage);
      }
    }
  };

  // Function to pick image from gallery
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Gallery permission is required to change profile picture!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    <SafeAreaView style={[styles.container, isDarkMode && { backgroundColor: '#1C1917' }]}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="location-outline" size={20} color="#166534" />
        </TouchableOpacity>
        <Text style={[styles.appTitle, isDarkMode && { color: '#4ADE80' }]}>EcoTrade</Text>
        <Image
          source={{ uri: profileImage }}
          style={styles.topAvatar}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Info Section */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <View style={styles.nameRow}>
            <Text style={[styles.nameText, isDarkMode && { color: '#FFFFFF' }]}>{name}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={12} color="#166534" />
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
          >
            <Ionicons name="pencil" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Sustainability Impact Section */}
        <View style={{ marginTop: 5 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Sustainability Impact</Text>
          
          <TouchableOpacity 
            style={[styles.impactMainCard, isDarkMode && { backgroundColor: '#292524', borderColor: '#444' }]}
            onPress={() => handleSafeNavigate('/impact', 'Navigating to full impact report...')}
          >
            <View style={styles.impactHeaderRow}>
              <Ionicons name="leaf-outline" size={16} color="#166534" style={{ marginRight: 6 }} />
              <Text style={styles.impactCardTitle}>LANDFILL DIVERTED</Text>
            </View>
            <Text style={[styles.impactCountText, isDarkMode && { color: '#FFFFFF' }]}>12 items</Text>

            {/* Circular Progress Representation */}
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressOuterRing}>
                <View style={styles.leafInnerIconBox}>
                  <Ionicons name="leaf" size={20} color="#166534" />
                </View>
              </View>
            </View>

            {/* Sub Metrics Row */}
            <View style={styles.impactSubMetricsRow}>
              <View style={styles.subMetricBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Ionicons name="stats-chart-outline" size={14} color="#166534" style={{ marginRight: 4 }} />
                  <Text style={styles.subMetricLabel}>CO2 Offset</Text>
                </View>
                <Text style={[styles.subMetricValue, isDarkMode && { color: '#FFFFFF' }]}>45 <Text style={{ fontSize: 13, fontWeight: 'normal' }}>kg</Text></Text>
                <View style={styles.co2BarBackground}>
                  <View style={styles.co2BarFill} />
                </View>
              </View>

              <View style={styles.subMetricBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Ionicons name="swap-horizontal-outline" size={14} color="#991B1B" style={{ marginRight: 4 }} />
                  <Text style={[styles.subMetricLabel, { color: '#991B1B' }]}>Swaps</Text>
                </View>
                <Text style={[styles.subMetricValue, isDarkMode && { color: '#FFFFFF' }]}>8</Text>
                <Text style={styles.subMetricSubtext}>Total completed</Text>
              </View>
            </View>

            {/* Top Contributor Badge Card */}
            <TouchableOpacity 
              style={styles.topContributorCard}
              onPress={() => Alert.alert('Top Contributor', 'See how to maintain your status.')}
            >
              <View>
                <Text style={styles.topContributorTitle}>Top Contributor</Text>
                <Text style={styles.topContributorSubtitle}>Top 5% in your neighborhood</Text>
              </View>
              <Ionicons name="ribbon-outline" size={24} color="#166534" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Active Listings Section */}
        <View style={{ marginTop: 15 }}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }, isDarkMode && { color: '#FFFFFF' }]}>Active Listings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listingsGrid}>
            {/* Item 1 */}
            <TouchableOpacity 
              style={[styles.listingCard, isDarkMode && { backgroundColor: '#292524', borderColor: '#444' }]}
              onPress={() => handleSafeNavigate('/item/123', 'Opening Vintage Ceramic Planter details...')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300' }} 
                style={styles.listingImage} 
              />
              <View style={styles.listingTagBadge}>
                <Text style={styles.listingTagText}>Garden</Text>
              </View>
              <View style={styles.listingDetails}>
                <Text style={[styles.listingItemTitle, isDarkMode && { color: '#FFFFFF' }]} numberOfLines={1}>Vintage Ceramic P...</Text>
                <Text style={styles.listingItemDesc} numberOfLines={1}>Excellent condition, rarely used.</Text>
                <TouchableOpacity style={styles.itemEditBtn} onPress={(e) => { e.stopPropagation(); handleSafeNavigate('/item/edit/123', 'Opening edit page...'); }}>
                  <Text style={styles.itemEditBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity 
              style={[styles.listingCard, isDarkMode && { backgroundColor: '#292524', borderColor: '#444' }]}
              onPress={() => handleSafeNavigate('/item/124', 'Opening Hand-Knit Sweater details...')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300' }} 
                style={styles.listingImage} 
              />
              <View style={styles.listingTagBadge}>
                <Text style={styles.listingTagText}>Clothing</Text>
              </View>
              <View style={styles.listingDetails}>
                <Text style={[styles.listingItemTitle, isDarkMode && { color: '#FFFFFF' }]} numberOfLines={1}>Hand-Knit Sweate...</Text>
                <Text style={styles.listingItemDesc} numberOfLines={1}>Size M, wool blend.</Text>
                <TouchableOpacity style={styles.itemEditBtn} onPress={(e) => { e.stopPropagation(); handleSafeNavigate('/item/edit/124', 'Opening edit page...'); }}>
                  <Text style={styles.itemEditBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* List New Item Card */}
            <TouchableOpacity 
              style={[styles.listNewCard, isDarkMode && { borderColor: '#555' }]}
              onPress={() => handleSafeNavigate('/item/create', 'Opening new item creation form...')}
            >
              <View style={styles.plusIconCircle}>
                <Ionicons name="add" size={20} color="#166534" />
              </View>
              <Text style={styles.listNewText}>List New Item</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Swapped Section */}
        <View style={{ marginTop: 15 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Recently Swapped</Text>
          <TouchableOpacity 
            style={[styles.swappedCard, isDarkMode && { backgroundColor: '#292524', borderColor: '#444' }]} 
            onPress={() => handleSafeNavigate('/swap/99', 'Viewing Modern Desk Lamp swap details.')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150' }} 
              style={styles.swappedImage} 
            />
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
        <View style={{ marginTop: 15 }}>
          <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Account & Settings</Text>
          <View style={[styles.accountCard, isDarkMode && { backgroundColor: '#292524', borderColor: '#444' }]}>
            
            {/* Dark Mode Switch */}
            <View style={styles.accountRow}>
              <View style={styles.accountRowLeft}>
                <Ionicons name="moon-outline" size={18} color="#166534" style={{ marginRight: 10 }} />
                <Text style={[styles.accountRowText, isDarkMode && { color: '#FFFFFF' }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#D6D3D1', true: '#166534' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            {/* Settings Option */}
            <TouchableOpacity 
              style={[styles.accountRow, styles.accountRowBorder, isDarkMode && { borderTopColor: '#444' }]} 
              onPress={() => handleSafeNavigate('/settings', 'Opening settings page...')}
            >
              <View style={styles.accountRowLeft}>
                <Ionicons name="settings-outline" size={18} color="#166534" style={{ marginRight: 10 }} />
                <Text style={[styles.accountRowText, isDarkMode && { color: '#FFFFFF' }]}>Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#78716C" />
            </TouchableOpacity>

            {/* Logout Option */}
            <TouchableOpacity 
              style={[styles.accountRow, styles.accountRowBorder, isDarkMode && { borderTopColor: '#444' }]} 
              onPress={handleLogout}
            >
              <View style={styles.accountRowLeft}>
                <Ionicons name="log-out-outline" size={18} color="#DC2626" style={{ marginRight: 10 }} />
                <Text style={[styles.accountRowText, { color: '#DC2626' }]}>Logout</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#DC2626" />
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Location"
              placeholderTextColor="#888"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
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
  container: { flex: 1, backgroundColor: '#FAF7EE' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  appTitle: { fontSize: 18, fontWeight: 'bold', color: '#166534' },
  topAvatar: { width: 28, height: 28, borderRadius: 14 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 80 },
  profileHeader: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 85, height: 85, borderRadius: 42.5, borderWidth: 3, borderColor: '#D1E7DD' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#166534', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FAF7EE' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  nameText: { fontSize: 20, fontWeight: 'bold', color: '#1C1917', marginRight: 6 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E2F0E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  verifiedText: { fontSize: 10, fontWeight: 'bold', color: '#166534', marginLeft: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationText: { fontSize: 13, color: '#78716C', marginLeft: 3 },
  bioText: { fontSize: 13, color: '#57534E', textAlign: 'center', paddingHorizontal: 20, marginBottom: 14, lineHeight: 18 },
  editProfileBtn: { flexDirection: 'row', backgroundColor: '#582C0D', paddingHorizontal: 20, paddingVertical: 9, borderRadius: 20, alignItems: 'center' },
  editProfileBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1C1917', marginBottom: 10, marginTop: 10 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  viewAllText: { fontSize: 13, fontWeight: '600', color: '#166534' },
  
  // Sustainability Impact Expanded Styles
  impactMainCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E7E5E4' },
  impactHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  impactCardTitle: { fontSize: 12, fontWeight: 'bold', color: '#166534', letterSpacing: 0.5 },
  impactCountText: { fontSize: 22, fontWeight: 'bold', color: '#1C1917', marginBottom: 10 },
  progressCircleContainer: { alignItems: 'center', marginVertical: 10 },
  progressOuterRing: { width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderColor: '#E2F0E9', borderTopColor: '#166534', borderRightColor: '#166534', justifyContent: 'center', alignItems: 'center' },
  leafInnerIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E2F0E9', justifyContent: 'center', alignItems: 'center' },
  impactSubMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 12 },
  subMetricBox: { flex: 1, backgroundColor: '#F9F6F0', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEEDEC' },
  subMetricLabel: { fontSize: 12, fontWeight: '600', color: '#166534' },
  subMetricValue: { fontSize: 18, fontWeight: 'bold', color: '#1C1917', marginBottom: 6 },
  subMetricSubtext: { fontSize: 11, color: '#78716C' },
  co2BarBackground: { height: 4, backgroundColor: '#E2E0DD', borderRadius: 2, overflow: 'hidden' },
  co2BarFill: { width: '65%', height: '100%', backgroundColor: '#166534', borderRadius: 2 },
  topContributorCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E2F0E9', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#C6E2D4' },
  topContributorTitle: { fontSize: 13, fontWeight: 'bold', color: '#166534', marginBottom: 2 },
  topContributorSubtitle: { fontSize: 11, color: '#4B5563' },

  // Active Listings Styles
  listingsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  listingCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 14, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: '#E7E5E4', position: 'relative' },
  listingImage: { width: '100%', height: 110 },
  listingTagBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  listingTagText: { fontSize: 10, fontWeight: 'bold', color: '#166534' },
  listingDetails: { padding: 10 },
  listingItemTitle: { fontSize: 13, fontWeight: 'bold', color: '#1C1917', marginBottom: 2 },
  listingItemDesc: { fontSize: 11, color: '#78716C', marginBottom: 8 },
  itemEditBtn: { backgroundColor: '#F3F4F6', borderRadius: 8, paddingVertical: 6, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  itemEditBtnText: { fontSize: 11, fontWeight: '600', color: '#374151' },
  listNewCard: { width: '48%', height: 185, backgroundColor: 'transparent', borderRadius: 14, borderWidth: 1.5, borderColor: '#D1D5DB', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  plusIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E2F0E9', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  listNewText: { fontSize: 12, fontWeight: '600', color: '#166534' },

  // Recently Swapped Styles
  swappedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#E7E5E4' },
  swappedImage: { width: 45, height: 45, borderRadius: 8 },
  swappedTitle: { fontSize: 13, fontWeight: 'bold', color: '#1C1917', marginBottom: 2 },
  swappedSubtitle: { fontSize: 11, color: '#78716C' },
  completedInfoBox: { alignItems: 'flex-end' },
  completedBadge: { backgroundColor: '#E2F0E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginBottom: 4 },
  completedBadgeText: { fontSize: 9, fontWeight: 'bold', color: '#166534' },
  swappedTimeText: { fontSize: 10, color: '#9CA3AF' },

  // Account Card Styles
  accountCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 15, borderWidth: 1, borderColor: '#E7E5E4' },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  accountRowBorder: { borderTopWidth: 1, borderTopColor: '#E7E5E4' },
  accountRowLeft: { flexDirection: 'row', alignItems: 'center' },
  accountRowText: { fontSize: 14, fontWeight: '600', color: '#1C1917' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FAF7EE', borderRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#166534', marginBottom: 12 },
  modalInput: { width: '100%', borderWidth: 1, borderColor: '#D6D3D1', backgroundColor: '#FFFFFF', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 13, color: '#1C1917', marginBottom: 10 },
  submitModalBtn: { width: '100%', backgroundColor: '#166534', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  submitModalBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  cancelModalBtn: { marginTop: 10, paddingVertical: 6 },
  cancelModalBtnText: { color: '#78716C', fontSize: 13, fontWeight: '600' },
});