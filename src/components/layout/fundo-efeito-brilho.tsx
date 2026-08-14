import { View, Image, StyleSheet } from 'react-native';

export function FundoEfeitoBrilho() {
  return (
    <View style={estilos.container} pointerEvents="none">
      <Image
        source={require('../../../assets/images/background-mb.png')}
        style={estilos.textura}
        resizeMode="cover"
      />
      <View style={estilos.glowPrimario} />
      <View style={estilos.glowAcento} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  textura: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
  },
  glowPrimario: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    width: 300,
    height: 300,
    borderRadius: 9999,
    backgroundColor: '#7e3ffc',
    opacity: 0.1,
  },
  glowAcento: {
    position: 'absolute',
    bottom: '25%',
    right: '15%',
    width: 300,
    height: 300,
    borderRadius: 9999,
    backgroundColor: '#fc1eb4',
    opacity: 0.1,
  },
});
