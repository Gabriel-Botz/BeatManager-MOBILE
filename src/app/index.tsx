import { View, Text, StyleSheet } from 'react-native';
import { Cores } from '@/constants/colors';

export default function IndexScreen() {
  return (
    <View style={estilos.pagina}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>BeatManager</Text>
        <Text style={estilos.subtitulo}>Gerenciamento de Eventos</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: Cores.texto,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: Cores.mutado,
  },
});
