import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './auth';
import Home from './home';
import SelectAvatar from './selectAvatar';
import MatchMaking from './matchMaking';
import MatchSession from './matchSession';
import Result from './result';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" component={Auth} />
          <Stack.Screen name="selectAvatar" component={SelectAvatar} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="matchMaking" component={MatchMaking} />
          <Stack.Screen name="matchSession" component={MatchSession} />
          <Stack.Screen name="result" component={Result} />
        </Stack.Navigator>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
