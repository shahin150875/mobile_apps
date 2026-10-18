import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/ThemeContext'; // গ্লোবাল থিম হুক ইম্পোর্ট করা হলো

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme(); // ডার্ক মোড স্টেট নেওয়া হলো

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#4ADE80' : '#143628', 
        tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#8A9A86', 
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1917' : '#FAF7F2', 
          borderTopColor: isDarkMode ? '#292524' : '#E6E2D8',
          borderTopWidth: 1,
          height: 65 + (insets.bottom > 0 ? insets.bottom : 10),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          elevation: 20,
          shadowColor: isDarkMode ? '#000000' : '#143628',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          overflow: 'visible',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && (isDarkMode ? styles.activeDarkBg : styles.activeIconBg)]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && (isDarkMode ? styles.activeDarkBg : styles.activeIconBg)]}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: 'Trade',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerContainer}>
              {/* নিখুঁত কার্ভড বর্ডার যা ডার্ক বা লাইট মোডের সাথে ম্যাচ করবে */}
              <View style={[styles.curvedNotchBackground, { backgroundColor: isDarkMode ? '#1C1917' : '#FAF7F2', borderColor: isDarkMode ? '#292524' : '#E6E2D8' }]} />
              
              <View style={[styles.tradeFloatingButton, { backgroundColor: isDarkMode ? '#1C1917' : '#FAF7F2', borderColor: isDarkMode ? '#292524' : '#E6E2D8' }]}>
                <View style={[styles.tradeInnerCircle, { backgroundColor: isDarkMode ? '#292524' : '#143628' }]}>
                  <Ionicons 
                    name="apps" 
                    size={24} 
                    color="#FFFFFF" 
                  />
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && (isDarkMode ? styles.activeDarkBg : styles.activeIconBg)]}>
              <Ionicons 
                name={focused ? "chatbubble" : "chatbubble-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.iconContainer, focused && (isDarkMode ? styles.activeDarkBg : styles.activeIconBg)]}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="impact"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  activeIconBg: {
    backgroundColor: '#EBF2EE', // লাইট মোডের জন্য
  },
  activeDarkBg: {
    backgroundColor: '#292524', // ডার্ক মোডের জন্য সিলেক্টেড ব্যাকগ্রাউন্ড
  },
  centerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  curvedNotchBackground: {
    position: 'absolute',
    top: -18,
    width: 66,
    height: 38,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    borderWidth: 1,
    borderBottomWidth: 0,
    zIndex: 1,
  },
  tradeFloatingButton: {
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    padding: 2,
    zIndex: 2,
    borderWidth: 1,
  },
  tradeInnerCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});