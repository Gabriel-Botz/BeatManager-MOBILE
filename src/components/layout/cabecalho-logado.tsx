import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface CabecalhoLogadoProps {
  aoSair: () => void;
}

export function CabecalhoLogado({ aoSair }: CabecalhoLogadoProps) {
  const router = useRouter();

  return (
    <Pressable style={estilos.botaoSair} onPress={aoSair}>
      <LogOut size={16} color={Cores.erro} />
      <Text style={estilos.textoSair}>Sair</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  textoSair: {
    color: Cores.erro,
    fontSize: 13,
    fontWeight: '500',
  },
});
