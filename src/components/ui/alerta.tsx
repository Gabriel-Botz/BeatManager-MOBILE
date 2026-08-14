import { View, Text, StyleSheet } from 'react-native';
import { Cores } from '@/constants/colors';

interface AlertaProps {
  tipo: 'erro' | 'sucesso';
  children: string;
}

export function Alerta({ tipo, children }: AlertaProps) {
  return (
    <View style={[estilos.base, tipo === 'erro' ? estilos.erro : estilos.sucesso]}>
      <Text style={[estilos.texto, tipo === 'erro' ? estilos.textoErro : estilos.textoSucesso]}>
        {children}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    borderRadius: 8,
    padding: 12,
  },
  erro: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  sucesso: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  texto: {
    fontSize: 14,
  },
  textoErro: {
    color: Cores.erro,
  },
  textoSucesso: {
    color: Cores.sucesso,
  },
});
