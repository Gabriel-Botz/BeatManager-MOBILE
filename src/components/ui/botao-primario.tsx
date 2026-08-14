import { Pressable, Text, StyleSheet, type PressableProps } from 'react-native';
import { Cores } from '@/constants/colors';

interface BotaoPrimarioProps extends PressableProps {
  children: string;
}

export function BotaoPrimario({ children, ...props }: BotaoPrimarioProps) {
  return (
    <Pressable style={({ pressed }) => [estilos.botao, pressed && estilos.pressionado]} {...props}>
      <Text style={estilos.texto}>{children}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
  },
  pressionado: {
    opacity: 0.8,
  },
  texto: {
    color: Cores.branco,
    fontWeight: '600',
    fontSize: 16,
  },
});
