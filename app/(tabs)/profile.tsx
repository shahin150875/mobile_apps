import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const [name, setName] = useState('Sarah Jenkins');
  const [location, setLocation] = useState('Portland, OR');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Modal স্টেট
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempLocation, setTempLocation] = useState(location);

  // গ্যালারি থেকে ছবি সিলেক্ট করার ফাংশন
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
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

  const handleOpenEditModal = () => {
    setTempName(name);
    setTempLocation(location);
    setIsModalVisible(true);
  };

  const handleSaveProfile = () => {
    setName(tempName);
    setLocation(tempLocation);
    setIsModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ১. প্রোফাইল হেডার ও পিকচার */}
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage} activeOpacity={0.8}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color={Colors.primary} />
            </View>
          )}
          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={14} color="#FFF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>

        <TouchableOpacity 
          style={styles.editBtn} 
          onPress={handleOpenEditModal}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={14} color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ২. ইমপ্যাক্ট মেট্রিক্স কার্ড */}
      <View style={styles.impactBox}>
        <Text style={styles.boxTitle}>Sustainability Impact</Text>
        <View style={styles.statsRow}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => Alert.alert('Items Diverted', 'You have successfully diverted 12 items from landfills!')}
          >
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Items Diverted</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => Alert.alert('CO2 Offset', 'Your eco trades reduced approximately 45 kg of CO2 emissions.')}
          >
            <Text style={styles.statNumber}>45 kg</Text>
            <Text style={styles.statLabel}>CO2 Offset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ৩. ব্যাজ কার্ড */}
      <TouchableOpacity 
        style={styles.badgeCard}
        onPress={() => Alert.alert('Top Contributor', 'You are in the top 5% of active traders in your neighborhood!')}
        activeOpacity={0.9}
      >
        <Ionicons name="ribbon-outline" size={28} color="#FFF" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.badgeTitle}>Top Contributor</Text>
          <Text style={styles.badgeSub}>Top 5% in your neighborhood</Text>
        </View>
      </TouchableOpacity>

      {/* ৪. মাই ইনভেন্টরি সেকশন */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Inventory</Text>
        <TouchableOpacity onPress={() => Alert.alert('Add Item', 'Add new item form will open.')}>
          <Text style={styles.addLink}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuCard}>
        <View style={styles.inventoryItem}>
          <Ionicons name="flower-outline" size={22} color={Colors.primary} />
          <Text style={styles.inventoryText}>Monstera Plant</Text>
          <Text style={styles.statusActive}>Available</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inventoryItem}>
          <Ionicons name="book-outline" size={22} color={Colors.primary} />
          <Text style={styles.inventoryText}>Design Books Set</Text>
          <Text style={styles.statusActive}>Available</Text>
        </View>
      </View>

      {/* ৫. অপশন ও সেটিংস মেনু */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Account & Options</Text>

      <View style={styles.menuCard}>
        <TouchableOpacity 
          style={styles.menuRow}
          onPress={() => Alert.alert('Trade History', 'You have completed 8 successful trades!')}
        >
          <Ionicons name="time-outline" size={20} color={Colors.textDark} />
          <Text style={styles.menuText}>Trade History</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuRow}
          onPress={() => Alert.alert('Settings', 'Settings screen coming soon!')}
        >
          <Ionicons name="settings-outline" size={20} color={Colors.textDark} />
          <Text style={styles.menuText}>Settings & Privacy</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuRow}
          onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', style: 'destructive' }
          ])}
        >
          <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
          <Text style={[styles.menuText, { color: '#D32F2F' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter name"
              placeholderTextColor={Colors.textMuted}
            />

            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              value={tempLocation}
              onChangeText={setTempLocation}
              placeholder="Enter location"
              placeholderTextColor={Colors.textMuted}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalBtn, styles.saveBtn]} 
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E4D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.buttonBrown,
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  location: {
    fontSize: 12,
    color: Colors.textMuted,
    marginVertical: 2,
  },
  editBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.buttonBrown,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  impactBox: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F3F4EE',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  badgeTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  badgeSub: {
    color: '#A3B899',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
  },
  addLink: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  inventoryText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDark,
  },
  statusActive: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: Colors.textDark,
    fontSize: 14,
    marginBottom: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelBtn: {
    backgroundColor: 'transparent',
  },
  cancelBtnText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: Colors.primary,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});