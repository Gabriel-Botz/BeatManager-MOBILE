import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '@/contexts/auth-context';
import { Cores } from '@/constants/colors';

export default function AuthLayout() {
  const { token, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !token) {
      router.replace('/login');
    }
  }, [token, carregando, router]);

  if (carregando || !token) {
    return (
      <View style={estilos.carregando}>
        <ActivityIndicator size="large" color={Cores.primaria} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="eventos" />
      <Stack.Screen name="meus-eventos" />
    </Stack>
  );
}

const estilos = StyleSheet.create({
  carregando: {
    flex: 1,
    backgroundColor: Cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
