import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Switch,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

// Languages List
const LANGUAGES = [
  { id: '1', name: 'English', code: 'en' },
  { id: '2', name: 'বাংলা (Bangla)', code: 'bn' },
  { id: '3', name: 'हिन्दी (Hindi)', code: 'hi' },
  { id: '4', name: 'Español (Spanish)', code: 'es' },
  { id: '5', name: 'العربية (Arabic)', code: 'ar' },
];

export default function SettingsScreen() {
  const router = useRouter();

  // Modal States
  const [passwordModal, setPasswordModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [infoModal, setInfoModal] = useState<{ visible: boolean; title: string; content: string }>({
    visible: false,
    title: '',
    content: '',
  });

  // Form Inputs
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Preference States
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Password Validation Handler
  const handleChangePassword = () => {
    const minLength = newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!minLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      Alert.alert('Invalid Password', 'Password does not meet all security requirements.');
      return;
    }

    Alert.alert('Success', 'Password updated successfully!');
    setNewPassword('');
    setPasswordModal(false);
  };

  // Email Validation Handler
  const handleChangeEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., user@example.com)');
      return;
    }

    Alert.alert('Verification Sent', `A confirmation link has been sent to ${newEmail}`);
    setNewEmail('');
    setEmailModal(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1917" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setPasswordModal(true)}>
          <View style={styles.leftRow}>
            <Ionicons name="key-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => setEmailModal(true)}>
          <View style={styles.leftRow}>
            <Ionicons name="mail-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Update Email</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 0 }]}
          onPress={() =>
            setInfoModal({
              visible: true,
              title: 'Privacy & Security',
              content:
                '1. Data Encryption: All personal details and account data are 256-bit encrypted.\n\n2. Privacy Policy: We do not sell or share your credentials with third parties.\n\n3. Session Security: Automatic logout after extended inactivity.',
            })
          }
        >
          <View style={styles.leftRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Privacy & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setNotificationModal(true)}>
          <View style={styles.leftRow}>
            <Ionicons name="notifications-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Notification Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => setLanguageModal(true)}>
          <View style={styles.leftRow}>
            <Ionicons name="globe-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Language ({selectedLanguage})</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            setInfoModal({
              visible: true,
              title: 'Help & FAQ',
              content:
                'Q: How to reset password?\nA: Go to Account > Change Password.\n\nQ: How to contact support?\nA: Email us directly at support@ecotrade.com.\n\nQ: App Version?\nA: EcoTrade v1.0.4',
            })
          }
        >
          <View style={styles.leftRow}>
            <Ionicons name="help-circle-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Help & FAQ</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomWidth: 0 }]}
          onPress={() =>
            setInfoModal({
              visible: true,
              title: 'Terms & Policies',
              content:
                'EcoTrade Terms of Service v1.0\n\nBy using this app, you agree to follow our trading guidelines, fair-use policies, and community terms of safety.',
            })
          }
        >
          <View style={styles.leftRow}>
            <Ionicons name="document-text-outline" size={20} color="#2D4A22" />
            <Text style={styles.menuText}>Terms & Policies</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#78716C" />
        </TouchableOpacity>
      </View>

      {/* Password Modal */}
      <Modal visible={passwordModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.rulesContainer}>
              <Text style={styles.rulesHeader}>Password Rules:</Text>
              <Text style={styles.ruleText}>• Minimum 8 characters</Text>
              <Text style={styles.ruleText}>• Uppercase (A-Z) & Lowercase (a-z)</Text>
              <Text style={styles.ruleText}>• Number (0-9) & Symbol (!@#$%^&*)</Text>
            </View>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setPasswordModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={handleChangePassword}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Email Modal */}
      <Modal visible={emailModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={newEmail}
              onChangeText={setNewEmail}
            />
            <View style={styles.rulesContainer}>
              <Text style={styles.rulesHeader}>Email Rules:</Text>
              <Text style={styles.ruleText}>• Must contain valid domain (@email.com)</Text>
              <Text style={styles.ruleText}>• Verification link will be sent</Text>
            </View>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setEmailModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={handleChangeEmail}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Notification Preferences Modal */}
      <Modal visible={notificationModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Settings</Text>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Push Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Email Alerts</Text>
              <Switch
                value={emailNotif}
                onValueChange={setEmailNotif}
                trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Order Status Updates</Text>
              <Switch
                value={orderUpdates}
                onValueChange={setOrderUpdates}
                trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Promotions & Offers</Text>
              <Switch
                value={promoOffers}
                onValueChange={setPromoOffers}
                trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.optionRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.optionText}>Sound & Vibration</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#D4D2C3', true: '#2D4A22' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity
              style={[styles.modalBtn, styles.saveBtn, { marginTop: 16 }]}
              onPress={() => setNotificationModal(false)}
            >
              <Text style={[styles.saveBtnText, { textAlign: 'center' }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal visible={languageModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: 400 }]}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.langItem}
                  onPress={() => {
                    setSelectedLanguage(item.name);
                    setLanguageModal(false);
                  }}
                >
                  <Text style={styles.langText}>{item.name}</Text>
                  {selectedLanguage === item.name && (
                    <Ionicons name="checkmark-circle" size={20} color="#2D4A22" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[styles.modalBtn, styles.cancelBtn, { marginTop: 12 }]}
              onPress={() => setLanguageModal(false)}
            >
              <Text style={[styles.cancelBtnText, { textAlign: 'center' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Information Modal (Privacy / Help / Terms) */}
      <Modal visible={infoModal.visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{infoModal.title}</Text>
            <ScrollView style={{ maxHeight: 200, marginBottom: 16 }}>
              <Text style={styles.infoContentText}>{infoModal.content}</Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalBtn, styles.saveBtn]}
              onPress={() => setInfoModal({ visible: false, title: '', content: '' })}
            >
              <Text style={[styles.saveBtnText, { textAlign: 'center' }]}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9EE',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1917',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78716C',
    marginBottom: 8,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
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
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1917',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6D3D1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  rulesContainer: {
    backgroundColor: '#F5F5F4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  rulesHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#44403C',
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 11,
    color: '#78716C',
    marginVertical: 1,
  },
  infoContentText: {
    fontSize: 13,
    color: '#44403C',
    lineHeight: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  langText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1917',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelBtn: {
    backgroundColor: '#F5F5F4',
  },
  cancelBtnText: {
    color: '#57534E',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#2D4A22',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});