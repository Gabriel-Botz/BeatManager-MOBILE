import { View, Text, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Cores } from '@/constants/colors';

interface CartaoRecursoProps {
  icone: LucideIcon;
  cor: string;
  titulo: string;
  descricao: string;
}

export function CartaoRecurso({ icone: Icone, cor, titulo, descricao }: CartaoRecursoProps) {
  return (
    <View style={estilos.cartao}>
      <Icone size={32} color={cor} style={estilos.icone} />
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.descricao}>{descricao}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: 'rgba(20, 16, 34, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    alignItems: 'center',
  },
  icone: {
    marginBottom: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: Cores.texto,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 13,
    color: Cores.mutado,
    textAlign: 'center',
  },
});
