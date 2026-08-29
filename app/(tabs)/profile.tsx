import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Picture Change Function
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Edit Profile Action
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit Profile button clicked!');
  };

  // Settings Action (Navigates to settings screen)
  const handleSettings = () => {
    router.push('/settings');
  };

  // Logout Action
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Logged Out', 'You have been logged out.');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode && { backgroundColor: '#121212' }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Navigation */}
      <View style={styles.headerNav}>
        <Ionicons name="location-outline" size={22} color={isDarkMode ? '#A7F3D0' : '#2D4A22'} />
        <Text style={[styles.headerBrand, isDarkMode && { color: '#FFFFFF' }]}>EcoTrade</Text>
        <Image source={{ uri: profileImage }} style={styles.topAvatar} />
      </View>

      {/* Main Profile Info */}
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <View style={styles.avatarBorder}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          </View>
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={14} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <View style={styles.nameRow}>
          <Text style={[styles.name, isDarkMode && { color: '#FFFFFF' }]}>Sarah Jenkins</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle-outline" size={12} color="#2D4A22" />
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        </View>

        <Text style={styles.location}>📍 Portland, OR</Text>
        <Text style={[styles.bio, isDarkMode && { color: '#A8A29E' }]}>
          Avid gardener, vintage clothing enthusiast, and believer in the circular economy.
        </Text>

        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings Menu */}
      <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>
        Account & Settings
      </Text>

      <View style={[styles.menuContainer, isDarkMode && { backgroundColor: '#1E1E1E', borderColor: '#333' }]}>
        {/* Dark Mode Toggle */}
        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Ionicons name="moon-outline" size={20} color={isDarkMode ? '#A7F3D0' : '#2D4A22'} />
            <Text style={[styles.menuText, isDarkMode && { color: '#FFFFFF' }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
            trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Settings Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <View style={styles.menuLeft}>
            <Ionicons name="settings-outline" size={20} color={isDarkMode ? '#A7F3D0' : '#2D4A22'} />
            <Text style={[styles.menuText, isDarkMode && { color: '#FFFFFF' }]}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={[styles.menuText, { color: '#DC2626' }]}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#DC2626" />
        </TouchableOpacity>
      </View>

      {/* Sustainability Impact Section */}
      <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>
        Sustainability Impact
      </Text>

      {/* Landfill Diverted Card */}
      <View style={styles.impactMainCard}>
        <View style={styles.cardHeaderRow}>
          <Ionicons name="sync-outline" size={18} color="#2D4A22" />
          <Text style={styles.cardHeaderLabel}>LANDFILL DIVERTED</Text>
        </View>
        <Text style={styles.impactMainValue}>
          12 <Text style={styles.impactUnit}>items</Text>
        </Text>

        <View style={styles.progressCircleContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Ionicons name="leaf-outline" size={22} color="#2D4A22" />
            </View>
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statMiniCard}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="cloud-outline" size={14} color="#2D4A22" />
            <Text style={styles.miniCardLabel}>CO2 Offset</Text>
          </View>
          <Text style={styles.statMiniValue}>
            45 <Text style={styles.statMiniUnit}>kg</Text>
          </Text>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        <View style={styles.statMiniCard}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="hand-left-outline" size={14} color="#7C2D12" />
            <Text style={[styles.miniCardLabel, { color: '#7C2D12' }]}>Swaps</Text>
          </View>
          <Text style={styles.statMiniValue}>8</Text>
          <Text style={styles.subText}>Total completed</Text>
        </View>
      </View>

      {/* Top Contributor Banner */}
      <View style={styles.contributorBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Top Contributor</Text>
          <Text style={styles.bannerSubtitle}>Top 5% in your neighborhood</Text>
        </View>
        <Ionicons name="ribbon-outline" size={28} color="#FFFFFF" />
      </View>

      {/* Active Listings Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Active Listings</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        <View style={styles.listingCard}>
          <View style={styles.listingImageHolder}>
            <Ionicons name="flower-outline" size={32} color="#2D4A22" />
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>Garden</Text>
            </View>
          </View>
          <Text style={styles.listingTitle} numberOfLines={1}>Vintage Ceramic P...</Text>
          <Text style={styles.listingSubtitle} numberOfLines={2}>
            Excellent condition, rarely used.
          </Text>
          <TouchableOpacity style={styles.cardActionBtn}>
            <Text style={styles.cardActionBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listingCard}>
          <View style={styles.listingImageHolder}>
            <Ionicons name="shirt-outline" size={32} color="#2D4A22" />
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>Clothing</Text>
            </View>
          </View>
          <Text style={styles.listingTitle} numberOfLines={1}>Hand-Knit Sweate...</Text>
          <Text style={styles.listingSubtitle} numberOfLines={2}>
            Size M, wool blend.
          </Text>
          <TouchableOpacity style={styles.cardActionBtn}>
            <Text style={styles.cardActionBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.listingCard, styles.addNewCard]}>
          <View style={styles.addCircle}>
            <Ionicons name="add" size={24} color="#2D4A22" />
          </View>
          <Text style={styles.addNewText}>List New Item</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Recently Swapped Section */}
      <Text style={[styles.sectionTitle, isDarkMode && { color: '#FFFFFF' }]}>Recently Swapped</Text>
      <View style={styles.recentItemCard}>
        <View style={styles.recentImageHolder}>
          <Ionicons name="bulb-outline" size={24} color="#2D4A22" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.recentTitle}>Modern Desk Lamp</Text>
          <Text style={styles.recentSubtitle}>Traded with @mark_t</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>Completed</Text>
          </View>
          <Text style={styles.timeAgoText}>2 days ago</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9EE',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D4A22',
  },
  topAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#2D4A22',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FBF9EE',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1917',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 3,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2D4A22',
  },
  location: {
    color: '#78716C',
    fontSize: 13,
    marginTop: 4,
  },
  bio: {
    color: '#57534E',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A1D13',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 4,
  },
  editBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1917',
  },
  impactMainCard: {
    backgroundColor: '#EBE9D8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardHeaderLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D4A22',
  },
  impactMainValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1917',
    marginTop: 6,
  },
  impactUnit: {
    fontSize: 16,
    fontWeight: '400',
    color: '#57534E',
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: '#D4D2C3',
    borderTopColor: '#2D4A22',
    borderRightColor: '#2D4A22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EBE9D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statMiniCard: {
    flex: 1,
    backgroundColor: '#EBE9D8',
    borderRadius: 14,
    padding: 14,
  },
  miniCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D4A22',
  },
  statMiniValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1917',
    marginVertical: 4,
  },
  statMiniUnit: {
    fontSize: 14,
    fontWeight: '400',
  },
  subText: {
    fontSize: 11,
    color: '#78716C',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#D4D2C3',
    borderRadius: 3,
    marginTop: 8,
  },
  progressBarFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#2D4A22',
    borderRadius: 3,
  },
  contributorBanner: {
    backgroundColor: '#1C3E18',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  bannerSubtitle: {
    color: '#A7F3D0',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 12,
    color: '#57534E',
    fontWeight: '600',
  },
  horizontalList: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  listingCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  listingImageHolder: {
    height: 100,
    backgroundColor: '#F5F5F4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  tagBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1C1917',
  },
  listingTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1917',
  },
  listingSubtitle: {
    fontSize: 11,
    color: '#78716C',
    marginTop: 2,
    marginBottom: 8,
    height: 28,
  },
  cardActionBtn: {
    borderWidth: 1,
    borderColor: '#D6D3D1',
    borderRadius: 8,
    paddingVertical: 5,
    alignItems: 'center',
  },
  cardActionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#44403C',
  },
  addNewCard: {
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#A8A29E',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 205,
  },
  addCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBE9D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addNewText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#44403C',
  },
  recentItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  recentImageHolder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1917',
  },
  recentSubtitle: {
    fontSize: 12,
    color: '#78716C',
    marginTop: 2,
  },
  completedBadge: {
    backgroundColor: '#D1E7DD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  completedBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0F5132',
  },
  timeAgoText: {
    fontSize: 10,
    color: '#A8A29E',
    marginTop: 4,
  },
});