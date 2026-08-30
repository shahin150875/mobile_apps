import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#166534',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E7E5E4',
          height: 60,
          paddingBottom: 8,
        }
      }}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} /> }} />
      <Tabs.Screen name="search" options={{ headerShown: false, title: 'Search', tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={20} color={color} /> }} />
      <Tabs.Screen name="chat" options={{ headerShown: false, title: 'Chat', tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={20} color={color} /> }} />
      <Tabs.Screen name="trade" options={{ headerShown: false, title: 'Trade', tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal" size={20} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, title: 'Profile', tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} /> }} />
      
      {/* ইমপ্যাক্ট পেজটি এখানে যুক্ত করতে হবে এবং ট্যাবের নিচে আইকন লুকানোর জন্য href: null দিতে হবে */}
      <Tabs.Screen name="impact" options={{ headerShown: false, href: null }} />
    </Tabs>
  );
}