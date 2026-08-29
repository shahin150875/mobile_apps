import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons name={focused ? "search" : "search-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: 'Trade',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons name={focused ? "swap-horizontal" : "swap-horizontal-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons name={focused ? "person" : "person-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#18181B',
    borderTopWidth: 0,
    height: 65,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  iconBox: {
    width: 42,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center', // ডট (.) তুলে দিয়ে 'C' বড় হাতের দিন
    alignItems: 'center',
  },
})