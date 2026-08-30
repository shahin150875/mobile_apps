import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ImpactReportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#166534" />
        </TouchableOpacity>
        <Text style={styles.title}>Full Impact Report</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Ionicons name="leaf" size={48} color="#166534" />
        <Text style={styles.text}>Here is your detailed sustainability and landfill diverted report!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7EE' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#166534' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 16, color: '#57534E', textAlign: 'center', marginTop: 12 },
});