import { Stack } from 'expo-router';
import { ThemeProvider } from '@/hooks/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="impact" />
      </Stack>
    </ThemeProvider>
  );
}