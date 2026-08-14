import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface CabecalhoLogadoProps {
  aoSair: () => void;
}

export function CabecalhoLogado({ aoSair }: CabecalhoLogadoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const estaEmMeusEventos = pathname.includes('meus-eventos');

  return (
    <>
      <Pressable onPress={() => router.push('/(auth)/eventos')}>
        <Text style={estilos.textoNav}>Eventos</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/(auth)/meus-eventos')}>
        <Text style={estilos.textoNav}>Meus Eventos</Text>
      </Pressable>
      <Pressable style={estilos.botaoSair} onPress={aoSair}>
        <LogOut size={16} color={Cores.erro} />
      </Pressable>
    </>
  );
}

const estilos = StyleSheet.create({
  textoNav: {
    color: 'rgba(226, 232, 240, 0.7)',
    fontSize: 13,
    fontWeight: '500',
  },
  botaoSair: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
});
