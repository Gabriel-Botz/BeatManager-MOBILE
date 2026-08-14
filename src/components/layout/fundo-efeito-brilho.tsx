import { View, Image, StyleSheet } from 'react-native';

export function FundoEfeitoBrilho() {
  return (
    <View style={estilos.container} pointerEvents="none">
      <Image
        source={require('../../../assets/images/background-mb.png')}
        style={estilos.textura}
        resizeMode="center"
      />
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
});
